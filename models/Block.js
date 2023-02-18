const {Model, DataTypes} = require(`sequelize`);
const sequelize = require(`../config/connection`);

class Block extends Model {}

Block.init({
    block_title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 255]
        }
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len:[1,1279]
        }
    }
},{
    sequelize
});

module.exports = Block