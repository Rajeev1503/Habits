import dbConnect from "../../../../../../../../database/database";
import TaskList from "../../../../../../../../model/TaskListModel";
import Task from "../../../../../../../../model/TaskModel";

const handler = async (req, res) => {
  const { userId, tasklistId, taskId } = req.query;
  if (req.method === "PUT") {
    await dbConnect();
    const editedTask = await Task.findByIdAndUpdate(taskId, req.body, {
      runValidators: true,
      new: true,
    });
    if (!editedTask) {
      return res.status(404).json({
        message: "not found",
      });
    }

    return res.status(200).json(editedTask);
  }

  if (req.method === "DELETE") {
    await dbConnect();
    const currTaskList = await TaskList.findById(tasklistId);
    const task = await Task.findByIdAndDelete(taskId);
    await currTaskList.taskListCategory.pull(task);
    currTaskList.save((err) => {
      if (err) {
        return res.status(400);
      }
    });

    res.status(200).json({ message: "success" });
};
}
export default handler;
