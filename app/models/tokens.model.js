module.exports = (sequelize, Sequelize) => {
  const token = sequelize.define("token", {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    access_token: {
      type: Sequelize.DataTypes.STRING
    },
    user_id: {
      type: Sequelize.DataTypes.INTEGER
    }
    

  });
  return token;
};
