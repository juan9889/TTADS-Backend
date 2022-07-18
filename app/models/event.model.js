module.exports = (sequelize, Sequelize) => {
  const Event = sequelize.define("Event", {
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
  });
  return Event;
};