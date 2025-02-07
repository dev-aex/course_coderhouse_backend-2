import { Router } from "express";
import passport from "passport";
import usersModel from "../models/user.model.js";
import { generateToken } from "../utils/jwt.js";
import { isValidPassword } from "../utils/bcrypt.js";

const ROUTER = Router();

// CURRENT
ROUTER.get(
  "/current",
  passport.authenticate("current", { session: false }),
  (req, res) => {
    try {
      const { user } = req.user;
      res.render("current", { title: "LogIn", user });
    } catch (error) {
      res
        .status(500)
        .json({ status: "error", message: `Error: ${error.message}` });
    }
  }
);

// REGISTER
ROUTER.post(
  "/register",
  passport.authenticate("register", {
    session: false,
    successRedirect: "/login",
    failureRedirect: "/register",
  }),
  async (req, res) => {
    const { user, token } = req.user;

    try {
      res
        .cookie("authCookie", token, { httpOnly: true, maxAge: 5 * 60 * 1000 })
        .status(201)
        .json({ status: "success", payload: user });
    } catch (error) {
      res.status(401).json({ status: "error", message: "User already exist" });
    }
  }
);

// LOGIN
ROUTER.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await usersModel.findOne({ email });

    if (!userFound)
      return res.status(404).json({ status: "error", error: "User not found" });

    const isValidPass = isValidPassword(password, userFound.password);

    if (!isValidPass)
      return res
        .status(401)
        .json({ status: "error", message: "Invalid password" });

    const user = { ...userFound };
    delete user._doc.password;

    let token = generateToken(user);
    res
      .cookie("authCookie", token, { maxAge: 5 * 60 * 1000, httpOnly: true })
      .redirect("/api/sessions/current");
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// LOGOUT
ROUTER.post(
  "/logout",
  passport.authenticate("current", { session: false }),
  (req, res) => {
    try {
      res.clearCookie("authCookie");
      res.redirect("/login");
    } catch (error) {
      res
        .status(500)
        .json({ status: "error", message: `Error: ${error.message}` });
    }
  }
);

export default ROUTER;
