var mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    title: String,
    image: String,
});

const MovieModel = mongoose.model('movies', movieSchema);

module.exports = MovieModel