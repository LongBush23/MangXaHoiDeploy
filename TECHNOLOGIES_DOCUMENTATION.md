# 📚 TÀI LIỆU CÔNG NGHỆ - DỰ ÁN PINGUP

## 🎯 TỔNG QUAN DỰ ÁN

**PingUp** là một nền tảng mạng xã hội nội bộ doanh nghiệp (Enterprise Social Network) kết hợp với hệ thống quản lý dự án Agile. Đây là giải pháp **All-in-One** giúp doanh nghiệp:

- Kết nối nhân viên qua mạng xã hội nội bộ
- Quản lý dự án theo phương pháp Agile (Scrum/Kanban)
- Giao tiếp real-time (Chat, Video Call)
- Tích hợp AI Assistant
- Bàn giao công việc có context (Task Handover - **TÍNH NĂNG ĐỘC ĐÁO**)

---

## 🏗️ KIẾN TRÚC HỆ THỐNG

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (React.js)                        │
│  ┌─────────────┬─────────────┬─────────────┬─────────────────┐  │
│  │   Vite      │  TailwindCSS│   Redux     │  Socket.io-     │  │
│  │   Build     │   Styling   │   Toolkit   │  client         │  │
│  └─────────────┴─────────────┴─────────────┴─────────────────┘  │
│  ┌─────────────┬─────────────┬─────────────┬─────────────────┐  │
│  │   Clerk     │  React      │  Lucide     │  @hello-pangea/ │  │
│  │   Auth      │  Router v7  │  Icons      │  dnd (Drag&Drop)│  │
│  └─────────────┴─────────────┴─────────────┴─────────────────┘  │
└───────────────────────────────┬─────────────────────────────────┘
                                │ HTTPS/WSS
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                       SERVER (Node.js)                          │
│  ┌─────────────┬─────────────┬─────────────┬─────────────────┐  │
│  │  Express 5  │  Socket.io  │  Mongoose   │  Clerk Express  │  │
│  │  REST API   │  WebSocket  │  ODM        │  Auth Middleware│  │
│  └─────────────┴─────────────┴─────────────┴─────────────────┘  │
│  ┌─────────────┬─────────────┬─────────────┬─────────────────┐  │
│  │  Inngest    │  ImageKit   │  Nodemailer │  OpenRouter AI  │  │
│  │  Background │  Media CDN  │  Email      │  API            │  │
│  └─────────────┴─────────────┴─────────────┴─────────────────┘  │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATABASE (MongoDB)                         │
│  ┌─────────────┬─────────────┬─────────────┬─────────────────┐  │
│  │   Users     │   Posts     │   Projects  │   Tasks         │  │
│  │   Messages  │   Stories   │   Sprints   │   Handovers     │  │
│  └─────────────┴─────────────┴─────────────┴─────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🖥️ FRONTEND TECHNOLOGIES

### 1. **React.js 19** - Core Framework

| Thuộc tính     | Chi tiết                                                |
| -------------- | ------------------------------------------------------- |
| **Version**    | 19.1.0                                                  |
| **Vai trò**    | Framework xây dựng giao diện người dùng                 |
| **Lý do chọn** | Component-based, Virtual DOM, Hooks, Lớn cộng đồng      |
| **Ứng dụng**   | Toàn bộ giao diện: Feed, Chat, Kanban Board, Profile... |

### 2. **Vite 7** - Build Tool

| Thuộc tính     | Chi tiết                                      |
| -------------- | --------------------------------------------- |
| **Version**    | 7.0.4                                         |
| **Vai trò**    | Development server & Build tool               |
| **Lý do chọn** | Nhanh hơn CRA 10-100x, Hot Module Replacement |
| **Ứng dụng**   | Dev server, Production build                  |

### 3. **TailwindCSS 4** - Styling

