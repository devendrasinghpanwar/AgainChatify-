import express from "express";
import { signup } from "../controller/authController.js";

const router = express.Router();

router.post("/signup", signup);

router.get("/login", (req, res) => {
  res.send("Login page");
});

router.get("/logout", (req, res) => {
  res.send("Logout page");
});
console.log("🔥 authRoutes loaded 🔥");
router.post("/test", (req, res) => {
  res.json({ message: "Auth router working" });
});

export default router;
