import expressAsyncHandler from "express-async-handler";
import { User } from "../schema/model.js";

export const myProfileController = expressAsyncHandler(
  async (req, res, next) => {
    let _id = req._id;
    let result = await User.findById(_id);
    res.status(200).json({
      success: true,
      message: "profile read sucessfully",
      data: result,
    });
  },
);

export const readAllUserController = expressAsyncHandler(
  async (req, res, next) => {
    const userid = req._id;
    let result = await User.find({ _id: { $ne: userid } });
    res.status(200).json({
      success: true,
      message: "All user read sucessfully",
      data: result,
    });
  },
);
