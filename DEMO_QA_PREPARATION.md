# 📋 CÂU HỎI VÀ TRẢ LỜI CHO BUỔI DEMO

## 🎯 TỔNG QUAN DỰ ÁN

### Q1: Dự án của bạn giải quyết vấn đề gì?

**Trả lời:**
Dự án kết hợp hai nhu cầu chính:

1. **Mạng xã hội** - Kết nối mọi người, chia sẻ bài viết, nhắn tin, video call
2. **Quản lý dự án Agile** - Hỗ trợ team làm việc theo phương pháp Scrum với Kanban board, Sprint, Story, Task

**Điểm khác biệt:** Thay vì dùng 2 ứng dụng riêng biệt (Facebook + Jira), người dùng có thể làm tất cả trong một nền tảng duy nhất.

---

### Q2: Đối tượng người dùng mục tiêu là ai?

**Trả lời:**

- **Sinh viên** làm đồ án nhóm
- **Startup nhỏ** cần công cụ gọn nhẹ
- **Team remote** cần giao tiếp và quản lý công việc trên cùng một nền tảng
- **Freelancer** muốn kết nối và quản lý dự án với khách hàng

---

### Q3: Tại sao chọn kết hợp mạng xã hội với quản lý dự án?

**Trả lời:**

- Giao tiếp và công việc luôn đi đôi với nhau
- Giảm context-switching (chuyển đổi giữa nhiều app)
- Tăng tính gắn kết team khi có cả social features
- Xu hướng "all-in-one" trong các công cụ hiện đại (Notion, Slack...)

---

## 💻 CÔNG NGHỆ SỬ DỤNG

### Q4: Tại sao chọn MERN Stack?

**Trả lời:**

- **MongoDB:** NoSQL linh hoạt, dễ scale, phù hợp với dữ liệu đa dạng (posts, messages, tasks)
- **Express.js:** Framework Node.js nhẹ, dễ tạo REST API
- **React:** Component-based, virtual DOM hiệu quả, ecosystem lớn
- **Node.js:** JavaScript cả frontend và backend, non-blocking I/O tốt cho real-time

---

### Q5: Tại sao dùng Socket.IO cho real-time?

**Trả lời:**

- Hỗ trợ WebSocket với fallback (polling) khi WebSocket không khả dụng
- Tự động reconnect khi mất kết nối
- Có sẵn rooms/namespaces cho group chat và video call
- Dễ tích hợp với Node.js/Express

**Ứng dụng trong dự án:**

- Chat 1-1 và group chat real-time
- Video call (WebRTC signaling)
- Thông báo bàn giao công việc
- Trạng thái online/offline

---

### Q6: Clerk là gì? Tại sao không tự code authentication?

**Trả lời:**
**Clerk** là dịch vụ authentication-as-a-service cung cấp:

- Đăng nhập email/password, Google, GitHub...
- Session management an toàn
- Webhook để sync user data
- UI components sẵn có

**Lý do dùng Clerk:**

- Bảo mật cao, được audit thường xuyên
- Tiết kiệm thời gian (không cần code login/register)
- Tập trung vào business logic thay vì authentication
- Trong production, authentication là phần critical - nên dùng service chuyên nghiệp

---

### Q7: Redux Toolkit dùng để làm gì?

**Trả lời:**

- **Global state management** cho React
- Lưu trữ: user data, posts, projects, tasks
- **createAsyncThunk** để handle async API calls
- Tránh prop drilling (truyền props qua nhiều component)

**Ví dụ:** Khi user đăng nhập, thông tin user được lưu trong Redux store và accessible từ bất kỳ component nào.

---

### Q8: TailwindCSS có ưu điểm gì so với CSS thường?

**Trả lời:**

- **Utility-first:** Viết style trực tiếp trong HTML, không cần file CSS riêng
- **Responsive dễ dàng:** `md:flex`, `lg:grid`
- **Dark mode:** `dark:bg-slate-800`
- **Consistent design:** Hệ thống spacing, colors đồng nhất
- **Smaller bundle:** Chỉ include các class được dùng

---

## 🏗️ KIẾN TRÚC HỆ THỐNG

### Q9: Mô tả kiến trúc tổng quan của hệ thống?

**Trả lời:**

