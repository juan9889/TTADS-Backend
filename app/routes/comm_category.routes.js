module.exports = app => {
  const comm_category = require("../controllers/comm_category.controller.js");
  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", comm_category.create);

  // Retrieve all Tutorials
  router.get("/", comm_category.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", comm_category.findOne);

  // Update a Tutorial with id
  router.put("/:id", comm_category.update);

  // Delete a Tutorial with id
  router.delete("/:id", comm_category.delete);

  //Retrive all communities in a category
  router.get("/:id/communities", comm_category.findCategoryCommunities);

  app.use('/api/commcategory', router);
};
