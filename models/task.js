const mongoose = require('mongoose');
const collectionNames = require('../helpers/collectionNames');

const taskSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, required: true },
    plannedHours: { type: Number , default: 0 },
    workedHours: { type: Number , default: 0 },
    realizedPercentage: { type: Number, default: 0  },
    ended: { type: Boolean, default: false },
    userAssigned: { type: String },
    assignedAt: { type: Date },
}, { collection: collectionNames.task , versionKey: false });

const TaskModel = mongoose.model('Task', taskSchema);

module.exports = TaskModel;