| Thuộc tính     | Chi tiết                                                |
| -------------- | ------------------------------------------------------- |
| **Version**    | 4.1.11                                                  |
| **Vai trò**    | Utility-first CSS framework                             |
| **Lý do chọn** | Rapid development, Responsive design, Dark mode support |
| **Ứng dụng**   | Styling toàn bộ components                              |

### 4. **Redux Toolkit** - State Management

| Thuộc tính     | Chi tiết                                  |
| -------------- | ----------------------------------------- |
| **Version**    | 2.8.2                                     |
| **Vai trò**    | Global state management                   |
| **Lý do chọn** | Centralized state, DevTools, Async thunks |
| **Ứng dụng**   | User state, Connections, Messages, Groups |

**Các Slice đã tạo:**

- `userSlice` - Quản lý thông tin user đăng nhập
- `connectionsSlice` - Quản lý danh sách connections
- `messagesSlice` - Quản lý tin nhắn real-time
- `groupsSlice` - Quản lý nhóm chat

### 5. **React Router DOM 7** - Routing

| Thuộc tính     | Chi tiết                                 |
| -------------- | ---------------------------------------- |
| **Version**    | 7.7.1                                    |
| **Vai trò**    | Client-side routing                      |
| **Lý do chọn** | Latest version, Nested routes, Data APIs |
| **Ứng dụng**   | Điều hướng giữa các trang                |

**Routes chính:**

```
/                    - Feed (Bảng tin)
/messages            - Danh sách tin nhắn
/messages/:userId    - Chat 1-1
/group/:groupId      - Chat nhóm
/connections         - Quản lý connections
/discover            - Khám phá người dùng
/profile             - Profile cá nhân
/profile/:profileId  - Profile người khác
/create-post         - Tạo bài đăng
/ai-chat             - Chat với AI
/projects            - Danh sách dự án
/project/:id/board   - Kanban Board
/task/:taskId        - Chi tiết Task
/admin/*             - Admin Panel
```

### 6. **Clerk React** - Authentication

| Thuộc tính     | Chi tiết                                           |
| -------------- | -------------------------------------------------- |
| **Version**    | 5.36.0                                             |
| **Vai trò**    | Authentication & User Management                   |
| **Lý do chọn** | Complete auth solution, Social login, JWT handling |
| **Ứng dụng**   | Đăng nhập, Đăng ký, Quản lý session                |

**Tính năng:**

- Social Login (Google, GitHub, Facebook)
- Email/Password authentication
- Session management
- JWT token generation
- User profile management

### 7. **Socket.io-client** - Real-time Communication

| Thuộc tính     | Chi tiết                                                 |
| -------------- | -------------------------------------------------------- |
| **Version**    | 4.7.5                                                    |
| **Vai trò**    | WebSocket client cho real-time features                  |
| **Lý do chọn** | Bi-directional communication, Auto-reconnection          |
| **Ứng dụng**   | Real-time messaging, Video call signaling, Online status |

### 8. **@hello-pangea/dnd** - Drag & Drop

| Thuộc tính     | Chi tiết                                            |
| -------------- | --------------------------------------------------- |
| **Version**    | 18.0.1                                              |
| **Vai trò**    | Drag and drop cho Kanban Board                      |
| **Lý do chọn** | Fork của react-beautiful-dnd, Được duy trì tích cực |
| **Ứng dụng**   | Kéo thả tasks giữa các cột trên Kanban Board        |

### 9. **Lucide React** - Icons

| Thuộc tính     | Chi tiết                                  |
| -------------- | ----------------------------------------- |
| **Version**    | 0.525.0                                   |
| **Vai trò**    | Icon library                              |
| **Lý do chọn** | Lightweight, Customizable, Tree-shakeable |
| **Ứng dụng**   | Icons trong toàn bộ UI                    |

### 10. **React Hot Toast** - Notifications

| Thuộc tính     | Chi tiết                                   |
| -------------- | ------------------------------------------ |
| **Version**    | 2.5.2                                      |
| **Vai trò**    | Toast notifications                        |
| **Lý do chọn** | Lightweight, Customizable, Promise support |
| **Ứng dụng**   | Thông báo thành công/lỗi                   |

