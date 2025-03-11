import fs from "fs";
import Product from "../models/productModel.js";

const data = fs.readFileSync("./data/products.json", "utf8");

//პროდუქტების გამოძახება
const getProducts = async (req, res) => {
    const  excludeFields = ['page', 'limit', 'sort' , 'fields'];
    const queryObj = {...req.query};

    try {
        let query =  Product.find();
        excludeFields.forEach((el) => delete queryObj[el]);

        query =  query.find(queryObj);
        if(req.query.sort) query = query.sort(req.query.sort);
        if(req.query.fields) query = query.select(req.query.fields.split(",").join( ' '));


        const product = await query
        res.json(product);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}


//პროდუქტის დამატება,  ქვემოთ მიწერია ხელახლა მონგუსით, მაგრამ არ მუშაობს!!!!!!!!!!!!!!!!!!!!!
// const createProduct = (req, res) => {
//     const products = JSON.parse(data);
//     const newProduct = {...req.body, id: Date.now(), createdAt: new Date().toISOString()};
//     //Date.now იღებს იმ კონკრეტულ დროს,როცა შეიქმნა და იქნება უნიკალური და იმიტომ გვაწყობს ID-თ.
//
//     // Homework-იდან მე-4 დავალება
//     if (!newProduct.name || !newProduct.price) {
//         res.status(406).json({message: "name and price are required"})
//     }
//     //ბექაფის გაკეთება დამატებამდე
//     fs.copyFileSync("./data/products.json", `./data/products_backup_${newProduct.id}.json`);
//
//     products.push(newProduct);
//     fs.writeFileSync("./data/products.json", JSON.stringify(products));
//     res.status(201).json(newProduct);
// };

const createProduct =  async (req, res) => {
    try {
        const product =  new Product(
            {...req.body, id: Date.now()});
        await product.save();
        res.status(201).json(product);
    }  catch (error) {
        res.status(400).json({message: error.message});
    }
}


//პროდუქტის  მონაცემების შეცვლა
// const editProduct = (req, res) => {
//     const products = JSON.parse(data);
//     const productIndex = products.findIndex((product) => product.id === parseInt(req.params.id));
//     const newProduct = req.body; //ბადიდან წამოსული პროდუქტი
//     products[productIndex] = newProduct; // პროდუქტებიდან ამოვიღებ კონკრეტულად იმ ინდექსის მქონე ელემენტს
//     //რომლის შეცვლაც მინდა და შევცვლი იმით, რასაც კლიენტი გამმომიგზავნის.
//     fs.writeFileSync("./data/products.json", JSON.stringify(products)); //განახლებულს ჩავწერ მონაცემთა ბაზაში
//     res.json(newProduct);
// };

const editProduct = async (req, res) => {
    const updateProduct = await Product.findOneAndUpdate(
        { id: parseInt(req.params.id)},
        req.body,
        { new: true }
    );
    if (!updateProduct) {
        res.status(404).json({message: "Product not found"});
    }
    res.json(updateProduct);
}


//პროდუქტის მხოლოდ ერთი მონაცემის განახლება
const editOneProduct = (req, res) => {
    const products = JSON.parse(data);
    const productIndex = products.findIndex((product) => product.id === parseInt(req.params.id));
    const newProduct ={...products[productIndex], ...req.body} ;// აქამდე რაც იყო ვტოვებ იმას,
    // ბადიდან რაც მომივა იმ პროპერთის ვანახლებ
    products[productIndex] = newProduct;
    fs.writeFileSync("./data/products.json", JSON.stringify(products));
    res.json(newProduct);
};

//პროდუქტის წაშლა
// const deleteProduct = (req, res) => {
//     const products = JSON.parse(data);
//
//     // Create a backup before deleting თაიმსტამპით
//     const backupPath = `./data/products_backup_${Date.now()}.json`;
//
//     fs.writeFileSync(backupPath, JSON.stringify(products, null, 2));
//
//     const newProducts = products.filter((product) => product.id !== parseInt(req.params.id));
//
//     fs.writeFileSync("./data/products.json", JSON.stringify(newProducts));
//     res.status(200).send("Product deleted successfully. Backup created.");
// }

const deleteProduct = async (req, res) => {
    const deleteProduct = await Product.findByIdAndDelete({id: parseInt(req.params.id)});
    if (!deleteProduct) {
        res.status(404).json({message: "Product not found"});
    }
    res.json({message: "Product deleted successfully"});
}

//stock-ი უნდა შემცირდეს 1-ით ყიდვის შემთხვევაში
const buyProduct = (req, res) => {
    const productId = parseInt(req.params.id);

    const products = JSON.parse(data);
    const productIndex = products.findIndex((product) => product.id === productId);

    if (products[productIndex].stock < 1 ) {
        return res.status(406).json({message: `Product in Stock is 0`});
    }
    products[productIndex] = {...products[productIndex],
        stock: products[productIndex].stock-1};
    fs.writeFileSync("./data/products.json", JSON.stringify(products));

    res.json({
        massage: "you buy successfully!",
        data: products[productIndex],
    })
};

//ყველა პროდუქტის წაშლა
const deleteAllProducts = () => {
    fs.writeFileSync("./data/products.json", JSON.stringify([]));
    res.status(200).send("All products deleted successfully.");
};


export {getProducts,createProduct,editProduct,
    editOneProduct,deleteProduct,buyProduct,deleteAllProducts};