import { connect } from "mongoose";

export const connectDb = async () => {
  try {
    await connect(
      "mongodb+srv://antonioaestrella:clavebackend1@backend1.qkwu0.mongodb.net/backend2"
    );
    console.log("DB connected");
  } catch (error) {
    console.log("Error connecting to DB" + error.message);
  }
};

export default connectDb;
