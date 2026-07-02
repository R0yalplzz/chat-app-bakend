import { Router } from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import {
  clearUnreadMessageController,
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

chatRoutes
  .route("/clear-unread-messages")

  .post(isAuthenticated, clearUnreadMessageController);

export default chatRoutes;
