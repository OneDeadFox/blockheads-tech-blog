const User = require(`./User`);
const Post = require(`./Post`);
const Comment = require(`./Comment`);

Comment.belongsTo(User, {
    onDelete: `CASACDE`
});
Comment.belongsTo(Post, {
    onDelete: `CASACDE`
});
Post.belongsTo(User, {
    onDelete: `CASACDE`
});
Post.hasMany(Comment);
User.hasMany(Post);
User.hasMany(Comment);

module.exports = {
    User,
    Post,
    Comment
}