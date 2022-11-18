const { sequelize, Sequelize } = require('../database/database.js')

const user_event = sequelize.define('user_event', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }
})

module.exports = user_event