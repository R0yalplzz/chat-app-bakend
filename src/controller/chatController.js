import expressAsyncHandler from "express-async-handler";
import { Chat } from "../schema/model.js";

export const newChatController = expressAsyncHandler(async (req, res, next) => {
  const chat = new Chat(req.body);
  const savedChat = await chat.save();
  res.status(201).send({
    message: "Chat created successfully",
    success: true,
    data: savedChat,
  });
});

export const getAllChatController = expressAsyncHandler(
  async (req, res, next) => {
    const allChats = await Chat.find({ members: { $in: req._id } }).sort({
      updatedAt: -1,
    });
    res.status(200).send({
      message: "Chat fetched successfully",
      success: true,
      data: allChats,
    });
  },
);
