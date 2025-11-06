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
const updateAuthor= async (req, res) => {
  try {
    const {name, surname, email, image, oldEmail} = req.body; 
    const result = await author.updateAuthor({name, surname, email, image, oldEmail});
    if (result > 0) {
    res.status(200).json({message: "Entry actualizada"});
    }
    else {
      return res.status(404).json({ message: "Entry no encontrada con ese título" });
    }

  } catch (error) {
    console.error("Error al actualizar entry:", error);
    res.status(500).json({ message: "Error interno al actualizar la entrada" });
  }
};

// DELETE 
const deleteAuthor = async (req, res) => {
  try {
    const email= req.params.email; // Params para ponerlo con / en el thunderbolt. El email se manda por params
    const result = await author.deleteAuthor(email);

    if (result > 0) {
      res.status(200).json({ message: "Author eliminado correctamente" });
    } else {
      res.status(404).json({ message: "No se encontró author con ese email" });
    }
  } catch (error) {
    console.error("Error al eliminar author:", error);
    res.status(500).json({ message: "Error interno al eliminar author" });
  }
};

module.exports = {
    getAllAuthors,
    getAuthorbyEmail,
    createAuthor,
    updateAuthor,
    deleteAuthor
}