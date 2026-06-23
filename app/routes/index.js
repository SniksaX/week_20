import express from "express";
import userRoutes from "./user.js";
import woodRoutes from "./wood.js";

export const router = express.Router();

router.use("/auth", userRoutes);
router.use("/woods", woodRoutes);