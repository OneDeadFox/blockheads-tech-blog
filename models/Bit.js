const dayjs = require('dayjs');
const { Model, DataTypes } = require(`sequelize`);
const sequelize = require(`../config/connection`);

class Bit extends Model { }

Bit.init({
    bit_content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 1279]
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
}, {
    sequelize
});

module.exports = Bit;