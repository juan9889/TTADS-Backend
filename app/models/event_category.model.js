module.exports = (sequelize, Sequelize) => {
  const Event_Category = sequelize.define("Event_Category", {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.DataTypes.STRING
    }
  });
  return Event_Category;
};
