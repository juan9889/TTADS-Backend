function applySchemaRelations(sequelize) {
	const { ciudad, provincia } = sequelize.models;

	provincia.hasMany(ciudad);
	ciudad.belongsTo(provincia);
}

module.exports = { applySchemaRelations };