### 11. **React Markdown** - Markdown Rendering

| Thuộc tính     | Chi tiết                          |
| -------------- | --------------------------------- |
| **Version**    | 10.1.0                            |
| **Vai trò**    | Render markdown content           |
| **Lý do chọn** | Hỗ trợ format AI responses        |
| **Ứng dụng**   | Hiển thị phản hồi từ AI Assistant |

### 12. **Moment.js** - Date/Time

| Thuộc tính     | Chi tiết                              |
| -------------- | ------------------------------------- |
| **Version**    | 2.30.1                                |
| **Vai trò**    | Date/time manipulation                |
| **Lý do chọn** | Format dates, Relative time           |
| **Ứng dụng**   | Hiển thị thời gian bài đăng, tin nhắn |

### 13. **Axios** - HTTP Client

| Thuộc tính     | Chi tiết                           |
| -------------- | ---------------------------------- |
| **Version**    | 1.11.0                             |
| **Vai trò**    | HTTP client cho API calls          |
| **Lý do chọn** | Interceptors, Request cancellation |
| **Ứng dụng**   | Gọi REST API từ backend            |

---

## ⚙️ BACKEND TECHNOLOGIES

### 1. **Node.js** - Runtime Environment

| Thuộc tính     | Chi tiết                                                    |
| -------------- | ----------------------------------------------------------- |
| **Vai trò**    | JavaScript runtime                                          |
| **Lý do chọn** | Non-blocking I/O, NPM ecosystem, Same language với frontend |
| **Ứng dụng**   | Server-side application                                     |

### 2. **Express.js 5** - Web Framework

| Thuộc tính     | Chi tiết                                  |
| -------------- | ----------------------------------------- |
| **Version**    | 5.1.0                                     |
| **Vai trò**    | Web application framework                 |
| **Lý do chọn** | Lightweight, Flexible, Middleware support |
| **Ứng dụng**   | REST API, Routing, Middleware             |

**API Endpoints:**

- `/api/user/*` - User management
- `/api/post/*` - Posts & Feed
- `/api/story/*` - Stories
- `/api/message/*` - Messaging
- `/api/group/*` - Group chat
- `/api/ai/*` - AI Assistant
- `/api/project/*` - Project management
- `/api/task/*` - Task management
- `/api/sprint/*` - Sprint management
- `/api/admin/*` - Admin panel
- `/api/inngest` - Background jobs

### 3. **MongoDB + Mongoose** - Database

| Thuộc tính           | Chi tiết                                        |
| -------------------- | ----------------------------------------------- |
| **Mongoose Version** | 8.16.5                                          |
| **Vai trò**          | NoSQL database + ODM                            |
| **Lý do chọn**       | Schema flexibility, Scalability, Document-based |
| **Ứng dụng**         | Lưu trữ toàn bộ data                            |

**Models đã tạo:**
| Model | Mô tả |
|-------|-------|
| `User` | Thông tin người dùng |
| `Post` | Bài đăng |
| `Comment` | Bình luận |
| `Story` | Stories 24h |
| `Connection` | Kết nối giữa users |
| `Message` | Tin nhắn 1-1 |
| `Group` | Nhóm chat |
| `AIConversation` | Lịch sử chat với AI |
| `Project` | Dự án |
| `Task` | Công việc |
| `Sprint` | Sprint trong Scrum |
| `TaskHandover` | Bàn giao công việc |
| `TimeLog` | Ghi nhận thời gian |

### 4. **Socket.io** - WebSocket Server

| Thuộc tính     | Chi tiết                                |
| -------------- | --------------------------------------- |
| **Version**    | 4.7.5                                   |
| **Vai trò**    | Real-time bidirectional communication   |
| **Lý do chọn** | Auto-reconnection, Rooms, Namespaces    |
| **Ứng dụng**   | Video call signaling, Real-time updates |

