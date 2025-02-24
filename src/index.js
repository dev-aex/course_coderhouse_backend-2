import express from "express";
import env from "./config/env.config.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import ConnectMongoDB from "./config/mongo.config.js";
import initializePassport from "./config/passport.config.js";
import viewsRoutes from "./routes/views.routes.js";
import sessionsRoutes from "./routes/sessions.routes.js";
import usersRoutes from "./routes/users.routes.js";
import productsRoutes from "./routes/products.routes.js";
import cartsRoutes from "./routes/carts.routes.js";
import ticketsRoutes from "./routes/tickets.routes.js";

// SERVER SETTINGS
const APP = express();
const PORT = env.port ?? 3000;
const SIGN = env.cookie_sign;

// MIDDLEWARES
APP.use(express.json());
APP.use(express.urlencoded({ extended: true }));
APP.use(express.static("public"));
APP.use(cookieParser(SIGN));

// PASSPORT
initializePassport();
APP.use(passport.initialize());

// ROUTES
APP.use("/", viewsRoutes);
APP.use("/api/sessions", sessionsRoutes);
APP.use("/api/users", usersRoutes);
APP.use("/api/products", productsRoutes);
APP.use("/api/carts", cartsRoutes);
APP.use("/api/tickets", ticketsRoutes);

// DB
ConnectMongoDB.getInstance();

APP.listen(PORT, () => {
  console.log(`Server on port: http://localhost:${PORT}`);
});
