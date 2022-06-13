module.exports = app => {
    const provincias = require("../controllers/provincia.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", provincias.create);
  
    // Retrieve all Tutorials
    router.get("/", provincias.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", provincias.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", provincias.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", provincias.delete);
  
    app.use('/api/provincias', router);
  };
  