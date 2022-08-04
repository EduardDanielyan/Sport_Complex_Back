const { Sequelize } = require('sequelize')
const config = require('../config/config')

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.DIALECT
})

const Product = require('./product')(sequelize, Sequelize)
const User = require('./user')(sequelize, Sequelize)
sequelize.sync()

module.exports = {
    Product,
    User
}