```
[Client - React SPA]
        |
        | HTTP/WebSocket
        ↓
[Server - Express.js]
   |         |
   |         ↓
   |    [Socket.IO]
   |         |
   ↓         ↓
[MongoDB]  [External Services]
           - Clerk (Auth)
           - ImageKit (CDN)
           - OpenRouter (AI)
           - Brevo (Email)
           - Inngest (Background Jobs)
```

**3-tier architecture:**

1. **Presentation Layer:** React frontend
2. **Business Logic Layer:** Express controllers
3. **Data Layer:** MongoDB + Mongoose ODM

---

### Q10: Database schema được thiết kế như thế nào?

**Trả lời:**
**Collections chính:**

- **User:** Thông tin người dùng, sync từ Clerk
- **Post:** Bài viết, reactions, comments
- **Message:** Tin nhắn 1-1
- **Group:** Nhóm chat với members
- **Connection:** Quan hệ bạn bè (pending/accepted)
- **Project:** Dự án với members và roles
- **Sprint:** Sprint trong project
- **Story:** User story với acceptance criteria
- **Task:** Task chi tiết với history tracking
- **TaskHandover:** Lịch sử bàn giao công việc
- **TimeLog:** Ghi nhận thời gian làm việc
- **AIConversation:** Lịch sử chat AI

**Relationships:**

- User ↔ Post (1-N)
- Project ↔ Sprint ↔ Story ↔ Task (1-N)
- Task → User (assignee, reporter)

---

### Q11: API được tổ chức như thế nào?

**Trả lời:**
**RESTful API với prefix `/api`:**

```
/api/user     - User profile, connections
/api/post     - CRUD posts, reactions
/api/message  - Chat messages
/api/group    - Group chat
/api/project  - Projects management
/api/sprint   - Sprint CRUD
/api/task     - Tasks, handover, time log
/api/ai       - AI chat
/api/admin    - Admin dashboard
```

**Middleware:**

- `clerkMiddleware()` - Verify JWT token
- `auth.js` - Extract userId from token
- `adminAuth.js` - Check admin role

---

## 🚀 TÍNH NĂNG CHÍNH

### Q12: Giải thích chức năng Kanban Board?

**Trả lời:**
**Kanban Board** là bảng quản lý công việc trực quan với các cột trạng thái:

- **Backlog:** Công việc chưa lên kế hoạch
- **To Do:** Sẵn sàng làm
- **In Progress:** Đang làm
- **In Review:** Đang review code
- **Testing:** Đang test
- **Done:** Hoàn thành
- **Blocked:** Bị chặn

**Tính năng:**

- Drag & drop để đổi trạng thái
- Filter theo assignee, priority, sprint
- Click để xem chi tiết task
- Hiển thị story points, priority badges

**Thư viện:** `@hello-pangea/dnd` (fork của react-beautiful-dnd)

---

### Q13: Chức năng bàn giao công việc hoạt động như thế nào?

**Trả lời:**
**Quy trình:**

1. Người được giao task click "Bàn giao công việc"
2. Chọn người nhận mới từ team members
3. Điền thông tin: lý do, context, công việc đã làm, công việc còn lại, blockers
4. (Tùy chọn) Hẹn lịch họp bàn giao
5. Submit → Task được chuyển ngay cho người mới
6. Người nhận được thông báo real-time

**Lưu trữ:**

- Model `TaskHandover` lưu toàn bộ lịch sử bàn giao
- Task history ghi nhận action "handover"

---

### Q14: Video call được implement như thế nào?

**Trả lời:**
**Công nghệ:** WebRTC + Socket.IO signaling

**Quy trình:**

1. Caller gửi `call:initiate` qua socket
2. Server tạo room, gửi `call:incoming` cho receiver
3. Receiver accept → Server gửi `call:accepted`
4. Hai bên trao đổi SDP offer/answer qua socket
5. Trao đổi ICE candidates để thiết lập peer connection
6. Media stream truyền trực tiếp P2P

**Hỗ trợ:**

- Video call 1-1
- Group video call
- Screen sharing
- Lưu lịch sử cuộc gọi

---

### Q15: AI Chat tích hợp như thế nào?

**Trả lời:**
**Backend:** Dùng OpenRouter API (aggregator cho nhiều LLM)

- Model: GPT-4, Claude, Llama...
- Lưu conversation history trong MongoDB

**Tính năng:**

- Chat với AI assistant
- Tạo nhiều conversation
- Đổi tên, xóa conversation
- Context-aware (nhớ lịch sử chat)

**Code flow:**