**Socket Events:**

```
user:join              - User kết nối
user:online/offline    - Trạng thái online
call:initiate          - Bắt đầu cuộc gọi
call:accept/reject     - Chấp nhận/từ chối
call:end               - Kết thúc cuộc gọi
webrtc:offer           - WebRTC offer
webrtc:answer          - WebRTC answer
webrtc:ice-candidate   - ICE candidates
group-call:*           - Group video call events
```

### 5. **Clerk Express** - Authentication Middleware

| Thuộc tính     | Chi tiết                             |
| -------------- | ------------------------------------ |
| **Version**    | 1.7.13                               |
| **Vai trò**    | Server-side authentication           |
| **Lý do chọn** | JWT verification, Session management |
| **Ứng dụng**   | Protect API routes                   |

### 6. **Inngest** - Background Jobs

| Thuộc tính     | Chi tiết                              |
| -------------- | ------------------------------------- |
| **Version**    | 3.40.1                                |
| **Vai trò**    | Background job processing             |
| **Lý do chọn** | Event-driven, Retry logic, Scheduling |
| **Ứng dụng**   | Scheduled tasks, Webhooks             |

**Functions đã tạo:**
| Function | Trigger | Mô tả |
|----------|---------|-------|
| `sync-user-from-clerk` | `clerk/user.created` | Sync user mới từ Clerk |
| `update-user-from-clerk` | `clerk/user.updated` | Update user khi có thay đổi |
| `delete-user-with-clerk` | `clerk/user.deleted` | Xóa user khi bị xóa từ Clerk |
| `send-new-connection-request-reminder` | `app/connection-request` | Gửi email nhắc nhở |
| `story-delete` | `app/story.delete` | Tự động xóa story sau 24h |
| `send-unseen-messages-notification` | Cron: 9 AM daily | Email tin nhắn chưa đọc |

### 7. **ImageKit** - Media Management

| Thuộc tính     | Chi tiết                                  |
| -------------- | ----------------------------------------- |
| **Version**    | 6.0.0                                     |
| **Vai trò**    | Image/Video CDN & Processing              |
| **Lý do chọn** | Fast delivery, On-the-fly transformations |
| **Ứng dụng**   | Upload & serve media files                |

### 8. **Multer** - File Upload

| Thuộc tính     | Chi tiết                            |
| -------------- | ----------------------------------- |
| **Version**    | 2.0.2                               |
| **Vai trò**    | Handle multipart/form-data          |
| **Lý do chọn** | Standard file upload middleware     |
| **Ứng dụng**   | Upload ảnh/video cho posts, stories |

### 9. **Nodemailer** - Email Service

| Thuộc tính     | Chi tiết                  |
| -------------- | ------------------------- |
| **Version**    | 7.0.5                     |
| **Vai trò**    | Send transactional emails |
| **Lý do chọn** | SMTP support, HTML emails |
| **Ứng dụng**   | Email notifications       |

**Email types:**

- Connection request notifications
- Task handover notifications
- Unseen messages reminder
- Password reset (through Clerk)

### 10. **OpenRouter AI API** - AI Integration

| Thuộc tính     | Chi tiết                           |
| -------------- | ---------------------------------- |
| **Model**      | tngtech/deepseek-r1t2-chimera:free |
| **Vai trò**    | AI Assistant                       |
| **Lý do chọn** | Free tier, Multi-model support     |
| **Ứng dụng**   | Chat AI trong ứng dụng             |

### 11. **CORS** - Cross-Origin Resource Sharing

| Thuộc tính   | Chi tiết                       |
| ------------ | ------------------------------ |
| **Version**  | 2.8.5                          |
| **Vai trò**  | Enable cross-origin requests   |
| **Ứng dụng** | Allow frontend to call backend |

### 12. **Dotenv** - Environment Variables

