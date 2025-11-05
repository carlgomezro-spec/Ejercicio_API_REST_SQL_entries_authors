const queries = require('../queries/authors.queries.js') // Queries SQL
const pool = require('../config/db_pgsql.js'); //datos conexion

const getAllAuthors = async () => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getAllAuthors)
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

module.exports = authors;