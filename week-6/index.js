require('dotenv').config();
const express = require('express');
const userRoutes = require('./src/routes/userRoutes');

const app = express();
const port = process.env.PORT || 3000;

//Middleware
app.use(express.json());

//Routes
app.get('/', (req, res) => {
    res.json({message:'Welcome to the Express PostgreSQL API'});
});
app.use('/api/products', userRoutes);


//Error handling middleware
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({message: "Something went wrong!"});
});

//Start server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
