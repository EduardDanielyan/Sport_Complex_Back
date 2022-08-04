module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define('product', {
        name: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.STRING,
        },
        price: {
            type: Sequelize.INTEGER,
        },
        more: {
            type: Sequelize.STRING
        },
        photo: {
            type: Sequelize.STRING
        }

    },
        {
            freezeTableName: true,
            timestamps: false
        })
    return Product
}