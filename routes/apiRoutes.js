const mongoose = require('mongoose');

module.exports = {
findAll: function(req, res) {
  db.Book
    .find(req.query)
    .sort({title: 1})
    .then(function())

},

findbyId: function(req, res) {

},

create: function(req, res) {

}, 

update: function(req, res) {

},

remove: function(req, res) {

}
}