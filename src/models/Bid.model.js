import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({
    gigId: { type:mongoose.Schema.Types.ObjectId, ref: "Gig"},
    freelancerId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    message: {type: String, required:true},
    price: {type: Number, required: true},
    status: {
        type: String,
        enum: ["pending", "hired", "rejected"],
        default: "pending",
    }
},
{
    timestamps:true
});

export default mongoose.model("Bid", bidSchema);