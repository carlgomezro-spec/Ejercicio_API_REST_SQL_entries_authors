const express = require('express');
// Rutas de productos
const entriesController = require("../controllers/entries.controller");
const router = express.Router();

// GET http://localhost:3000/api/entries --> ALL
router.get('/', entriesController.getEntries);
// GET http://localhost:3000/api/entries?email=hola@gmail.com --> por email
router.get('/', entriesController.getEntriesByEmail);
// POST http://localhost:3000/api/entries
router.post('/', entriesController.createEntry);
// PUT http://localhost:3000/api/entries 
router.put('/', entriesController.updateEntry);
// DELETE http://localhost:3000/api/entries/title
router.delete('/:title', entriesController.deleteEntry);

module.exports = router;



