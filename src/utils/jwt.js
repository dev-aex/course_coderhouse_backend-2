import jwt from "jsonwebtoken";

const JWT_SECRET = "misupersecretosuperescondido";

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
