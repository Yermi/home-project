var express = require('express');
var moviesController = require('../controllers/moviesController');

var router = express.Router();

router.get('/movies', (req, res) => moviesController.GetMovies(req, res));

router.post('/movie', (req, res) => moviesController.AddMovie(req, res));

router.delete('/movie', (req, res) => moviesController.DeleteMovie(req, res));

router.get('/categories', (req, res) => moviesController.GetCatagories(req, res))

module.exports = router;