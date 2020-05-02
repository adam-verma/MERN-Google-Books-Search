// Defining routes for sending to database
const router = require("express").Router();
const bookController = require("../../controllers/bookController");

// For all books, match them with route "api/books"
router.route("/")
  .get(bookController.findAll)
  .post(bookController.create);

  // For a book specific with id, match it with route "/api/books/:id"
router.route("/:id")
  .delete(bookController.remove);

  module.exports = router; 