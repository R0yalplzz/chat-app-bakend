import expressAsyncHandler from "express-async-handler";
import { Chat, Message } from "../schema/model.js";

export const newChatController = expressAsyncHandler(async (req, res, next) => {
  const chat = new Chat(req.body);
  const savedChat = await chat.save();
  await savedChat.populate("members");
  res.status(201).send({
    message: "Chat created successfully",
    success: true,
    data: savedChat,
  });
});

export const getAllChatController = expressAsyncHandler(
  async (req, res, next) => {
    const allChats = await Chat.find({ members: { $in: [req._id] } })
      .populate("lastMessage")
      .populate("members")
      .sort({
        updatedAt: -1,
      });

    res.status(200).send({
      message: "Chat fetched successfully",
      success: true,
      data: allChats,
    });
  },
);

export const clearUnreadMessageController = expressAsyncHandler(
  async (req, res, next) => {
    const chatId = req.body.chatId;
    const chat = await Chat.findById(chatId);
    if (!chat) {
      res.send({
        message: "No Chat Found with given chat ID.",
        success: false,
      });
    }
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { unreadMessageCount: 0 },
      { new: true },
    )
      .populate("members")
      .populate("lastMessage");
    await Message.updateMany({ chatId: chatId, read: false }, { read: true });
    res.status(200).send({
      message: "Unread message cleared successfully",
      success: true,
      data: updatedChat,
    });
  },
);
