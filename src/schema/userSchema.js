//{name:"Laptop", price:100000, quantity:10, isDamage:false}

import { Schema } from "mongoose";

let userSchema = Schema(
  {
    firstName: {
      type: String,
      required: [true, "firstName is required"],
    },
    lastName: {
      type: String,
      required: [true, "lastName is required"],
    },
    email: {
      type: String,
      required: [true, "email is required."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required."],
      select: false,
      // validate: (value) => {
      //   let rejexCondition =
      //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,15}$/.test(value);
      //   if (rejexCondition === false) {
      //     throw new Error(
      //       "min 8 character , max 15 character, at least one uppercase, at least one lowercase, must have at least one special character",
      //     );
      //   }
      // },
    },
    profilePic: {
      type: String,
      required: false,
    },
    isVerifiedEmail: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

export default userSchema;

/* 
String
Number
Boolean
Date
ObjectId
 */