1. User gửi message
2. Server gọi OpenRouter API với conversation history
3. Stream response về client
4. Lưu message vào database

---

### Q16: Hệ thống đa ngôn ngữ (i18n) implement thế nào?

**Trả lời:**
**Approach:** React Context + Custom hook

```javascript
// LanguageContext.jsx
const translations = {
  vi: { greeting: "Xin chào", ... },
  en: { greeting: "Hello", ... }
};

// Sử dụng
const { t, language } = useLanguage();
<p>{t("greeting")}</p>
```

**Tính năng:**

- Toggle Tiếng Việt / English
- Lưu preference vào localStorage
- Tất cả UI text đều dùng `t()` function

---

## 🔒 BẢO MẬT

### Q17: Bảo mật được xử lý như thế nào?

**Trả lời:**

1. **Authentication:** Clerk JWT tokens
2. **Authorization:** Middleware kiểm tra userId trước mỗi request
3. **API Protection:** Tất cả routes đều require authentication
4. **CORS:** Chỉ cho phép origin từ frontend URL
5. **Input validation:** Mongoose schema validation
6. **Role-based access:** Admin routes có middleware riêng
7. **Sensitive data:** API keys trong .env, không commit lên git

---

### Q18: Làm sao ngăn chặn người dùng truy cập dữ liệu của người khác?

**Trả lời:**
**Server-side checks:**

```javascript
// Ví dụ: Chỉ assignee mới được bàn giao task
if (task.assignee.toString() !== userId) {
  return res.json({ success: false, message: "Unauthorized" });
}

// Ví dụ: Chỉ project member mới xem được project
const project = await Project.findById(projectId);
if (!project.members.some((m) => m.user.toString() === userId)) {
  return res.json({ success: false, message: "Not a member" });
}
```

---

## 📊 HIỆU SUẤT

### Q19: Làm sao tối ưu hiệu suất khi có nhiều data?

**Trả lời:**

1. **Pagination:** Không load tất cả, chỉ load từng page
2. **Mongoose populate:** Chỉ populate fields cần thiết
3. **MongoDB indexes:** Index trên các field hay query
4. **React optimization:**
   - `useMemo`, `useCallback` để tránh re-render
   - Lazy loading components
5. **Image optimization:** ImageKit CDN với resize, compression
6. **Socket rooms:** Chỉ emit event cho users trong room cần thiết

---

### Q20: Nếu có 10,000 users online cùng lúc thì sao?

**Trả lời:**
**Hiện tại (Single server):**

- Socket.IO có thể handle ~10K connections trên 1 server
- MongoDB có connection pooling

**Scale lên:**

- **Horizontal scaling:** Multiple server instances
- **Redis adapter:** Socket.IO Redis adapter để share state giữa servers
- **Load balancer:** Nginx hoặc cloud load balancer
- **MongoDB sharding:** Phân tán data
- **CDN:** Static assets và images

---

## 🧪 TESTING & DEPLOYMENT

### Q21: Dự án được test như thế nào?

**Trả lời:**
**Testing approaches:**

1. **Manual testing:** Test trực tiếp trên UI
2. **API testing:** Postman/Thunder Client
3. **Console logging:** Debug với console.log
4. **Error handling:** Try-catch với error messages

**Nếu có thời gian thêm:**

- Unit tests với Jest
- Integration tests cho API
- E2E tests với Playwright/Cypress

---

### Q22: Deploy ở đâu?

**Trả lời:**
**Options:**

- **Frontend:** Vercel, Netlify (free tier)
- **Backend:** Render, Railway, Heroku
- **Database:** MongoDB Atlas (free 512MB)

**Cấu hình:**

- Environment variables trên hosting platform
- CORS config cho production domain
- SSL/HTTPS tự động

---

## 🛠️ KHÓ KHĂN & GIẢI PHÁP

### Q23: Khó khăn lớn nhất khi làm dự án là gì?

**Trả lời:**

1. **WebRTC Video Call:**

   - Khó debug, phụ thuộc network
   - Giải pháp: Logging chi tiết, test nhiều môi trường

2. **Real-time sync:**

   - Đảm bảo data consistency giữa socket và database
   - Giải pháp: Emit sau khi database operation thành công

3. **State management:**

   - Nhiều data cần sync (user, posts, tasks, messages)
   - Giải pháp: Redux với clear separation of concerns

