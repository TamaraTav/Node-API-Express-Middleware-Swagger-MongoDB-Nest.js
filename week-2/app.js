import express from 'express';
import morgan from 'morgan';
import productRouter from "./routes/productRoute.js";
import usersRouter from "./routes/userRoute.js";

const app = express();
app.use(express.json()); //ეს არის მიდლვეარი, უნდა იყოს თავში.
app.use(morgan('dev')); //middleware

//ჩემი მიდლვეარი
app.use((req,res,next) => {
    console.log('Hello from middleware');
    next();
});


app.use("/products", productRouter); //ეს რჩება აქ
app.use("/users", usersRouter); //ესეც რჩება აქ


//////////////////////////////////////////////////////////////////



app.listen(3000, () => {
    console.log("Server is running on port 3000");
});