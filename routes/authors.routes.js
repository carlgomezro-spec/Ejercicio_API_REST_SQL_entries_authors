const express = require('express');
// Rutas de productos
const authorsController = require("../controllers/authors.controllers");
const router = express.Router();

// GET http://localhost:3000/api/authors --> ALL
router.get('/', authorsController.getAllAuthors);
// GET http://localhost:3000/api/authors?email=hola@gmail.com --> por email
router.get('/', authorsController.getAuthorbyEmail);
// POST http://localhost:3000/api/authors
router.post('/', authorsController.createAuthor);
// // PUT http://localhost:3000/api/entries 
// router.put('/', entriesController.updateEntry);
// // DELETE http://localhost:3000/api/entries/title
// router.delete('/:title', entriesController.deleteEntry);

module.exports = router;



