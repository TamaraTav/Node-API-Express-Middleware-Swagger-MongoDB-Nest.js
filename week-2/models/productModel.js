import mongoose from "mongoose";


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
})
const Product = mongoose.model("Product", productSchema);

export default Product;