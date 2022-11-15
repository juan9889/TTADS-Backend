const express = require('express')
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

// Routes
require('./app/routes')(app)

// Sequelize
const sequelize = require('./app/database/database.js')
sequelize.sync({ force: false })
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a la api de comunidades' })
})

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
