var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getprueba', function(req, res, next) {
  res.send('este es un get de prueba con la ruta /users/getprueba');
});

module.exports = router;
