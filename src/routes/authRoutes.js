import { Router } from "express";
import {
  loginUserController,
  signupUserController,
  verifyEmailController,
} from "../controller/authController.js";

const authRoutes = Router();

authRoutes
  .route("/signup")

  .post(signupUserController);

authRoutes
  .route("/login")

  .post(loginUserController);

authRoutes
  .route("/verify-email")

  .patch(verifyEmailController);

export default authRoutes;
