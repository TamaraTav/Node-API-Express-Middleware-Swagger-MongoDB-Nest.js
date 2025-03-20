// import express from 'express';
const router = express.Router();
import {getProducts} from "../controllers/productController.js";
import express from "express";

//User routes
router.get('/', getProducts);

// router.post('/', getProducts.createProduct);
// router.put('/:id', getProducts.updateProduct);
// router.delete('/:id', getProducts.deleteProduct);

export default router;


