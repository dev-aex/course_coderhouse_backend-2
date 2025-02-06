import { Router } from "express";
import passport from "passport";
import usersModel from "../models/user.model.js";
import { generateToken } from "../utils/jwt.js";

const ROUTER = Router();

// CURRENT
ROUTER.get(
  "/current",
  passport.authenticate("current", { session: false }),
  (req, res) => {
    try {
      res.status(200).json({ status: "success", payload: req.user });
    } catch (error) {
      res
        .status(500)
        .json({ status: "error", message: `Error: ${error.messages}` });
    }
  }
);

// REGISTER
ROUTER.post(
  "/register",
  passport.authenticate("register"),
  async (req, res) => {
    res.status(201).json({ status: "success", payload: req.user });
    redirect("/login");
  }
);

// LOGIN
ROUTER.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await usersModel.findOne({ email });

    if (!userFound)
      return res.status(404).json({ status: "error", error: "User not found" });

    const user = { ...userFound };
    delete user._doc.password;

    let token = generateToken(user);
    res
      .cookie("authCookie", token, { maxAge: 60 * 60 * 1000, httpOnly: true })
      .redirect("/api/sessions/current");
  } catch (error) {
    res.status(500).send(`Server Error: ${error}`);
  }
});

export default ROUTER;
