function applySchemaRelations (sequelize) {
  const { city, province, comm_category, event_category, community, event, user, user_event, user_community } = sequelize.models
  // city province
  province.hasMany(city, {
    foreignKey: 'provinceId',
    sourceKey: 'id',
    onDelete: 'SET NULL'
  })
  city.belongsTo(province, {
    foreignKey: 'provinceId',
    targetId: 'id'
  })
  // community community_category
  comm_category.hasMany(community, {
    foreignKey: 'categoryId',
    sourceKey: 'id',
    onDelete: 'SET NULL'
  })
  community.belongsTo(comm_category, {
    foreignKey: 'categoryId',
    targetId: 'id'
  })
  // event event_category
  event_category.hasMany(event, {
    foreignKey: 'categoryId',
    sourceKey: 'id',
    onDelete: 'SET NULL'
  })
  event.belongsTo(event_category, {
    foreignKey: 'categoryId',
    targetId: 'id'
  })
  // event community
  community.hasMany(event, {
    foreignKey: 'communityId',
    sourceKey: 'id',
    onDelete: 'CASCADE'
  })
  event.belongsTo(community, {
    foreignKey: 'communityId',
    targetId: 'id'
  })
  // event city
  city.hasMany(event, {
    foreignKey: 'cityId',
    sourceKey: 'id',
    onDelete: 'SET NULL'
  })
  event.belongsTo(city, {
    foreignKey: 'cityId',
    targetId: 'id'
  })
  // city user
  city.hasMany(user, {
    foreignKey: 'cityId',
    sourceKey: 'id',
    onDelete: 'SET NULL'
  })
  user.belongsTo(city, {
    foreignKey: 'cityId',
    targetId: 'id'
  })
  // user community
  user.belongsToMany(community, { through: user_community })
  community.belongsToMany(user, { through: user_community })

  user.hasMany(user_community, { onDelete: 'CASCADE' })
  user_community.belongsTo(user)
  community.hasMany(user_community, { onDelete: 'CASCADE' })
  user_community.belongsTo(community)

  // user event
  user.belongsToMany(event, { through: user_event })
  event.belongsToMany(user, { through: user_event })

  user.hasMany(user_event, { onDelete: 'CASCADE' })
  user_event.belongsTo(user)
  event.hasMany(user_event, { onDelete: 'CASCADE' })
  user_event.belongsTo(event)
}

module.exports = { applySchemaRelations }
