import expressAsyncHandler from "express-async-handler";
import { User } from "../schema/model.js";
import cloudinary from "../../cloudinary/cloudinary.js";

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

export const uploadProfilePicUserController = expressAsyncHandler(
  async (req, res, next) => {
    const image = req.body.image;

    console.log("req.body:", req.body);
    console.log("userId:", req._id);

    const uploadedImage = await cloudinary.uploader.upload(image, {
      folder: "quick-chat",
    });

    const user = await User.findByIdAndUpdate(
      { _id: req._id },
      { profilePic: uploadedImage.secure_url },
      { new: true },
    );
    res.send({
      message: "Profile picture uploaded successfully",
      success: true,
      data: user,
    });
  },
);
