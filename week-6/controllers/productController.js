// const pool = require('./config/db.config');

//Get all Products
async function getProducts(req, res) {

    return res.json({message: 'Welcome to the Express PostgreSQL API'});

    // try {
    //     const result = await pool.query('SELECT * FROM Products');
    //     res.json(result.rows);
    // } catch (err) {
    //     console.log('Error executing query', err.stack);
    //     res.status(500).json({error: 'Internal server error'});
    // }
}

export {getProducts};