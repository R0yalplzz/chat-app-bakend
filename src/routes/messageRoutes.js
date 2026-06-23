import { Router } from "express";
import {
  getALLMessageController,
  newMessageController,
} from "../controller/messageController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const messageRoutes = Router();

messageRoutes
  .route("/new-message")

  .post(isAuthenticated, newMessageController);
messageRoutes
  .route("/get-all-message/:chatId")

  .get(isAuthenticated, getALLMessageController);

export default messageRoutes;
