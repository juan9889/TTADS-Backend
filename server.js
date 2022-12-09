const express = require('express')
const axios = require('axios')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()
const testdata = require('./app/database/seeds.js')
const app = express()

const corsOptions = {
  origin: '*'
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const GITHUB_URL = 'https://github.com/login/oauth/access_token'
const CLIENT_URL = process.env.CLIENT_URL

// Routes
require('./app/routes')(app)

// Sequelize
const sequelize = require('./app/database/database.js')
sequelize.sync({ force: false })
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a la api de comunidades' })
})

app.get('/oauth/redirect', (req, res) => {
  axios({
    method: 'POST',
    url: `${GITHUB_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`,
    headers: {
      Accept: 'application/json'
    }
  }).then((response) => {
    res.redirect(
      `${CLIENT_URL}/auth/github_confirm?access_token=${response.data.access_token}`
    )
  })
})

// set port, listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log('\x1b[32m%s\x1b[0m', `\n  Server is running on port ${PORT}.\n`)
  console.log()
  sleep(1500).then(() => { fillTestData() })
})

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function fillTestData () {
  console.log('\x1b[33m%s\x1b[0m', '\nMetodo para llenar datos de prueba')
  await testdata.fillData()
}
