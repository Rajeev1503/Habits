import mongoose from 'mongoose'

const TaskListSchema = new mongoose.Schema({
    taskListName: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    extraFields: [{
        extraFieldName: {
            type: String
        },
        extraFieldContent: {
            type:String
        }
    }],
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
    }],
    taskListCategory: [{
        type:mongoose.Types.ObjectId,
        ref:'User',
    }]
})

const TaskList = mongoose.models.taskList || mongoose.model('taskList', TaskListSchema);

export default TaskList;