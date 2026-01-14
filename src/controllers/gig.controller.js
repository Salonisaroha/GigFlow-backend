import Gig from "../models/Gig.model.js";
import Bid from "../models/Bid.model.js";
import jwt from "jsonwebtoken";

export const createGig = async (req, res) => {
    try {
        const { title, description, budget } = req.body;
        if (!title || !description || !budget) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const gig = await Gig.create({
            title,
            description,
            budget,
            ownerId: req.user._id,
        });
        res.status(201).json(gig);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getOpenGigs = async (req, res) => {
    try {
        const { search } = req.query;
        let query = { status: "open" };

      
        const token = req.cookies.token;
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                query.ownerId = { $ne: decoded.userId };
            } catch (error) {
               
            }
        }

        if (search) {
            query.title = { $regex: search, $options: "i" };
        }
        const gigs = await Gig.find(query)
            .populate("ownerId", "name email")
            .sort({ createdAt: -1 });
        res.json(gigs);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getMyGigs = async (req, res) => {
    try {
        const gigs = await Gig.find({ ownerId: req.user._id })
            .sort({ createdAt: -1 });
        res.json(gigs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getGigById = async (req, res) => {
    try {
        const gig = await Gig.findById(req.params.id)
            .populate("ownerId", "name email").lean();

        if (!gig) {
            return res.status(404).json({ message: "Gig not found" });
        }

        let hasApplied = false;
        const token = req.cookies.token;
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const bid = await Bid.findOne({ gigId: gig._id, freelancerId: decoded.userId });
                if (bid) {
                    hasApplied = true;
                }
            } catch (error) {
               
            }
        }

        res.json({ ...gig, hasApplied });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}