const { sequelize, Sequelize } = require('../database/database.js')

const user_community = sequelize.define('user_community', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    isMod: {
        type: Sequelize.DataTypes.BOOLEAN
    }
})

module.exports = user_community