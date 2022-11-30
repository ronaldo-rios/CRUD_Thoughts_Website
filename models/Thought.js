const { DataTypes } = require('sequelize');

const db = require('../database/connection');

const User = require('./User');

const Thought = db.define('Thought', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    }
})
// Pensamento pertence ao User
Thought.belongsTo(User);
// Um User pode ter um ou muitos pensamentos
User.hasMany(Thought);

module.exports = Thought