import mongoose from "mongoose";
import { dbURL } from "../config.js";

const connectToMongoDb = async () => {
  try {
    await mongoose.connect(dbURL);
    console.log("application connected to databse sucessfully.");
  } catch (error) {
    console.log(error.message);
  }
};

export default connectToMongoDb;
