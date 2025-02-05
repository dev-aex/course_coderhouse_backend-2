import { Router } from "express";
import { generateToken } from "../utils/jwt.js";

const ROUTER = Router();

// HOME
ROUTER.get("/", (req, res) => {
  res.render("home", { title: "Home" });
});

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const userFound = users.find(function (user) {
    return user.email === email && user.password === password;
  });

  const user = { ...userFound };
  delete user.password;

  if (!userFound) return res.status(401).send("Invalid credentials");

  let token = generateToken(user);
  res
    .cookie("authCookie", token, { maxAge: 60 * 60 * 1000, httpOnly: true })
    .send({ message: "Login exitoso" });
});

export default ROUTER;
