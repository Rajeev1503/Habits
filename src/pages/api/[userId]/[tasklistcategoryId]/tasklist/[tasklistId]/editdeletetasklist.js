
import dbConnect from "../../../../../../../database/database";
import TaskListCategory from "../../../../../../../model/TaskListCategoryModel";
import TaskList from "../../../../../../../model/TaskListModel";
import Task from "../../../../../../../model/TaskModel";
const handler = async (req, res) => {
  const { userId, tasklistcategoryId, tasklistId} = req.query;
  if (req.method === "PUT") {
    await dbConnect();
    const editedTasklist = await TaskList.findByIdAndUpdate(tasklistId, req.body, {
      runValidators: true,
      new: true,
    });
    if (!editedTasklist) {
      return res.status(404).json({
        message: "not found",
      });
    }

    return res.status(200).json(editedTasklist);
  }

  if (req.method === "DELETE") {
    await dbConnect();
    const currTaskListCategory = await TaskListCategory.findById(tasklistcategoryId);
    const task = await Task.deleteMany({taskList:tasklistId});
    const tasklist = await TaskList.findByIdAndDelete(tasklistId);
    await currTaskListCategory.taskList.pull(tasklist);
    currTaskListCategory.save((err) => {
      if (err) {
        return res.status(400);
      }
    });

    res.status(200).json({ message: "success" });
};
}

export default handler;
