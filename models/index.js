const User = require(`./User`);
const Block = require(`./Block`);
const Bit = require(`./Bit`);

Bit.belongsTo(User, {
    onDelete: "CASCADE"
});
Bit.belongsTo(Block, {
    onDelete: "CASCADE"
});
Block.belongsTo(User, {
    onDelete: "CASCADE"
});
Block.hasMany(Bit);
User.hasMany(Block);
User.hasMany(Bit);

module.exports = {
    User,
    Block,
    Bit
}