| Thuộc tính   | Chi tiết                   |
| ------------ | -------------------------- |
| **Version**  | 17.2.1                     |
| **Vai trò**  | Load environment variables |
| **Ứng dụng** | Store secrets, API keys    |

---

## 🔐 BẢO MẬT & AUTHENTICATION

### Authentication Flow

```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│  User   │────▶│  Clerk  │────▶│  JWT    │────▶│  API    │
│         │     │  Auth   │     │  Token  │     │  Server │
└─────────┘     └─────────┘     └─────────┘     └─────────┘
                    │
                    ▼
              ┌─────────┐
              │ Webhook │───▶ Inngest (sync user to DB)
              └─────────┘
```

### Security Measures

1. **JWT Authentication** - Mỗi request đều được verify token
2. **HTTPS** - Encrypted communication
3. **CORS** - Only allow requests from frontend domain
4. **Input Validation** - Validate data trước khi xử lý
5. **Rate Limiting** - Giới hạn requests (AI API)
6. **Role-based Access** - Admin routes protected

---

## 📱 REAL-TIME FEATURES

### 1. Server-Sent Events (SSE) - Messaging

```javascript
// Client subscribes to message stream
const eventSource = new EventSource("/api/message/" + userId);
eventSource.onmessage = (event) => {
  const message = JSON.parse(event.data);
  // Handle new message
};
```

### 2. WebSocket (Socket.io) - Video Calls

```javascript
// WebRTC Signaling Flow
1. Caller sends offer → Socket.io → Receiver
2. Receiver sends answer → Socket.io → Caller
3. Both exchange ICE candidates → Connection established
```

### 3. WebRTC - Video/Audio Streaming

- **Peer-to-peer** connection cho 1-1 calls
- **SFU architecture** không cần cho group calls nhỏ
- **ICE/STUN/TURN** servers cho NAT traversal

---

## 🎨 UI/UX FEATURES

### 1. Dark/Light Mode

```jsx
// ThemeContext.jsx
<ThemeContext.Provider value={{ theme, toggleTheme }}>
```

### 2. Multi-language (i18n)

```jsx
// LanguageContext.jsx - Vietnamese/English support
```

### 3. Responsive Design

- TailwindCSS breakpoints
- Mobile-first approach

### 4. Drag & Drop

- Kanban board với @hello-pangea/dnd
- Smooth animations

---

## 📊 AGILE FEATURES (ĐIỂM ĐỘC ĐÁO)

### 1. Project Management

- Tạo dự án với Scrum/Kanban methodology
- Thêm members với roles (owner/admin/member/viewer)
- Track project progress

### 2. Kanban Board

```
┌──────────┬──────────┬──────────┬──────────┬──────────┬──────────┐
│ Backlog  │  To Do   │In Progress│In Review │ Testing  │   Done   │
├──────────┼──────────┼──────────┼──────────┼──────────┼──────────┤
│ [Task 1] │ [Task 2] │ [Task 3] │ [Task 4] │ [Task 5] │ [Task 6] │
│ [Task 7] │          │          │          │          │          │
└──────────┴──────────┴──────────┴──────────┴──────────┴──────────┘
```

### 3. Task Management

- Auto-generated task key (PROJ-1, PROJ-2...)
- Types: Story, Task, Bug, Epic
- Priorities: Lowest → Critical
- Story Points estimation
- Time tracking (estimated vs actual)
- History logging

### 4. Task Handover (⭐ UNIQUE FEATURE)

```
┌─────────────────────────────────────────────────┐
│              TASK HANDOVER FLOW                  │
├─────────────────────────────────────────────────┤
│ 1. Assignee creates handover request            │
│    - Select new assignee                        │
│    - Choose reason (vacation/workload/etc)      │
│    - Fill context & background                  │
│    - Document completed work                    │
│    - List pending work                          │
│    - Note current blockers                      │
│    - (Optional) Schedule handover meeting       │
│                                                 │
│ 2. System sends email to new assignee           │
│                                                 │
│ 3. New assignee Accept/Reject                   │
│                                                 │
│ 4. Task transferred with full context           │
└─────────────────────────────────────────────────┘
```

