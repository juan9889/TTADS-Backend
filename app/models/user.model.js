const { sequelize, Sequelize } = require('../database/database.js')

const user = sequelize.define('user', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.DataTypes.STRING
    },
    used_oauth: {
        type: Sequelize.DataTypes.BOOLEAN
    },
    password: {
        type: Sequelize.DataTypes.STRING
    },
    name: {
        type: Sequelize.DataTypes.STRING
    },
    mail: {
        type: Sequelize.DataTypes.STRING
    }
},
    {
        scopes: {
            findOne (userId) {
                return {
                    where: {
                        id: userId
                    },
                    include: [
                        {
                            model: sequelize.models.city,
                            required: true,
                            attributes: ['id', 'name'],
                            include: {
                                model: sequelize.models.province,
                                required: true,
                                attributes: ['id', 'name']
                            }
                        }
                    ]
                }
            },
            events (userId) {
                return {
                    where: {
                        id: userId
                    },
                    include: [
                        {
                            model: sequelize.models.event,
                            required: true,
                            attributes: ['id', 'title', 'date', 'place', 'description', 'time', 'state'],
                            include: [
                                {
                                    model: sequelize.models.community,
                                    required: true,
                                    attributes: ['id', 'name']
                                },
                                {
                                    model: sequelize.models.event_category,
                                    required: true,
                                    attributes: ['id', 'name', 'icon', 'iconColor']
                                },
                                {
                                    model: sequelize.models.city,
                                    required: true,
                                    attributes: ['id', 'name'],
                                    include: {
                                        model: sequelize.models.province,
                                        required: true,
                                        attributes: ['id', 'name']
                                    }
                                }
                            ]
                        }
                    ]
                }
            },
            communities (userId) {
                return {
                    where: {
                        id: userId
                    },
                    include: {
                        model: sequelize.models.community,
                        required: true,
                        include: {
                            model: sequelize.models.comm_category,
                            required: true,
                            attributes: ['id', 'name', 'icon', 'iconColor']
                        }
                    }
                }
            }
        }
    })
module.exports = user