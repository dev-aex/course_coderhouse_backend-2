import { Router } from "express";
import passport from "passport";
import checkAuthRoles from "../middlewares/roles.middleware.js";
import { level_1 } from "../config/authProfiles.js";
import cartsController from "../controllers/carts.controller.js";
import ticketsController from "../controllers/tickets.controller.js";

const ROUTER = Router();

// PROFILE
ROUTER.get(
  "/profile",
  checkAuthRoles(level_1),
  passport.authenticate("current", { session: false }),

  (req, res) => {
    try {
      const { user } = req.user;
      res.status(200).json({ status: "success", payload: user });
    } catch (e) {
      res.status(500).json({ status: "error", message: e.message });
    }
  }
);

// GET USER CART
ROUTER.get(
  "/mycart",
  checkAuthRoles(level_1),
  passport.authenticate("current", { session: false }),
  async (req, res) => {
    try {
      const { user } = req.user;

      const userCart = await cartsController.findOneByIdPopulate(user.cart);

      res.status(200).json({ status: "success", payload: userCart });
    } catch (e) {
      res.status(500).json({ status: "error", message: e.message });
    }
  }
);

// ADD PRODUCT TO CART
ROUTER.post(
  "/mycart/add/:id",
  checkAuthRoles(level_1),
  passport.authenticate("current", { session: false }),
  async (req, res) => {
    const productId = req.params.id;
    try {
      const { user } = req.user;

      const updatedCart = await cartsController.addOneProductToCartById(
        user.cart,
        productId
      );

      res.status(200).json({ status: "success", payload: updatedCart });
    } catch (e) {
      res.status(500).json({ status: "error", message: e.message });
    }
  }
);

// DELETE ALL PRODUCTS ON CART
ROUTER.delete(
  "/mycart/delete",
  checkAuthRoles(level_1),
  passport.authenticate("current", { session: false }),
  async (req, res) => {
    try {
      const { user } = req.user;

      const updatedCart = await cartsController.deleteAllProductsOnCart(
        user.cart
      );

      res.status(200).json({ status: "success", payload: updatedCart });
    } catch (e) {
      res.status(500).json({ status: "error", message: e.message });
    }
  }
);

// DELETE ONE PRODUCT ON CART
ROUTER.delete(
  "/mycart/delete/:id",
  checkAuthRoles(level_1),
  passport.authenticate("current", { session: false }),
  async (req, res) => {
    const productId = req.params.id;
    try {
      const { user } = req.user;

      const updatedCart = await cartsController.deleteOneProductOnCartById(
        user.cart,
        productId
      );

      res.status(200).json({ status: "success", payload: updatedCart });
    } catch (e) {
      res.status(500).json({ status: "error", message: e.message });
    }
  }
);

// PROCESS TICKET
ROUTER.post(
  "/purchase",
  checkAuthRoles(level_1),
  passport.authenticate("current", { session: false }),
  async (req, res) => {
    try {
      const { user } = req.user;

      const newTicket = await ticketsController.createOne(user.cart);

      res.status(200).json({ status: "success", payload: newTicket });
    } catch (e) {
      res.status(500).json({ status: "error", message: e.message });
    }
  }
);

// LOGOUT
ROUTER.post(
  "/logout",
  checkAuthRoles(level_1),
  passport.authenticate("current", { session: false }),
  (req, res) => {
    try {
      res.clearCookie("authCookie");

      res.status(200).json({ status: "success" });
    } catch (e) {
      res.status(500).json({ status: "error", message: e.message });
    }
  }
);

export default ROUTER;
