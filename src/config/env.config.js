import { config } from "dotenv";

config();

export default {
  port: process.env.PORT,
  mongodb_url: process.env.MONGODB_URL,
  cookie_sign: process.env.COOKIE_SIGN,
  jwt_secret: process.env.JWT_SECRET,
  recover_email_username: process.env.RECOVER_EMAIL_USERNAME,
  recover_email_password: process.env.RECOVER_EMAIL_PASSWORD,
};
