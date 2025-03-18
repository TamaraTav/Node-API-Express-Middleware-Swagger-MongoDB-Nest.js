import express from "express";
import productSlugify from "../middlewares/productSlugify.js";

import {getProducts, createProduct,editProduct,
    editOneProduct,deleteProduct,buyProduct,deleteAllProducts,
    getCategoryStats, getPriceStats} from "../controllers/productController.js";

const productRouter = express.Router();//შევქმენი როუტერი პროდუქტებისთვის


productRouter.route("/").get(getProducts).post(productSlugify, createProduct).delete(deleteAllProducts);
productRouter.route("/:id").put(editProduct).patch(editOneProduct).delete(deleteProduct);
productRouter.route("/:id").put(editProduct).patch(editOneProduct).delete(deleteProduct);
productRouter.route("/buy/:id").post(buyProduct);
productRouter.route("/stats").get(getCategoryStats);
productRouter.route("/price-stats").get(getPriceStats);



export default productRouter;


// app.get("/products", getProducts);
// app.post("/products",createProduct);
//app.delete("/products", deleteAllProducts);
// app.put("/products/:id", editProduct);
// app.patch("/products/:id", editOneProduct);
// app.delete("/products/:id", deleteProduct);
// app.post("/products/buy/:id", buyProduct);

