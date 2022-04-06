var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Comunidades' });
});

app.get('/', function (req, res) {
  res.send('Hola perro');
});

module.exports = router;
