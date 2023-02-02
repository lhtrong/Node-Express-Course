const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name must be provided"],
        trim: true,
        maxLenght: [20, "Name can not be more than 20 characters"]
    },
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Task', taskSchema);