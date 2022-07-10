module.exports = app => {
    const province = require("../controllers/province.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", province.create);
  
    // Retrieve all Tutorials
    router.get("/", province.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", province.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", province.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", province.delete);
  
    app.use('/api/province', router);
  };
  