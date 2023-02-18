const {Model, DataTypes} = require(`sequelize`);
const sequelize = require(`../config/connection`);

class Bit extends Model {}

Bit.init({
    bit_content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len:[1,1279]
        }
    }
},{
    sequelize
});

module.exports = Bit;