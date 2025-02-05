import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    unique: true,
  },
  age: Number,
  password: String,
  cart: Number,
  role: {
    type: String,
    default: "user",
  },
});

export default model("User", UserSchema);
