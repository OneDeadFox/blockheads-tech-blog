const dayjs = require('dayjs');
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
    },
    formattedDate: {
        type: DataTypes.DATE,
        get() {
            //const dt = dayjs();
            return dt = dayjs(this.getDataValue('createdAt')).format('MM-DD-YYYY hh:mm:ss a');

            //return dt.toLocaleString('en-GB', { timeZone: 'UTC' });
        }
    }
},{
    sequelize
});

module.exports = Block