import jwt from "jsonwebtoken";
import env from "../config/env.js";

const JWT_SECRET = env.jwt_secret;

export const generateToken = (user) => {
  return jwt.sign({ user }, JWT_SECRET, { expiresIn: "5m" });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};
