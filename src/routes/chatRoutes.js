import { Router } from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import {
  getAllChatController,
  newChatController,
} from "../controller/chatController.js";

const chatRoutes = Router();

chatRoutes
  .route("/create-new-chat")

  .post(isAuthenticated, newChatController);
chatRoutes
  .route("/get-all-chats")

  .get(isAuthenticated, getAllChatController);

export default chatRoutes;
