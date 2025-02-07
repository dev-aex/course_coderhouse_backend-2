import { Router } from "express";
import passport from "passport";

const ROUTER = Router();

// HOME
ROUTER.get("/", (req, res) => {
  res.render("home");
});

// LOGIN
ROUTER.get("/login", (req, res) => {
  res.render("login");
});

// REGISTER
ROUTER.get("/register", (req, res) => {
  res.render("register");
});

// REGISTER GOOGLE
ROUTER.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    scope: ["email", "profile"],
    successRedirect: "/current",
    failureRedirect: "/login",
  })
);

export default ROUTER;
