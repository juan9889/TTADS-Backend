module.exports = app => {
  const cities = require('../controllers/city.controller.js')
  const isAuthenticated = require('../auth/authenticator.js')
  const admin = require('../auth/authorizator.js')
  const router = require('express').Router()

  // Create a new Tutorial
  router.post('/', isAuthenticated, admin,  cities.create)

  // Retrieve all Tutorials
  router.get('/', cities.findAll)

  // Retrieve a single Tutorial with id
  router.get('/:id', cities.findOne)

  // Update a Tutorial with id
  router.put('/:id', isAuthenticated, admin, cities.update)

  // Delete a Tutorial with id
  router.delete('/:id', isAuthenticated, admin, cities.delete)

  app.use('/api/cities', router)
}
