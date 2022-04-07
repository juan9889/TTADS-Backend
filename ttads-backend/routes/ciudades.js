var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('ruta ciudades');
  });

  router.get('/get_ciudades', function(req, res, next) {
    res.send('este deberia devolver todas las ciudades');
  });


  module.exports = router;