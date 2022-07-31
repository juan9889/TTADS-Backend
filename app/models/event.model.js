module.exports = (sequelize, Sequelize) => {
  const event = sequelize.define("event", {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.DataTypes.STRING
    },
    description: {
      type: Sequelize.DataTypes.STRING
    },
    date: {
      type: Sequelize.DataTypes.DATEONLY
    },
    time: {
      type: Sequelize.DataTypes.TIME
    },
    state: {
      type: Sequelize.DataTypes.STRING
    }
  }, {
    scopes: {
      details(eventId) {
        return {
          include: [
            {
              model: sequelize.models.community,
              // as: 'community',
              required: true
            },
            {
              model: sequelize.models.event_category,
              // as: 'category',
              required: true
            },
            {
              model: sequelize.models.city,
              // as: 'city',
              required: true,
              include: {
                model: sequelize.models.province,
                required: true
              }
            },
          ]
        }
      }
    }
  });
  return event;
};