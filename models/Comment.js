const {Model, DataTypes} = require(`sequelize`);
const sequelize = require(`../config/connection`);

class Comment extends Model {}

Comment.init({
    creation_date:{
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true
        }
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len:[1,1279]
        }
    }
},{
    sequelize
});

module.exports = Comment;