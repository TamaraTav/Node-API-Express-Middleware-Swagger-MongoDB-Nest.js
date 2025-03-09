import app from "./app.js";
import mongoose from "mongoose";


const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.DB_URL).then(() => {
    console.log("Connected to the database-MongoDB!");
}).catch((err) => {
    console.error(err);
})

app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});