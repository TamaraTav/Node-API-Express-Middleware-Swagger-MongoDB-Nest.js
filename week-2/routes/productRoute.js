import express from "express";

import {getProducts, createProduct,editProduct,
    editOneProduct,deleteProduct,buyProduct,deleteAllProducts} from "../controllers/productController.js";

const productRouter = express.Router();//შევქმენი როუტერი პროდუქტებისთვის


productRouter.route("/").get(getProducts).post(createProduct).delete(deleteAllProducts);
productRouter.route("/:id").put(editProduct).patch(editOneProduct).delete(deleteProduct);
productRouter.route("/:id").put(editProduct).patch(editOneProduct).delete(deleteProduct);
productRouter.route("/buy/:id").post(buyProduct);


export default productRouter;


// app.get("/products", getProducts);
// app.post("/products",createProduct);
//app.delete("/products", deleteAllProducts);
// app.put("/products/:id", editProduct);
// app.patch("/products/:id", editOneProduct);
// app.delete("/products/:id", deleteProduct);
// app.post("/products/buy/:id", buyProduct);

