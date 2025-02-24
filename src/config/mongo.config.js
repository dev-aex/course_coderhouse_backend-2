import mongoose from "mongoose";
import env from "./env.config.js";

const MONGO_URI = env.mongodb_url;

class ConnectMongoDB {
  static #instance;
  static async getInstance() {
    if (!ConnectMongoDB.#instance) {
      await mongoose.connect(MONGO_URI);
      ConnectMongoDB.#instance = mongoose.connection;
      console.log("DB connected");
    } else {
      console.log("DB already connected");
    }
    return ConnectMongoDB.#instance;
  }
}

export default ConnectMongoDB;
