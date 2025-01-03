import mongoose, { Schema } from "mongoose";

const cartSchema = mongoose.Schema({
    quantity: {
        type: Number,
        required: true,
    },
    user: {
        ref: "User",
        type: Schema.Types.ObjectId,
        required: true,
    },
    product: {
        ref: "Product",
        type: Schema.Types.ObjectId,
        required: true,
    }
}, { timestamps: true });

const cartModel = mongoose.model("cart", cartSchema);

export default cartModel;