### 5. Sprint Management

- Create sprints with goals
- Start/Complete sprints
- Track velocity
- Burndown chart data

### 6. Time Tracking

- Log hours worked
- Compare estimated vs actual
- Track per task, per user

---

## 🛠️ DEVELOPMENT TOOLS

### Frontend Dev Dependencies

| Package                     | Version | Purpose              |
| --------------------------- | ------- | -------------------- |
| ESLint                      | 9.30.1  | Code linting         |
| eslint-plugin-react-hooks   | 5.2.0   | React hooks rules    |
| eslint-plugin-react-refresh | 0.4.20  | Fast refresh linting |
| @vitejs/plugin-react        | 4.6.0   | Vite React plugin    |
| @types/react                | 19.1.8  | TypeScript types     |

### Backend Dev Dependencies

| Package | Version | Purpose                 |
| ------- | ------- | ----------------------- |
| Nodemon | 3.1.10  | Auto-restart on changes |

---

## 🚀 DEPLOYMENT

### Vercel Configuration

```json
// vercel.json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/api" }]
}
```

### Environment Variables

```env
# Database
MONGODB_URI=mongodb+srv://...

# Clerk Auth
CLERK_SECRET_KEY=sk_...
CLERK_WEBHOOK_SECRET=whsec_...

# ImageKit
IMAGEKIT_PUBLIC_KEY=public_...
IMAGEKIT_PRIVATE_KEY=private_...
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/...

# Email
SMTP_USER=...
SMTP_PASS=...
SENDER_EMAIL=...

# AI
OPENROUTER_API_KEY=sk-or-...

# URLs
CLIENT_URL=http://localhost:5173
FRONTEND_URL=http://localhost:5173
```

---

## 📈 PERFORMANCE OPTIMIZATIONS

1. **Code Splitting** - React.lazy() cho routes
2. **CDN** - ImageKit cho media files
3. **Caching** - Browser caching headers
4. **Compression** - Gzip responses
5. **WebSocket** - Reduce HTTP overhead
6. **Efficient Queries** - Mongoose populate, select

---

## 📝 TỔNG KẾT

### Tổng số công nghệ sử dụng: **25+**

| Category             | Technologies                                     |
| -------------------- | ------------------------------------------------ |
| **Frontend Core**    | React 19, Vite 7, TailwindCSS 4                  |
| **State Management** | Redux Toolkit, React Context                     |
| **Routing**          | React Router DOM 7                               |
| **Authentication**   | Clerk (React + Express)                          |
| **Real-time**        | Socket.io, SSE, WebRTC                           |
| **Backend**          | Node.js, Express 5                               |
| **Database**         | MongoDB, Mongoose                                |
| **Background Jobs**  | Inngest                                          |
| **Media**            | ImageKit, Multer                                 |
| **Email**            | Nodemailer, Brevo SMTP                           |
| **AI**               | OpenRouter API                                   |
| **UI Components**    | Lucide Icons, React Hot Toast, @hello-pangea/dnd |
| **Utilities**        | Axios, Moment.js, React Markdown                 |

### Điểm nổi bật của dự án:

1. ✅ **Full-stack JavaScript** - Cùng ngôn ngữ frontend & backend
2. ✅ **Real-time features** - Chat, Video call, Notifications
3. ✅ **Agile Integration** - Kanban, Sprint, Task Management
4. ✅ **Task Handover** - Tính năng độc đáo, giải quyết vấn đề thực tế
5. ✅ **AI Assistant** - Tích hợp AI chat
6. ✅ **Modern UI** - Dark mode, Responsive, Drag & Drop
7. ✅ **Enterprise-ready** - Admin panel, Role-based access

---

_Tài liệu được tạo tự động bởi Cascade AI - Cập nhật: Tháng 12/2024_
