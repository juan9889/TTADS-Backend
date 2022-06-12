var express = require('express');
var router = express.Router();

const sequelize = require('sequelize');
//esto anda, tendriamos que ver una forma de traer sequelize sin meter este codigo en todos lados

let probar = async () =>{
  sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
}

router.get('/', function(req, res, next) {
    res.send('ruta ciudades');
  });

router.get('/get_ciudades', function(req, res, next) {
    probar();
    res.send('este deberia devolver todas las ciudades');
  });


  module.exports = router;