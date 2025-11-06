const author = require('../models/authors.model.js'); // Importar el modelo de la BBDD

// GET http://localhost:3000/api/authors --> ALL
const getAllAuthors = async (req, res) => {
    try {
        let authors;
        if (req.query.email) {
            authors = await author.getAuthorbyEmail(req.query.email);
        } else {
            authors = await author.getAllAuthors();
        }

        res.status(200).json(authors); // [] con las entries encontradas
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los autores' });
    }
};

// GET http://localhost:3000/api/authors?email=hola@gmail.com --> por email
const getAuthorbyEmail = async (req, res) => {
  try {
    let authors;
    const { email } = req.query;

    if (email) {
      authors = await author.getAuthorbyEmail(email);
    } else {
      authors = await author.getAllAuthors();
    }

    res.status(200).json(authors); // [] con las entries encontradas
  } catch (error) {
    console.error("Error al obtener las entries:", error);
    res.status(500).json({ message: "Error al obtener las entradas" });
  }
};


// POST http://localhost:3000/api/authors Crear author por email
const createAuthor = async (req, res) => {
    const newAuthor = req.body; // {title,content,email,category}
    const response = await author.createAuthor(newAuthor);
    res.status(201).json({
        "items_created": response,
        data: newAuthor
    });
}

// PUT

// DELETE

module.exports = {
    getAllAuthors,
    getAuthorbyEmail,
    createAuthor
    // updateEntry,
    // deleteEntry
}