import express from "express";
import protect from "../middlewares/auth.middleware.js";
import { hireBid } from "../controllers/bid.controller.js";
import {
    createBid,
    getBidsForGig,
    getMyBids,
} from "../controllers/bid.controller.js";

const router = express.Router();

router.post("/", protect, createBid);
router.get("/my-bids", protect, getMyBids);
router.get("/:gigId", protect, getBidsForGig);
router.patch("/:bidId/hire", protect, hireBid);

export default router;