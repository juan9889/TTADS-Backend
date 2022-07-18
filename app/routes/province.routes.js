module.exports = app => {
    const provinces = require("../controllers/province.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", provinces.create);
  
    // Retrieve all Tutorials
    router.get("/", provinces.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", provinces.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", provinces.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", provinces.delete);
  
    // Retrieve a single Tutorial with id
    router.get("/:id/cities", provinces.findCities);
  
    app.use('/api/provinces', router);
  };
  