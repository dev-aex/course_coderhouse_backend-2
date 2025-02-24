import { Router } from "express";
import productsController from "../controllers/products.controller.js";
import checkAuthRoles from "../middlewares/roles.middleware.js";
import { level_2 } from "../config/authProfiles.js";

const ROUTER = Router();

// ALL PRODUCTS
ROUTER.get("/", checkAuthRoles(level_2), async (req, res) => {
  try {
    const allProducts = await productsController.findAll();

    res.status(200).json({ status: "success", payload: allProducts });
  } catch (e) {
    res.status(500).json({ status: "error", code: 500, message: e.message });
  }
});

// PRODUCT BY ID
ROUTER.get("/:id", checkAuthRoles(level_2), async (req, res) => {
  const id = req.params.id;

  try {
    const product = await productsController.findOneById(id);

    res.status(200).json({ status: "success", payload: product });
  } catch (e) {
    res.status(500).json({ status: "error", code: 500, message: e.message });
  }
});

// CREATE PRODUCT
ROUTER.post("/", checkAuthRoles(level_2), async (req, res) => {
  const productData = req.body;
  try {
    const productNew = await productsController.createOne(productData);

    res.status(200).json({ status: "success", payload: productNew });
  } catch (e) {
    res.status(500).json({ status: "error", code: 500, message: e.message });
  }
});

// UPDATE PRODUCT
ROUTER.post("/:id", checkAuthRoles(level_2), async (req, res) => {
  const id = req.params.id;
  const newData = req.body;
  try {
    const product = await productsController.updateOneById(id, newData);

    res.status(200).json({ status: "success", payload: product });
  } catch (e) {
    res.status(500).json({ status: "error", code: 500, message: e.message });
  }
});

// DELETE PRODUCT
ROUTER.delete("/:id", checkAuthRoles(level_2), async (req, res) => {
  const id = req.params.id;
  try {
    const result = await productsController.deleteOneById(id);

    res.status(200).json({ status: "success", payload: result });
  } catch (e) {
    res.status(500).json({ status: "error", code: 500, message: e.message });
  }
});

export default ROUTER;
