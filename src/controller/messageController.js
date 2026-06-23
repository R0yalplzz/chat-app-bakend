import expressAsyncHandler from "express-async-handler";
import { Chat, Message } from "../schema/model.js";

export const newMessageController = expressAsyncHandler(
  async (req, res, next) => {
    const newMessage = new Message(req.body);
    const savedMessage = await newMessage.save();

    /* const currentChat = await Chat.findById(req.body.chatId);
    currentChat.lastMessage = savedMessage._id;
    await currentChat.save(); */

    const currentChat = await Chat.findOneAndUpdate(
      { _id: req.body.chatId },

      { lastMessage: savedMessage._id, $inc: { unreadMessageCount: 1 } },
    );

    res.status(201).send({
      message: "Message send successfully",
      success: true,
      data: savedMessage,
    });
  },
);

export const getALLMessageController = expressAsyncHandler(
  async (req, res, next) => {
    const allMessage = await Message.find({ chatId: req.params.chatId }).sort({
      createdAt: 1,
    });

    /* const currentChat = await Chat.findById(req.body.chatId);
    currentChat.lastMessage = savedMessage._id;
    await currentChat.save(); */

    res.status(200).send({
      message: "Message fetched successfully",
      success: true,
      data: allMessage,
    });
  },
);
