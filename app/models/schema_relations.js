function applySchemaRelations(sequelize) {
	const { City, Province, Comm_Category, Event_Category, Community, Event } = sequelize.models;
	//city province
	Province.hasMany(City, {
		foreignKey: 'provinceId',
		sourceKey: 'id',
		onDelete: 'RESTRICT'
	});
	City.belongsTo(Province, {
		foreignKey: 'provinceId',
		targetId: 'id',
	});
	//community community_category
	Comm_Category.hasMany(Community, {
		foreignKey: 'catId',
		sourceKey: 'id',
		onDelete: 'RESTRICT'
	});
	Community.belongsTo(Comm_Category, {
		foreignKey: 'catId',
		targetId: 'id'
	});
	//event event_category
	Event_Category.hasMany(Event, {
		foreignKey: 'catId',
		sourceKey: 'id',
		onDelete: 'RESTRICT'
	});
	Event.belongsTo(Event_Category, {
		foreignKey: 'catId',
		targetId: 'id'
	});
	//event community
	Community.hasMany(Event, {
		foreignKey: 'eventId',
		sourceKey: 'id',
		onDelete: 'RESTRICT'
	});
	Event.belongsTo(Community, {
		foreignKey: 'eventId',
		targetId: 'id'
	})

}

module.exports = { applySchemaRelations };