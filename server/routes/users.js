var express = require('express');
var usersController = require('../controllers/usersController');

var router = express.Router();

router.post('/login', (req, res) => usersController.Login(req, res))

module.exports = router;