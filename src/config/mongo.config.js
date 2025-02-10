import { connect } from "mongoose";
import env from "./env.js";

export const connectDb = async () => {
  const MONGO_URI = env.mongodb_url;

  try {
    await connect(MONGO_URI);
    console.log("DB connected");
  } catch (error) {
    console.log("Error connecting to DB" + error.message);
  }
};

export default connectDb;
