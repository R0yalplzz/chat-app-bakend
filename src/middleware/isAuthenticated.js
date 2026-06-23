import expressAsyncHandler from "express-async-handler";
import { secretKey } from "../config.js";
import jwt from "jsonwebtoken";

let isAuthenticated = expressAsyncHandler(async (req, res, next) => {
  try {
    let tokenString = req.headers.authorization;

    if (!tokenString) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }
    let tokenArray = tokenString.split(" ");
    let token = tokenArray[1];
    let user = await jwt.verify(token, secretKey);
    req._id = user._id;

    next();
  } catch (error) {
    res.status(401).json({
      sucess: false,
      message: "Token not valid",
    });
  }
});

export default isAuthenticated;
