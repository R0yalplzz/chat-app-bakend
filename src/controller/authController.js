import bcrypt from "bcrypt";
import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { secretKey } from "../config.js";
import { User } from "../schema/model.js";
import { sendEmail } from "../utils/sendEmail.js";

export const signupUserController = expressAsyncHandler(
  async (req, res, next) => {
    let data = req.body;
    let hashPassword = await bcrypt.hash(data.password, 10);
    data = {
      ...data,
      isVerifiedEmail: false,
      password: hashPassword,
    };

    let result = await User.create(data);

    let infoObj = {
      _id: result._id,
    };

    let expiryInfo = {
      expiresIn: "5d",
    };

    let token = await jwt.sign(infoObj, secretKey, expiryInfo);

    await sendEmail({
      to: data.email,
      subject: "Register",
      html: `<h1>you have sucessfully registered.</h1>
      <a href="http://localhost:3000/verify-email?token=${token}">http://localhost:3000/verify-email?token=${token}</a>`,
    });

    res.status(201).json({
      sucess: true,
      message: "webUser created sucessfully",
      data: result,
      token: token,
    });
  },
);

export const verifyEmailController = expressAsyncHandler(
  async (req, res, next) => {
    let tokenString = req.headers.authorization;
    let tokenArray = tokenString.split(" ");
    let token = tokenArray[1];
    let infoObj = await jwt.verify(token, secretKey);
    let userId = infoObj._id;
    let result = await User.findByIdAndUpdate(
      userId,
      { isVerifiedEmail: true },
      { new: true },
    );
    res.status(201).json({
      sucess: true,
      message: "user verify sucessfully",
    });
  },
);

export const loginUserController = expressAsyncHandler(
  async (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    let user = await User.findOne({ email: email }).select("+password");
    if (user) {
      if (user.isVerifiedEmail) {
        let isValidPassword = await bcrypt.compare(password, user.password);
        if (isValidPassword) {
          let infoObj = {
            _id: user._id,
          };
          let expiryInfo = { expiresIn: "365d" };
          let token = await jwt.sign(infoObj, secretKey, expiryInfo);
          res.status(200).json({
            sucess: true,
            message: "user login sucessfully",
            data: user,
            token: token,
          });
        } else {
          return res.status(401).json({
            success: false,
            message: "Credential does not match",
          });
        }
      } else {
        return res.status(403).json({
          success: false,
          message: "Email not verified",
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        message: "Credential not found",
      });
    }
  },
);
