const Sequelize = require('sequelize')

module.exports = (sequelize) => {
  const image = sequelize.define('image', {
    uuid: {
      type: Sequelize.DataTypes.STRING,
      primaryKey: true
    },
    name: {
      type: Sequelize.DataTypes.STRING
    }
  })
  return image
}

// Crear modelo para guardar imágenes de comunidades en la base de datos.
