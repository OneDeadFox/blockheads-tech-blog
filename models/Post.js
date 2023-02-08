const {Model, DataTypes} = require(`sequelize`);
const sequelize = require(`../config/connection`);

class Post extends Model {}

Post.init({
    post_title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 50]
        }
    },
    creation_date:{
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true
        }
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len:[1,1279]
        }
    }
},{
    sequelize
});

module.exports = Post