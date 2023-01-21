const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {type: String, require: true},
    author: {type: String, require: true},
    completed: Boolean
});

module.exports = mongoose.model('Book', bookSchema); //exporting a Mongoose model called "Book" which is based on the bookSchema