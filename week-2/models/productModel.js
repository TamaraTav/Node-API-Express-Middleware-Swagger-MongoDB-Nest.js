import mongoose from "mongoose";
import req from "express/lib/request.js";
import stockHistoryModel from "./stockHistoryModel.js";
import StockHistory from "./stockHistoryModel.js";


const productSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: [true, "Name is Required"]},
    price: { type: Number, required: true, validate:
            {validator:(val) => val >0, message: "Price must be greater than 0"}},
    description: { type: String, required: true },
    stock: { type: Number, required: true },
    slug: { type: String },
    createdAt: { type: Date, default: Date.now },
    archived: { type: Boolean, default: false },
    //timestamps: true  //ეს გასატესტი მაქვს
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

productSchema.pre('findOneAndDelete', async function (next) {
    console.log(this.getQuery());
    const product = await this.model.findOne(this.getQuery());
    if (product.stock > 0) {
       return next(new Error("Product can't be deleted, it has stock"));
    }
    next();
});

productSchema.post('save',  function (doc, ) {
    console.log("Product saved", doc);
});


//5 დავალება
productSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();
    if (!update.stock ) return next();
    const product = await this.model.findOne(this.getQuery());

    if(update.stock === product.stock) return next();

    await StockHistory.create({
        productId: product._id,
        previousStock: product.stock,
        nextStock: update.stock,
    });
});



///////////////////////
productSchema.virtual('status').get(function () {
    return this.stock > 0 ? "Available" : "Not Available";
});

productSchema.virtual('priceWithTax').get(function () {
    return this.price * 1.2;
});

productSchema.virtual('capacity').get(function () {
    return this.price * this.stock;
})


//როცა ჩვენ თითონ ვქმნით მეთოდს
productSchema.statics.archived  = async function (filter) {
    return this.updateOne(filter, {archived: true});
}




const Product = mongoose.model("Product", productSchema);

export default Product;