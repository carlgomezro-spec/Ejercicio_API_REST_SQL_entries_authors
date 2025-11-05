const queries = require('../queries/entries.queries') // Queries SQL
const pool = require('../config/db_pgsql.js'); //datos conexion

// GET
const getAllEntries = async () => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getAllEntries)
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// GET
const getEntriesByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getEntriesByEmail, [email])
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
const createEntry = async (entry) => {
    const { title, content, email, category } = entry;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.createEntry,[title, content, email, category])
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
const updateEntry = async (entry) => {
  const { title, content, category, oldTitle } = entry;  
  let client, result;
  try {
    client = await pool.connect();
    const data = await client.query(queries.updateEntry, [
      title,
      content,
      category,
      oldTitle
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


// DELETE
const deleteEntry = async (title) => {
  let client, result;
  try {
    client = await pool.connect();

    // Ejecuta la query con el título como parámetro
    const data = await client.query(queries.deleteEntries, [title]);

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


const entries = {
    getAllEntries,
    getEntriesByEmail,
    createEntry,
    updateEntry,
    deleteEntry
}

module.exports = entries;


// Pruebas

    //  getEntriesByEmail("guillermu@thebridgeschool.es")
    // .then(data=>console.log(data)) 



// getAllEntries()
// .then(data=>console.log(data))

// let newEntry = {
//     title: "Se acabaron las mandarinas de TB",
//     content: "Corren rumores de que papa noel tenía un saco vacio y lo llenó",
//     email: "guillermu@thebridgeschool.es",
//     category: "sucesos"
// }

// createEntry(newEntry)
//     .then(data => console.log(data)) 
