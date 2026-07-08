import cors from "cors";
import express, { json } from "express";
import http from "http";
import { port } from "./src/config.js";
import { Server } from "socket.io";
import connectToMongoDb from "./src/connectToDb/connectToMongoDb.js";
import pageNotFoundMiddleware from "./src/middleware/pageNotFoundMiddleware.js";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import chatRoutes from "./src/routes/chatRoutes.js";
import messageRoutes from "./src/routes/messageRoutes.js";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

app.use(express.static("public")); //to make public folder as static folder

app.use(cors());

app.use(json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

io.on("connection", (socket) => {
  socket.on("join-room", (userid) => {
    socket.join(userid);
  });

  socket.on("send-message", (message) => {
    io.to(message.members[0])
      .to(message.members[1])
      .emit("receive-message", message);
  });

  socket.on("clear-unread-messages", (data) => {
    io.to(data.members[0])
      .to(data.members[1])
      .emit("message-count-cleared", data);
  });

  socket.on("user-typing", (data) => {
    io.to(data.members[0]).to(data.members[1]).emit("started-typing", data);
  });
});

server.listen(port, () => {
  console.log(`application is listening at port ${port}`);
  connectToMongoDb();
});

app.use("", pageNotFoundMiddleware);
app.use((err, req, res, next) => {
  res.json({
    sucess: false,
    message: err.message,
  });
});
