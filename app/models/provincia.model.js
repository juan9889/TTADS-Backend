module.exports = (sequelize, Sequelize) => {
    const Provincia = sequelize.define("provincia", {
      nombre: {
        type: Sequelize.STRING
      }
    });
    return Provincia;
  };
  