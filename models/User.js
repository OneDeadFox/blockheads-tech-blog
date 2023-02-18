const bcrypt = require(`bcrypt`)
const sequelize = require(`../config/connection`);

const {Model, DataTypes} = require(`sequelize`);

class User extends Model {}

User.init({
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            isAlpha: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len:[8]
        }
    },
},{
    sequelize,
    hooks: {
        beforeCreate: userObj => {
            userObj.password = bcrypt.hashSync(userObj.password, 5);
            return userObj;
        } 
    }
});

module.exports = User