const db = require('../models');

module.exports = {
findAll: function(req, res) {
  db.Book
    .find(req.query)
    .sort({date: -1})
    .then(dbBook => res.json(dbBook))
    .catch(error => res.status(422).json(error));
},

create: function(req, res) {
  db.Book
    .create(req.body)
    .then(dbBook => res.json(dbBook))
    .catch(error => res.status(422).json(error));
}, 

remove: function(req, res) {
  db.Book
    .findById({_id: req.params.id})
    .then(dbBook => dbBook.remove())
    .then(dbBook => res.json(dbBook))
    .catch(error => res.status(422).json(error))
}
}