module.exports = (sequelize, Sequelize) => {
  const Province = sequelize.define("Province", {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.DataTypes.STRING
    }
    });
  return Province;
  };