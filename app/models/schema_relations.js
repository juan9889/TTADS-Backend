function applySchemaRelations (sequelize) {
  const { city, province, comm_category, event_category, community, event, user, user_event, user_community } = sequelize.models
  // city province
  province.hasMany(city, {
    foreignKey: 'provinceId',
    sourceKey: 'id',
    onDelete: 'RESTRICT'
  })
  city.belongsTo(province, {
    foreignKey: 'provinceId',
    targetId: 'id'
  })
  // community community_category
  comm_category.hasMany(community, {
    foreignKey: 'categoryId',
    sourceKey: 'id',
    onDelete: 'RESTRICT'
  })
  community.belongsTo(comm_category, {
    foreignKey: 'categoryId',
    targetId: 'id'
  })
  // event event_category
  event_category.hasMany(event, {
    foreignKey: 'categoryId',
    sourceKey: 'id',
    onDelete: 'RESTRICT'
  })
  event.belongsTo(event_category, {
    foreignKey: 'categoryId',
    targetId: 'id'
  })
  // event community
  community.hasMany(event, {
    foreignKey: 'communityId',
    sourceKey: 'id',
    onDelete: 'RESTRICT'
  })
  event.belongsTo(community, {
    foreignKey: 'communityId',
    targetId: 'id'
  })
  // event city
  city.hasMany(event, {
    foreignKey: 'cityId',
    sourceKey: 'id',
    onDelete: 'RESTRICT'
  })
  event.belongsTo(city, {
    foreignKey: 'cityId',
    targetId: 'id'
  })
  // city user
  city.hasMany(user, {
    foreignKey: 'cityId',
    sourceKey: 'id',
    onDelete: 'RESTRICT'
  })
  user.belongsTo(city, {
    foreignKey: 'cityId',
    targetId: 'id'
  })
  // user community
  user.belongsToMany(community, { through: user_community })
  community.belongsToMany(user, { through: user_community })

  user.hasMany(user_community, { onDelete: 'RESTRICT' })
  user_community.belongsTo(user, { onDelete: 'RESTRICT' })
  community.hasMany(user_community, { onDelete: 'RESTRICT' })
  user_community.belongsTo(community, { onDelete: 'RESTRICT' })

  // user event
  user.belongsToMany(event, { through: user_event })
  event.belongsToMany(user, { through: user_event })

  user.hasMany(user_event, { onDelete: 'RESTRICT' })
  user_event.belongsTo(user, { onDelete: 'RESTRICT' })
  event.hasMany(user_event, { onDelete: 'RESTRICT' })
  user_event.belongsTo(event, { onDelete: 'RESTRICT' })
}

module.exports = { applySchemaRelations }
