import nodemailer from "nodemailer";
import env from "../config/env.config.js";

export const transport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: env.recover_email_username,
    pass: env.recover_email_password,
  },
});

export const recoverEmail = env.recover_email_username;