4. **Drag & Drop:**
   - Performance khi có nhiều items
   - Giải pháp: Virtualization, debounce API calls

---

### Q24: Nếu làm lại từ đầu, bạn sẽ thay đổi gì?

**Trả lời:**

1. **TypeScript:** Type safety, ít bugs hơn
2. **Testing từ đầu:** Viết tests song song với code
3. **GraphQL:** Flexible queries, tránh over-fetching
4. **Monorepo:** Share code giữa client/server tốt hơn
5. **Design system:** Component library từ đầu

---

## 🔮 TƯƠNG LAI

### Q25: Hướng phát triển tiếp theo?

**Trả lời:**

1. **Mobile app:** React Native cho iOS/Android
2. **Notifications push:** Firebase Cloud Messaging
3. **Calendar integration:** Google Calendar sync
4. **Advanced analytics:** Burndown chart, velocity tracking
5. **File sharing:** Upload và preview files trong chat
6. **Integrations:** GitHub, Slack webhooks
7. **AI enhancements:** AI suggest task estimates, auto-assign

---

## 💡 CÂU HỎI KỸ THUẬT SÂU

### Q26: Giải thích cách Mongoose populate hoạt động?

**Trả lời:**

```javascript
// Task schema có reference đến User
assignee: { type: String, ref: "User" }

// Khi query, populate sẽ join data
const task = await Task.findById(id)
  .populate("assignee", "full_name profile_picture");

// Kết quả: thay vì assignee = "user_123"
// assignee = { _id: "user_123", full_name: "John", profile_picture: "url" }
```

**Cơ chế:** Mongoose thực hiện thêm query để fetch referenced document.

---

### Q27: WebSocket khác HTTP như thế nào?

**Trả lời:**
| HTTP | WebSocket |
|------|-----------|
| Request-Response | Bi-directional |
| Client khởi tạo | Cả hai có thể gửi |
| Stateless | Persistent connection |
| Overhead mỗi request | Một lần handshake |

**Khi nào dùng:**

- HTTP: CRUD operations, API calls
- WebSocket: Real-time chat, notifications, live updates

---

### Q28: JWT token hoạt động như thế nào?

**Trả lời:**
**JWT = Header.Payload.Signature**

1. **Header:** Algorithm (HS256)
2. **Payload:** User data (userId, email, exp)
3. **Signature:** HMAC(header + payload, secret)

**Flow:**

1. User login → Server tạo JWT với secret key
2. Client lưu JWT (localStorage/cookie)
3. Mỗi request gửi JWT trong header
4. Server verify signature với secret key
5. Nếu valid → extract userId từ payload

**Clerk** handle toàn bộ flow này tự động.

---

### Q29: React Virtual DOM là gì?

**Trả lời:**

- **Virtual DOM:** JavaScript representation của real DOM
- Khi state thay đổi, React tạo new virtual DOM
- **Diffing:** So sánh old vs new virtual DOM
- **Reconciliation:** Chỉ update phần thay đổi lên real DOM

**Lợi ích:** Giảm DOM manipulation (expensive operation), tăng performance.

---

### Q30: Giải thích middleware trong Express?

**Trả lời:**
**Middleware:** Function xử lý request trước khi đến route handler.

```javascript
// Middleware kiểm tra auth
const auth = (req, res, next) => {
  const { userId } = req.auth();
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next(); // Cho phép đi tiếp
};

// Sử dụng
app.use("/api/task", auth, taskRouter);
```

**Order matters:** Middleware chạy theo thứ tự khai báo.

---

## 🎤 MẸO DEMO

### Tips khi demo:

1. **Chuẩn bị data sẵn:** Tạo trước users, projects, tasks để demo
2. **Mở 2 browser:** Demo real-time features (chat, notifications)
3. **Network throttle:** Chuẩn bị cho trường hợp mạng chậm
4. **Backup plan:** Video recording phòng trường hợp live demo fail
5. **Script demo:** Viết sẵn flow demo theo thứ tự logic

### Flow demo đề xuất:

1. Đăng nhập → Dashboard
2. Tạo post → Like, comment
3. Gửi tin nhắn → Real-time
4. Video call nhanh
5. Tạo project → Sprint → Story → Task
6. Kanban board → Drag task
7. Bàn giao công việc → Thông báo
8. AI Chat
9. Dark mode / Language toggle
10. Admin dashboard (nếu có)

---

**Chúc bạn demo thành công! 🎉**
