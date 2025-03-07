import express from "express";
import fs from "fs";

const productRouter = express.Router();//შევქმენი როუტერი

const data = fs.readFileSync("./data/products.json", "utf8");


//პროდუქტების გამოძახება
const getProducts = (req, res) => {
    res.json(JSON.parse(data));
}

//პროდუქტის დამატება
const createProduct = (req, res) => {
    const products = JSON.parse(data);
    const newProduct = {...req.body, id: Date.now(), createdAt: new Date().toISOString()};
    //Date.now იღებს იმ კონკრეტულ დროს,როცა შეიქმნა და იქნება უნიკალური და იმიტომ გვაწყობს ID-თ.

    // Homework-იდან მე-4 დავალება
    if (!newProduct.name || !newProduct.price) {
        res.status(406).json({message: "name and price are required"})
    }
    //ბექაფის გაკეთება დამატებამდე
    fs.copyFileSync("./data/products.json", `./data/products_backup_${newProduct.id}.json`);

    products.push(newProduct);
    fs.writeFileSync("./data/products.json", JSON.stringify(products));
    res.status(201).json(newProduct);
};

//პროდუქტის  მონაცემების შეცვლა
const editProduct = (req, res) => {
    const products = JSON.parse(data);
    const productIndex = products.findIndex((product) => product.id === parseInt(req.params.id));
    const newProduct = req.body; //ბადიდან წამოსული პროდუქტი
    products[productIndex] = newProduct; // პროდუქტებიდან ამოვიღებ კონკრეტულად იმ ინდექსის მქონე ელემენტს
    //რომლის შეცვლაც მინდა და შევცვლი იმით, რასაც კლიენტი გამმომიგზავნის.
    fs.writeFileSync("./data/products.json", JSON.stringify(products)); //განახლებულს ჩავწერ მონაცემთა ბაზაში
    res.json(newProduct);
};

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
const deleteProduct = (req, res) => {
    const products = JSON.parse(data);

    // Create a backup before deleting თაიმსტამპით
    const backupPath = `./data/products_backup_${Date.now()}.json`;

    fs.writeFileSync(backupPath, JSON.stringify(products, null, 2));

    const newProducts = products.filter((product) => product.id !== parseInt(req.params.id));

    fs.writeFileSync("./data/products.json", JSON.stringify(newProducts));
    res.status(200).send("Product deleted successfully. Backup created.");
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

