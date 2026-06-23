import cors from "cors";
import express, { json } from "express";
import { port } from "./src/config.js";
import connectToMongoDb from "./src/connectToDb/connectToMongoDb.js";
import pageNotFoundMiddleware from "./src/middleware/pageNotFoundMiddleware.js";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import chatRoutes from "./src/routes/chatRoutes.js";
import messageRoutes from "./src/routes/messageRoutes.js";

const app = express();

app.listen(port, () => {
  console.log(`application is listening at port ${port}`);
  connectToMongoDb();
});

app.use(express.static("public")); //to make public folder as static folder

app.use(cors());

app.use(json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use("", pageNotFoundMiddleware);
app.use((err, req, res, next) => {
  res.json({
    sucess: false,
    message: err.message,
  });
});

/* Goat. */
