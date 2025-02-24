import { Schema, model, SchemaTypes } from "mongoose";

const UsersSchema = new Schema({
  first_name: { type: String, trim: true },
  last_name: { type: String, trim: true },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  age: Number,
  password: {
    type: String,
    required: true,
    trim: true,
  },
  cart: { type: SchemaTypes.ObjectId, ref: "Carts" },
  role: {
    type: String,
    default: "user",
    trim: true,
  },
});

export default model("Users", UsersSchema);
