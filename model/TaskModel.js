const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    periodType: {
        type:String,
        // required:true
    },
    dueDate: {
        type:String,
        // required:true
    },
    isActive:{
        type:Boolean,
        default:true
    },
    taskList: {
        type:mongoose.Types.ObjectId,
        ref: 'taskList'
    },
    assignedTo: {
        type:mongoose.Types.ObjectId,
        ref: 'User'
    }
})

const Task = mongoose.models.tasks || mongoose.model('tasks', taskSchema);

module.exports = Task;