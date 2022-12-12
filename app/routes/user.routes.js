// const isAuthenticated = require('../auth/authenticator.js')
const isAuthenticated = require('../auth/authenticator.js')
const admin = require('../auth/authorizator.js')
module.exports = app => {
  const users = require('../controllers/user.controller.js')

  const router = require('express').Router()

  router.post('/', users.create)

  router.get('/', users.findAll)

  // router.get('/:id', users.findOne)

  router.get('/findusername/:username', users.findByUserName)

  router.get('/:id/communities', users.findCommunities)

  router.get('/events', isAuthenticated, users.findEvents)

  router.post('/login', users.login)

  // router.get('/me', isAuthenticated, users.findOne)
  router.get('/me', isAuthenticated, users.findMe)

  router.get('/mo', isAuthenticated, admin, users.findMe)

  router.get('/github/:access_token', users.getJwtFromOauthGithubToken)

  app.use('/api/users', router)
}
