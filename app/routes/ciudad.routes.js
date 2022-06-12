module.exports = app => {
    const ciudades = require("../controllers/ciudad.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", ciudades.create);
  
    // Retrieve all Tutorials
    router.get("/", ciudades.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", ciudades.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", ciudades.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", ciudades.delete);
  
    app.use('/api/ciudades', router);
  };
  