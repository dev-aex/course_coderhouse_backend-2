import { Router } from "express";
import passport from "passport";
import { transport, recoverEmail } from "../config/mailer.config.js";

const ROUTER = Router();

// REGISTER
ROUTER.post(
  "/register",
  passport.authenticate("register", {
    session: false,
  }),
  async (req, res) => {
    const { user } = req.user;
    try {
      res.status(201).json({ status: "success", payload: user });
    } catch (e) {
      res.status(500).json({ status: "error", message: e.message });
    }
  }
);

// RECOVER
ROUTER.post("/recover", async (req, res) => {
  const { email } = req.body;
  try {
    const result = await transport.sendMail({
      from: recoverEmail,
      to: email,
      subject: "Recuperar contraseña",
      html: `<div>
                  <h1>Recuperar contraseña</h1>
                  
                 <p>Hola ${email} entra a este link para recuperar tu contraseña:</p>
                 
                 <a href="www.google.com">Recuperar password</a>
              </div>`,
    });

    res.status(201).json({ status: "success", payload: result });
  } catch (e) {
    res.status(500).json({ status: "error", message: e.message });
  }
});

// LOGIN
ROUTER.post(
  "/login",
  passport.authenticate("login", {
    session: false,
  }),
  async (req, res) => {
    const { token, user } = req.user;
    try {
      res
        .cookie("authCookie", token, {
          httpOnly: true,
          maxAge: 5 * 60 * 1000,
        })
        .status(200)
        .json({ status: "success", payload: user });
    } catch (e) {
      res.status(500).json({ status: "error", message: e.message });
    }
  }
);

export default ROUTER;
