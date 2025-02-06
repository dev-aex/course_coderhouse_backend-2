import { Router } from "express";
import passport from "passport";
import usersModel from "../models/user.model.js";

const ROUTER = Router();

// HOME
ROUTER.get("/", (req, res) => {
  res.render("home", { title: "Home" });
});

// LOGIN
ROUTER.get("/login", (req, res) => {
  res.render("login", { title: "LogIn" });
});

// REGISTER
ROUTER.get("/register", (req, res) => {
  res.render("register", { title: "Register" });
});

export default ROUTER;
