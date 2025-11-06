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

const getAuthorbyEmail = async (email) => {
     let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getAuthorbyEmail, [email])
        result = data.rows
        
    } catch (err) {
        console.log(err);
        throw err;
    } finally { //este metodo cierra la conexion con la bbdd por si se queda petada
        client.release();
    }
    return result
}

// CREATE
const createAuthor = async (author) => {
    const { name, surname, email, image} = author;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.createAuthor,[name, surname, email, image])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

//UPDATE
const updateAuthor = async (author) => {
  const { name, surname, email, image, oldEmail } = author;  
  let client, result;
  try {
    client = await pool.connect();
    const data = await client.query(queries.updateAuthor, [
      name, surname, email, image, oldEmail
    ]);
    result= data.rowCount
  } catch (err) {
    console.error("Error", err);
    throw err;
  } finally {
    client.release();
  }
  return result
};

//DELETE
const deleteAuthor = async (email) => {
  let client, result;
  try {
    client = await pool.connect();

    // Ejecuta la query con el título como parámetro
    const data = await client.query(queries.deleteAuthor, [email]);

    // rowCount te dice cuántas filas se eliminaron
    result= data.rowCount;
  } catch (err) {
    console.error("Error en deleteEntry (modelo):", err);
    throw err;
  } finally {
    client.release();
  }
  return result
};

const authors = {
    getAllAuthors,
    getAuthorbyEmail,
    createAuthor,
    updateAuthor,
    deleteAuthor
}

module.exports = authors;