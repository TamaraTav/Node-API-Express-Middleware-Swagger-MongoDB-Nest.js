import express from 'express';
import morgan from 'morgan';
import productRouter from "./routes/productRoute.js";
import usersRouter from "./routes/userRoute.js";
import dotenv from "dotenv";
import requestInfo from "./middlewares/requestInfo.js"

dotenv.config({path: "./config.env"});
const PORT = process.env.PORT || 3000;

const app = express();

// console.log(app.get("env")); //ტოლია development-ის
console.log(process.env.NODE_ENV); //

app.use(express.json()); //ეს არის მიდლვეარი, უნდა იყოს თავში.

if(process.env.NODE_ENV !== 'development') {
    app.use(morgan('dev')); //middleware
    //თუ ჩემი გარემოა დეველოპერის, მაგ დროს გამოიყენოს მორგანი

    //ჩემი მიდლვეარი მორგანისნაირი გადმოვაიმპორტე მიდელვეარების პაპკიდან
    app.use(requestInfo);
}


//ჩემი მიდლვეარი
app.use((req,res,next) => {
    console.log('Hello from middleware');
    next();
});


app.use("/products", productRouter); //ეს რჩება აქ
app.use("/users", usersRouter); //ესეც რჩება აქ


//////////////////////////////////////////////////////////////////



app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});