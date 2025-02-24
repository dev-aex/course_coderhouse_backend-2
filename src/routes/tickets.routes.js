import { Router } from "express";
import ticketsController from "../controllers/tickets.controller.js";
import checkAuthRoles from "../middlewares/roles.middleware.js";
import { level_2 } from "../config/authProfiles.js";

const ROUTER = Router();

// ALL TICKETS
ROUTER.get("/", checkAuthRoles(level_2), async (req, res) => {
  try {
    const allTickets = await ticketsController.findAll();

    res.status(200).json({ status: "success", payload: allTickets });
  } catch (e) {
    res.status(500).json({ status: "error", code: 500, message: e.message });
  }
});

// TICKET BY ID
ROUTER.get("/:id", checkAuthRoles(level_2), async (req, res) => {
  const id = req.params.id;

  try {
    const product = await ticketsController.findOneById(id);

    res.status(200).json({ status: "success", payload: product });
  } catch (e) {
    res.status(500).json({ status: "error", code: 500, message: e.message });
  }
});

// UPDATE TICKET
ROUTER.post("/:id", checkAuthRoles(level_2), async (req, res) => {
  const id = req.params.id;
  const newData = req.body;
  try {
    const product = await ticketsController.updateOneById(id, newData);

    res.status(200).json({ status: "success", payload: product });
  } catch (e) {
    res.status(500).json({ status: "error", code: 500, message: e.message });
  }
});

// DELETE TICKET
ROUTER.delete("/:id", checkAuthRoles(level_2), async (req, res) => {
  const id = req.params.id;
  try {
    const result = await ticketsController.deleteOneById(id);

    res.status(200).json({ status: "success", payload: result });
  } catch (e) {
    res.status(500).json({ status: "error", code: 500, message: e.message });
  }
});

export default ROUTER;
