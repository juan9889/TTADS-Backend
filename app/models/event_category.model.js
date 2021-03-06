module.exports = (sequelize, Sequelize) => {
  const event_category = sequelize.define("event_category", {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.DataTypes.STRING
    }
  });
  return event_category;
};
