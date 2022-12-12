module.exports = app => {
  const cities = require('../controllers/city.controller.js')

  const router = require('express').Router()

  // Create a new Tutorial
  router.post('/', cities.create)

  // Retrieve all Tutorials
  router.get('/', cities.findAll)

  // Retrieve a single Tutorial with id
  router.get('/:id', cities.findOne)

  // Update a Tutorial with id
  router.put('/:id', cities.update)

  // Delete a Tutorial with id
  router.delete('/:id', cities.delete)

  app.use('/api/cities', router)
}
