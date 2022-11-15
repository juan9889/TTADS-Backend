module.exports = (sequelize, Sequelize) => {
  const token = sequelize.define('token', {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    accessToken: {
      type: Sequelize.DataTypes.STRING
    },
    userId: {
      type: Sequelize.DataTypes.INTEGER
    }

  })
  return token
}
