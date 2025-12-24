import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Message from "../models/Message.js";
import { error } from "console";

// Create an empty object to store SS Event connections
export const connections = {};

// Controller function for the SSE endpoint
export const sseController = (req, res) => {
  const { userId } = req.params;
  console.log("New client connected : ", userId);

  // Set SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Add the client's response object to the connections object
  connections[userId] = res;

  // Send an initial event to the client
  res.write("log: Connected to SSE stream\n\n");

  // Handle client disconnection
  req.on("close", () => {
    // Remove the client's response object from the connections array
    delete connections[userId];
    console.log("Client disconnected");
  });
};

// Send Message
export const sendMessage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { to_user_id, text } = req.body;
    const image = req.file;

    let media_url = "";
    let message_type = image ? "image" : "text";
    let imagekit_file_id = ""; // 🔥 Khai báo biến tại đây

    // Nếu có ảnh thì upload lên ImageKit
    if (message_type === "image") {
      const fileBuffer = fs.readFileSync(image.path);

      const response = await imagekit.upload({
        file: fileBuffer,
        fileName: image.originalname,
      });

      imagekit_file_id = response.fileId; // 🔥 Lưu fileId đã khai báo

      media_url = imagekit.url({
        path: response.filePath,
        transformation: [
          { quality: "auto" },
          { format: "webp" },
          { width: "1280" },
        ],
      });
    }

    // Lưu tin nhắn vào database
    const message = await Message.create({
      from_user_id: userId,
      to_user_id,
      text,
      message_type,
      media_url,
      imagekit_file_id, // 🔥 phải có trong schema
    });

    res.json({ success: true, message });

    const messageWithUserData = await Message.findById(message._id).populate(
      "from_user_id"
    );

    if (connections[to_user_id]) {
      connections[to_user_id].write(
        `data: ${JSON.stringify(messageWithUserData)}\n\n`
      );
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get Chat Messages
export const getChatMessages = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { to_user_id } = req.body;

    const messages = await Message.find({
      $or: [
        { from_user_id: userId, to_user_id },
        { from_user_id: to_user_id, to_user_id: userId },
      ],
    }).sort({ created_at: -1 });
    // mark messages as seen
    await Message.updateMany(
      { from_user_id: to_user_id, to_user_id: userId },
      { seen: true }
    );

    res.json({ success: true, messages });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getUserRecentMessages = async (req, res) => {
  try {
    const { userId } = req.auth();
    const messages = await Message.find({ to_user_id: userId })
      .populate("from_user_id to_user_id")
      .sort({ created_at: -1 });

    res.json({ success: true, messages });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { userId } = req.auth();

    const { message_id } = req.params;

    // tìm tin nhắn
    const message = await Message.findById(message_id);
    if (!message) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found" });
    }

    // kiểm tra quyền xoá
    if (message.from_user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this message",
      });
    }

    // nếu có ảnh → xoá trên ImageKit
    if (message.message_type === "image" && message.imagekit_file_id) {
      try {
        await imagekit.deleteFile(message.imagekit_file_id);
      } catch (err) {
        console.log("Error deleting ImageKit file:", err.message);
      }
    }

    // xoá tin nhắn khỏi DB
    await Message.findByIdAndDelete(message_id);

    res.json({ success: true, message: "Message deleted successfully" });

    // gửi sự kiện SSE cho người nhận
    if (connections[message.to_user_id]) {
      connections[message.to_user_id].write(
        `event: delete-message\ndata: ${JSON.stringify({ message_id })}\n\n`
      );
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
