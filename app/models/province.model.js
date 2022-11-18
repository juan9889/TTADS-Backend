const { sequelize, Sequelize } = require('../database/database.js')

const province = sequelize.define('province', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.DataTypes.STRING
    }
}, {
    scopes: {
        cities (provinceId) {
            return {
                where: {
                    id: provinceId
                },
                include: {
                    model: sequelize.models.city,
                    required: true
                }
            }
        }
    }
})
module.exports = province