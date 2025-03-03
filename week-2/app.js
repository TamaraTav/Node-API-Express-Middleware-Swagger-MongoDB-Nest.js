import express from 'express';

const app = express();

app.get("/", (req, res) => {
    res.send("Welcome");
    // res.end("Welcome");
    // res.json("Welcome");
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});