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
    place: {
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
      findOne(eventId) {
        return {
          where: {
            id: eventId
          },
          include: [
            {
              model: sequelize.models.community,
              required: true
            },
            {
              model: sequelize.models.event_category,
              required: true
            },
            {
              model: sequelize.models.city,
              required: true,
              include: {
                model: sequelize.models.province,
                required: true
              }
            },
          ]
        }
      },
      findAll() {
        return {
          attributes:['id','title','date'],
          include: [
            {
              model: sequelize.models.community,
              required: true,
              attributes:['name','id', 'place', 'description', 'date', 'time', 'state']              
            },
            {
              model: sequelize.models.event_category,
              required: true,
              attributes: ['name', 'icon', 'iconColor']              
            },
            {
              model: sequelize.models.city,
              required: true,
              attributes:['name'],
              include: {
                model: sequelize.models.province,
                required: true,
                attributes:['name']                
              }
            },
          ]
        }
      }
    }
  });
  return event;
};