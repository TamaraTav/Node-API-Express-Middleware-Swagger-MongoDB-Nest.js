import express from 'express';
import fs from 'fs';

const app = express();

app.use(express.json()); //ეს არის მიდლვეარი

const data = fs.readFileSync("./data/products.json", "utf8");


// app.get("/", (req, res) => {
//     res.send("Welcome");
//     // res.end("Welcome");
//     // res.json("Welcome");
// })

app.get("/products", (req, res) => {
    res.json(JSON.parse(data));
})

//პროდუქტის დამატება
app.post("/products", (req, res) => {
    const products = JSON.parse(data);
    const newProduct = {...req.body, id: Date.now()};
    //Date.now იღებს იმ კონკრეტულ დროს,როცა შეიქმნა და იქნება უნიკალური და იმიტომ გვაწყობს ID-თ.
    products.push(newProduct);
    fs.writeFileSync("./data/products.json", JSON.stringify(products));
    res.status(201).json(newProduct);
});

//პროდუქტის  მონაცემების განახლება
app.put("/products/:id", (req, res) => {
    const products = JSON.parse(data);
    const productIndex = products.findIndex((product) => product.id === parseInt(req.params.id));
    const newProduct = req.body; //ბადიდან წამოსული პროდუქტი
    products[productIndex] = newProduct; // პროდუქტებიდან ამოვიღებ კონკრეტულად იმ ინდექსის მქონე ელემენტს
    //რომლის შეცვლაც მინდა და შევცვლი იმით, რასაც კლიენტი გამმომიგზავნის.
    fs.writeFileSync("./data/products.json", JSON.stringify(products)); //განახლებულს ჩავწერ მონაცემთა ბაზაში
    res.json(newProduct);
})

//პროდუქტის მხოლოდ ერთი მონაცემის განახლება
app.path("/products/:id", (req, res) => {
    const products = JSON.parse(data);
    const productIndex = products.findIndex((product) => product.id === parseInt(req.params.id));
    const newProduct ={...products[productIndex], ...req.body} ;// აქამდე რაც იყო ვტოვებ იმას,
    // ბადიდან რაც მომივა იმ პროპერთის ვანახლებ
    products[productIndex] = newProduct;
    fs.writeFileSync("./data/products.json", JSON.stringify(products));
    res.json(newProduct);
})

//პროდუქტის წაშლა
app.delete("/products/:id", (req, res) => {
    const products = JSON.parse(data);
    const newProducts = products.filter((product) => product.id !== parseInt(req.params.id));
    fs.writeFileSync("./data/products.json", JSON.stringify(newProducts));
    res.status(200).send("Product deleted successfully.");
})


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});