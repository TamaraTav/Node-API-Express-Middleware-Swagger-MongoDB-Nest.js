import mongoose from "mongoose";
import Product from "./productModel.js";

const stockHistorySchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        previousStock: {
            type: Number,
            required: true,
        },
        newStock: {
            type: Number,
            required: true,
        },
        changeDate: {
            type: Date,
            default: Date.now
        },
    },
{
    timestamps: true,
    },
);

const StockHistory = mongoose.model("StockHistory", stockHistorySchema);

export default StockHistory;