const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const http = require("http");
const cors = require("cors");

dotenv.config();

const app = express();
const server = http.createServer(app);

// ------------------------------
// ALLOWED ORIGINS
// ------------------------------
const allowedOrigins = [
  "http://localhost:3000",  
  "https://key-frames.vercel.app"
  "https://key-frames-77pg8b03g-nk-43e0.vercel.app"        // Vercel frontend
];

// ------------------------------
// USE CORS MIDDLEWARE
// ------------------------------
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
    credentials: true,
  })
);

// Preflight fix for browsers
app.options("*", cors());

// ------------------------------
// BODY PARSER
// ------------------------------
app.use(express.json());

// ------------------------------
// SOCKET.IO
// ------------------------------
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Attach io instance
app.use((req, res, next) => {
  req.io = io;
  next();
});

// ------------------------------
// ROUTES
// ------------------------------
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const contactRoutes = require("./routes/contacts");
const adminRoutes = require("./routes/admin");
const notificationRoutes = require("./routes/notifications");
const paymentRoutes = require("./routes/payment");

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/uploads", express.static("uploads"));

// ------------------------------
// DATABASE CONNECTION
// ------------------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// ------------------------------
// TEST ROUTE
// ------------------------------
app.get("/", (req, res) => res.send("✅ Backend server running!"));

// ------------------------------
// SOCKET.IO CONNECTION
// ------------------------------
io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  socket.on("register-user", (userId) => {
    if (userId) {
      socket.join(userId);
      console.log(`📡 User ${userId} joined personal room`);
    }
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

// ------------------------------
// START SERVER
// ------------------------------
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
