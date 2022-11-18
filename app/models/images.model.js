const { sequelize, Sequelize } = require('../database/database.js')

const image = sequelize.define('image', {
    uuid: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true
    },
    name: {
        type: Sequelize.DataTypes.STRING
    }
})

module.exports = image
// Crear modelo para guardar imágenes de comunidades en la base de datos.
