import mongoose from "mongoose";

const TaskListCategorySchema = new mongoose.Schema({
    
  taskListCategoryName: {
    type: String,
  },

  taskList: [
    {
      type: mongoose.Types.ObjectId,
      ref: "taskList",
    },
  ],
  creator: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
});

const TaskListCategory =
  mongoose.models.Tasklistcategory ||
  mongoose.model("Tasklistcategory", TaskListCategorySchema);

export default TaskListCategory;
