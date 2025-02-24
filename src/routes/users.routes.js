import { Router } from "express";
import userController from "../controllers/users.controller.js";
import checkAuthRoles from "../middlewares/roles.middleware.js";
import { level_2 } from "../config/authProfiles.js";

const ROUTER = Router();

// ALL USERS
ROUTER.get("/", checkAuthRoles(level_2), async (req, res) => {
  try {
    const allUsers = await userController.getAll();

    res.status(200).json({ status: "success", payload: allUsers });
  } catch (e) {
    res.status(500).json({ status: "error", code: 500, message: e.message });
  }
});

// USER BY ID
ROUTER.get("/:id", checkAuthRoles(level_2), async (req, res) => {
  const id = req.params.id;

  try {
    const user = await userController.getOneById(id);

    res.status(200).json({ status: "success", payload: user });
  } catch (e) {
    res.status(500).json({ status: "error", code: 500, message: e.message });
  }
});

// UPDATE USER
ROUTER.post("/:id", checkAuthRoles(level_2), async (req, res) => {
  const id = req.params.id;
  const newData = req.body;
  try {
    const user = await userController.updateOneById(id, newData);

    res.status(200).json({ status: "success", payload: user });
  } catch (e) {
    res.status(500).json({ status: "error", code: 500, message: e.message });
  }
});

// DELETE USER
ROUTER.delete("/:id", checkAuthRoles(level_2), async (req, res) => {
  const id = req.params.id;
  try {
    const result = await userController.deleteOneById(id);

    res.status(200).json({ status: "success", payload: result });
  } catch (e) {
    res.status(500).json({ status: "error", code: 500, message: e.message });
  }
});

export default ROUTER;
