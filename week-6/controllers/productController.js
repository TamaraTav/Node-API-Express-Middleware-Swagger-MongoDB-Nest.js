import pool from "../config/db.config.js";


//Get all Products
async function getProducts(req, res) {

    return res.json({message: 'Welcome to the Express PostgreSQL API'});

    try {
        const result = await pool.query('SELECT * FROM products');
        res.json(result.rows);
    } catch (err) {
        console.log('Error executing query', err.stack);
        res.status(500).json({error: 'Internal server error'});
    }
}

export {getProducts};