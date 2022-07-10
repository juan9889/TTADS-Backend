const db = require("../models");
const City = db.city;
const Province = db.province;
const Op = db.Sequelize.Op;

// Create and Save a new ciudad
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nombre) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
 //var provincia =  await Provincia.findByPk(req.body.provincia).then( () => {console.log(provincia)});
 //console.log(provincia);
  const ciudad = ({
    name: req.body.nombre/*
    provincia : provincia,*/
  });

  City.create(ciudad)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating "
      });
    });
};

// Retrieve all ciudades from the database.
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;
  var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;

  City.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving "
      });
    });
};

// Find a single ciudad with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  City.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving  with id=" + id
      });
    });
};

// Update by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  City.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "ciudad was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update ciudad with id=${id}. Maybe ciudad was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating ciudad with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  City.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "ciudad was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete ciudad with id=${id}. Maybe ciudad was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete ciudad with id=" + id
      });
    });
};
