const mongoose = require('mongoose');
const collectionNames = require('../helpers/collectionNames');

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String },
    secondSurname: { type: String },
    realizedTasks: { type: Number, default: 0 },
    role: { type: String, default: 'developer' },
}, { collection: collectionNames.user , versionKey: false });

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;