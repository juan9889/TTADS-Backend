const { sequelize, Sequelize } = require('../database/database.js')

const event_category = sequelize.define('event_category', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.DataTypes.STRING
    },
    icon: {
        type: Sequelize.DataTypes.STRING
    },
    iconColor: {
        type: Sequelize.DataTypes.STRING
    }
})

module.exports = event_category