const Sequelize = require('sequelize')
const { applySchemaRelations } = require('../models/schema_relations.js')

const sequelize = new Sequelize(process.env.DB, process.env.DBUSER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: process.env.DIALECT,
  operatorsAliases: false,
  // Los signos "+" son para indicar que los pase como int en lugar de string.
  pool: {
    max: +process.env.POOL_MAX,
    min: +process.env.POOL_MIN,
    acquire: +process.env.POOL_ACQUIRE,
    idle: +process.env.POOL_IDLE
  }
})

// define los esquemas
require('../models/city.model.js')(sequelize, Sequelize)
require('../models/province.model.js')(sequelize, Sequelize)
require('../models/comm_category.model.js')(sequelize, Sequelize)
require('../models/event_category.model.js')(sequelize, Sequelize)
require('../models/event.model.js')(sequelize, Sequelize)
require('../models/community.model.js')(sequelize, Sequelize)
require('../models/user.model.js')(sequelize, Sequelize)
require('../models/tokens.model.js')(sequelize, Sequelize)

applySchemaRelations(sequelize)

module.exports = sequelize
