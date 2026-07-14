import { Router } from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import {
  myProfileController,
  readAllUserController,
  uploadProfilePicUserController,
} from "../controller/userController.js";

const userRoutes = Router();

userRoutes
  .route("/get-logged-user")

  .get(isAuthenticated, myProfileController);

userRoutes
  .route("/get-all-user")

  .get(isAuthenticated, readAllUserController);

userRoutes

  .route("/upload-profile-pic")

  .post(isAuthenticated, uploadProfilePicUserController);

export default userRoutes;
