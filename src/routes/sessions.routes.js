import { Router } from "express";
import passport from "passport";

const ROUTER = Router();

// CURRENT
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send(req.user);
  }
);

export default ROUTER;
