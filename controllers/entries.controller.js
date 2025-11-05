const entry = require('../models/entries.model'); // Importar el modelo de la BBDD

// GET http://localhost:3000/entries --> ALL

const getEntries = async (req, res) => {
    let entries;
    if (req.query.email) {
        entries = await entry.getEntriesByEmail(req.query.email);
    }
    else {
        entries = await entry.getAllEntries();
    }
    res.status(200).json(entries); // [] con las entries encontradas
}

// GET http://localhost:3000/entries?email=hola@gmail.com --> por email

const getEntriesByEmail = async (req, res) => {
  try {
    let entries;
    const { email } = req.query;

    if (email) {
      entries = await entry.getEntriesByEmail(email);
    } else {
      entries = await entry.getAllEntries();
    }

    res.status(200).json(entries); // [] con las entries encontradas
  } catch (error) {
    console.error("Error al obtener las entries:", error);
    res.status(500).json({ message: "Error al obtener las entradas" });
  }
};


// POST http://localhost:3000/api/entries Crear entry por email
const createEntry = async (req, res) => {
    const newEntry = req.body; // {title,content,email,category}
    const response = await entry.createEntry(newEntry);
    res.status(201).json({
        "items_created": response,
        data: newEntry
    });
}

// PUT http://localhost:3000/api/entries
const updateEntry = async (req, res) => {
  try {
    const {title, content, category, oldTitle} = req.body; // Debe incluir oldtitle, title, content, category
    const result = await entry.updateEntry({title, content, category, oldTitle});
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


// DELETE http://localhost:3000/api/entries/title
const deleteEntry = async (req, res) => {
  try {
    const title= req.params.title; // El título se manda por params
    const deletedRows = await entry.deleteEntry(title);

    if (deletedRows > 0) {
      res.status(200).json({ message: "Entry eliminada correctamente" });
    } else {
      res.status(404).json({ message: "No se encontró ninguna entry con ese título" });
    }
  } catch (error) {
    console.error("Error al eliminar entry:", error);
    res.status(500).json({ message: "Error interno al eliminar la entrada" });
  }
};


module.exports = {
    getEntries,
    createEntry,
    getEntriesByEmail,
    updateEntry,
    deleteEntry
}