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
// // PUT http://localhost:3000/api/authors
router.put('/', authorsController.updateAuthor);
// // DELETE http://localhost:3000/api/authors/email
router.delete('/:email', authorsController.deleteAuthor);

module.exports = router;



