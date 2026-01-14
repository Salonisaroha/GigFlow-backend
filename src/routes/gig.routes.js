import express from "express";
import protect from "../middlewares/auth.middleware.js";
import {
    createGig,
    getOpenGigs,
    getGigById,
    getMyGigs,
} from "../controllers/gig.controller.js";

const router = express.Router();

router.get("/", getOpenGigs);
router.get("/my-gigs", protect, getMyGigs);
router.post("/", protect, createGig);
router.get("/:id", getGigById);

export default router;