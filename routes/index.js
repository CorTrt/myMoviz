var express = require('express');
var router = express.Router();

var request = require('sync-request');

var MovieModel = require('../models/movie')

/* GET home page. */
router.get('/', function(req, res, next) {
res.render('index', { title: 'Express' });
});

router.get('/get-movies', function(req, res, next) {

  
  var data = request('GET',`https://api.themoviedb.org/3/movie/popular?api_key=f88645aabc22bd3fcdaaa73cd6ea0359&language=fr-FR&page=1`)
  var dataParse = JSON.parse(data.body);

  console.log(dataParse)

res.json(true)});

router.post('/wishlist-movie', async function(req, res, newt) {

  
  var newMovie = new MovieModel ({
    title: req.body.title,
    image: req.body.image,
  });

  var saved = await newMovie.save();

res.json(true)});

router.delete('/wishlist-movie', async function(req, res, next) {

  
  await MovieModel.deleteOne(
    { title: req.query.title}
  );

res.json(true)});

router.get('/wishlist-movie', async function(req, res, next) {

  var movies = await MovieModel.find();

res.json(movies)});


module.exports = router;
