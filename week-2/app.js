import express from 'express';
import morgan from 'morgan';
import productRouter from "./routes/productRoute.js";
import usersRouter from "./routes/userRoute.js";
import dotenv from "dotenv";
import requestInfo from "./middlewares/requestInfo.js"
import maintenance  from "./middlewares/maintenance.js";
import {rateLimit} from "express-rate-limit";



dotenv.config({path: "./config.env"});


const app = express();

// console.log(app.get("env")); //ტოლია development-ის
console.log(process.env.NODE_ENV); //
console.log(process.env.DB_USER);


if (process.env.NODE_ENV === "production") {
    app.use(maintenance);
}
app.use(rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: 10,
    message: "Too many requests"
})
);


if(process.env.NODE_ENV !== 'development') {
    app.use(morgan('dev')); //middleware
    //თუ ჩემი გარემოა დეველოპერის, მაგ დროს გამოიყენოს მორგანი

    //ჩემი მიდლვეარი მორგანისნაირი გადმოვაიმპორტე მიდელვეარების პაპკიდან
    app.use(requestInfo);
}

app.use(express.json()); //ეს არის მიდლვეარი, უნდა იყოს თავში.



//ჩემი მიდლვეარი
app.use((req,res,next) => {
    console.log('Hello from my middleware');
    next();
});


app.use("/products", productRouter); //ეს რჩება აქ
app.use("/users", usersRouter); //ესეც რჩება აქ


//////////////////////////////////////////////////////////////////


export default app;