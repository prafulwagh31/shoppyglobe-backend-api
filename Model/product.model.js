import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    stockQty: {
        type: Number,
        required: true
    }
});

const productModel = mongoose.model("Product", productSchema);

export default productModel;