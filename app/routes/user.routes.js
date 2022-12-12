// const isAuthenticated = require('../auth/authenticator.js')
const isAuthenticated = require('../auth/authenticator.js')
const admin = require('../auth/authorizator.js')
module.exports = app => {
  const users = require('../controllers/user.controller.js')

  const router = require('express').Router()

  router.post('/', users.create)

  router.post('/login', users.login)

  router.put('/', isAuthenticated, users.update)

  router.put('/password', isAuthenticated, users.password)

  router.delete('/', isAuthenticated, users.delete)

  router.get('/', users.findAll)

  router.get('/communities', isAuthenticated, users.findCommunities)

  router.get('/events', isAuthenticated, users.findEvents)

  router.get('/findusername/:username', users.findByUserName)

  router.get('/me', isAuthenticated, users.findMe)

  router.get('/mo', isAuthenticated, admin, users.findMe)

  router.get('/github/:access_token', users.getJwtFromOauthGithubToken)

  app.use('/api/users', router)
}
