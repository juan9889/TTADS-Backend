const Sequelize = require('sequelize')

module.exports = (sequelize) => {
  const community = sequelize.define('community', {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.DataTypes.STRING
    },
    description: {
      type: Sequelize.DataTypes.STRING
    }
  }, {
    scopes: {
      find (userId) {
        return {
          include: [
            {
              model: sequelize.models.user_community,
              attributes: [
                'id', 'createdAt', 'mod'
              ],
              where: { userId },
              required: false
            },
            {
              model: sequelize.models.comm_category,
              required: true,
              attributes: ['id', 'name', 'icon', 'iconColor']
            }]
        }
      },
      findByTerm (term) {
        const { Op } = require('sequelize')
        console.log('Term : ' + term)
        return {
          where: {
            [Op.or]: [
              {
                name: {
                  [Op.substring]: term
                }
              },
              {
                description: {
                  [Op.substring]: term
                }
              }
            ]
          },
          include: {
            model: sequelize.models.comm_category,
            required: true,
            attributes: ['id', 'name', 'icon', 'iconColor']
          }
        }
      },
      events (userId) {
        return {
          include: [
            {
              model: sequelize.models.user_community,
              attributes: [
                'id', 'createdAt', 'mod'
              ],
              where: { userId },
              required: false
            },
            {
              model: sequelize.models.event,
              required: true,
              attributes: {
                exclude: ['cityId', 'communityId', 'categoryId']
              },
              include: [
                {
                  model: sequelize.models.user_event,
                  attributes: [
                    'id', 'createdAt', 'userId', 'eventId'
                  ],
                  where: { userId },
                  required: false
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
      }
    }
  })
  return community
}
