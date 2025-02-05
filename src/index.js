import express from "express";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import passport from "passport";
import connectDB from "./config/mongo.config.js";
import initializePassport from "./config/passport.config.js";
import viewsRoutes from "./routes/views.routes.js";
import sessionsRoutes from "./routes/sessions.routes.js";

// SERVER SETTINGS
const APP = express();
const PORT = 3000;
const FIRMA = "misuperfirmasecreta";

// HANDLEBARS SETTINGS
APP.engine("handlebars", engine());
APP.set("view engine", "handlebars");
APP.set("views", "./src/views");

// MIDDLEWARES
APP.use(express.json());
APP.use(express.urlencoded({ extended: true }));
APP.use(express.static("public"));
app.use(cookieParser(FIRMA));

// PASSPORT
initializePassport();
app.use(passport.initialize());

// ROUTES
APP.use("/", viewsRoutes);
app.use("/api/sessions", sessionsRoutes);

// DB
connectDB();

APP.listen(PORT, () => {
  console.log(`Server on port: http://localhost:${PORT}`);
});
