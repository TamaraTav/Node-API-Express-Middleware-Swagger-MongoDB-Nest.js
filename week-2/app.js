import express from 'express';
import morgan from 'morgan';
import productRouter from "./routes/productRoute.js";

const app = express();
app.use(express.json()); //ეს არის მიდლვეარი, უნდა იყოს თავში.
app.use(morgan('dev')); //middleware

//ჩემი მიდლვეარი
app.use((req,res,next) => {
    console.log('Hello from middleware');
    next();
});


///////////////////////////////////////



//იუზერების
const getUsers = (req, res) => {
    res.json(JSON.parse(data));
}
const createUser = (req, res) => {
    res.send("create new user");
}
const editUser = (req, res) => {
    res.send("edit new user");
}
const deleteUser = (req, res) => {
    res.send("delete  user");
}
//////////////////////////////////////////////////////////////////


app.use("/products", productRouter);
//ამის დამსახურებით ქვემოთ მისამართებში products წავშალე

const usersRouter = express.Router();//როუტერი იუზერებისთვის
app.use("/users", usersRouter);

//ეს როუტები არის იუზერებისთვის
usersRouter.route("/").get(getUsers).post(createUser);
usersRouter.route("/:id").put(editUser).put(deleteUser);


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});