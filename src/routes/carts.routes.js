import { Router } from "express";
import cartsController from "../controllers/carts.controller.js";
import checkAuthRoles from "../middlewares/roles.middleware.js";
import { level_2 } from "../config/authProfiles.js";

const ROUTER = Router();

// ALL CARTS
ROUTER.get("/", checkAuthRoles(level_2), async (req, res) => {
  try {
    const allCarts = await cartsController.findAll();

    res.status(200).json({ status: "success", payload: allCarts });
  } catch (e) {
    res.status(500).json({ status: "error", code: 500, message: e.message });
  }
});

// CART BY ID
ROUTER.get("/:id", checkAuthRoles(level_2), async (req, res) => {
  const id = req.params.id;

  try {
    const cart = await cartsController.findOneById(id);

    res.status(200).json({ status: "success", payload: cart });
  } catch (e) {
    res.status(500).json({ status: "error", code: 500, message: e.message });
  }
});

// UPDATE CART
ROUTER.post("/:id", checkAuthRoles(level_2), async (req, res) => {
  const id = req.params.id;
  const newData = req.body;
  try {
    const cart = await cartsController.updateOneById(id, newData);

    res.status(200).json({ status: "success", payload: cart });
  } catch (e) {
    res.status(500).json({ status: "error", code: 500, message: e.message });
  }
});

export default ROUTER;
