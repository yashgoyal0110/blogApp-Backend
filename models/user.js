import mongoose from "mongoose";
// import { emit } from "nodemon";

const UserSchema = new mongoose.Schema(
  {
    FullName: {
      type: String,
    },
    email: {
      type: String,
    },
    image: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timeStamps: true }
);

const UserModel = mongoose.model("Users", UserSchema);

export default UserModel
