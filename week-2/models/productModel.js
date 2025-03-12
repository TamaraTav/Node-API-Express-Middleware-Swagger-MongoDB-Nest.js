import mongoose from "mongoose";
import req from "express/lib/request.js";


const productSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: [true, "Name is Required"]},
    price: { type: Number, required: true, validate:
            {validator:(val) => val >0, message: "Price must be greater than 0"}},
    description: { type: String, required: true },
    stock: { type: Number, required: true },
    slug: { type: String },
    createdAt: { type: Date, default: Date.now },
    //timestamps: true  //ეს გასატესტი მაქვს
});

productSchema.pre('findOneAndDelete', async function (next) {
    console.log(this.getQuery());
    const product = await this.model.findOne(this.getQuery());
    if (product.stock > 0) {
       return next(new Error("Product can't be deleted, it has stock"));
    }
    next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;