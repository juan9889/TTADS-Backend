const Sequelize = require("sequelize");
const {applySchemaRelations} = require("../models/schema_relations.js");
const dbConfig = require("../config/db.config.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

//define los esquemas
require("../models/city.model.js")(sequelize, Sequelize);
require("../models/province.model.js")(sequelize, Sequelize);
require("../models/comm_category.model.js")(sequelize, Sequelize);
require("../models/event_category.model.js")(sequelize, Sequelize);
require("../models/event.model.js")(sequelize, Sequelize);
require("../models/community.model.js")(sequelize, Sequelize);


applySchemaRelations(sequelize);

module.exports = sequelize;
console.log('Aber aca');