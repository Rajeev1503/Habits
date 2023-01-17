import mongoose from 'mongoose'

const TaskListSchema = new mongoose.Schema({
    taskListName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isActive: {
        type:Boolean,
        default:true,
    },
    tasks: [{
        type:mongoose.Types.ObjectId,
        ref: 'tasks'
    }],
    teammembers: [{
        type:mongoose.Types.ObjectId,
        ref:'User',
    }],
    creator: [{
        type:mongoose.Types.ObjectId,
        ref:'User',
    }]
})

const TaskList = mongoose.models.Tasklist || mongoose.model('Tasklist', TaskListSchema);

export default TaskList;