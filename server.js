const express = require('express')
const axios = require("axios")
const cors = require('cors')
require('dotenv').config()
const testdata = require('./app/config/test_data.js')
const app = express()
const corsOptions = {
  origin: '*'
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const CLIENT_ID = "30922afb2cdc1a52ad8f";
const CLIENT_SECRET = "6862513c2ae3d4330de06fb4e7088455eaf9ce71";
const GITHUB_URL = "https://github.com/login/oauth/access_token";

// Routes
require('./app/routes')(app)

// Sequelize
const sequelize = require('./app/database/database.js')
sequelize.sync({ force: false })
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a la api de comunidades' })
})

app.get("/oauth/redirect", (req, res) => {
  axios({
    method: "POST",
    url: `${GITHUB_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`,
    headers: {
      Accept: "application/json",
    },
  }).then((response) => {
    res.redirect(
      `http://localhost:3000?access_token=${response.data.access_token}`
    );
  });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
  // metodo para llenar bd con datos de prueba si esta vacia
  sleep(5000).then(() => { fillTestData() })
})

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function fillTestData () {
  console.log('Metodo para llenar datos de prueba')
  await testdata.fillData()
}
