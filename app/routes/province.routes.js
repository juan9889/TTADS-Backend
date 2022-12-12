module.exports = app => {
  const provinces = require('../controllers/province.controller.js')
  const isAuthenticated = require('../auth/authenticator.js')
  const admin = require('../auth/authorizator.js')
  const router = require('express').Router()

  // Create a new Tutorial
  router.post('/', isAuthenticated, admin, provinces.create)

  // Retrieve all Tutorials
  router.get('/', provinces.findAll)

  // Retrieve a single Tutorial with id
  router.get('/:id', provinces.findOne)

  // Update a Tutorial with id
  router.put('/:id', isAuthenticated, admin, provinces.update)

  // Delete a Tutorial with id
  router.delete('/:id', isAuthenticated, admin, provinces.delete)

  // Retrieve a single Tutorial with id
  router.get('/:id/cities', provinces.findCities)

  app.use('/api/provinces', router)
}
