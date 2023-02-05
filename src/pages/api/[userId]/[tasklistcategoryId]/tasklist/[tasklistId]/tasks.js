
import dbConnect from "../../../../../../../database/database";
import TaskList from "../../../../../../../model/TaskListModel";
import Task from "../../../../../../../model/TaskModel";
import TaskListCategory from "../../../../../../components/taskListCategory-component";
const handler = async (req, res) => {
  const { userId, tasklistId} = req.query;
  if (req.method === "GET") {
    await dbConnect();
    const currTaskList = await TaskList.findById(tasklistId).populate('tasks');

    if (!currTaskList) {
      return res.status(404).json({
        message: "not found",
      });
    }
    return res.status(200).json(currTaskList.tasks);
  }

  if (req.method === "POST") {
    await dbConnect();

    const currTaskList = await TaskList.findById(tasklistId);
    const newTask = new Task({
      taskName: req.body,
      taskList: tasklistId,
    });

    await currTaskList.tasks.push(newTask);
    newTask.save((err) => {
      if (err) {
        return res.status(400);
      }
    });
    currTaskList.save((err) => {
      if (err) {
        return res.status(400);
      }
    });

    console.log(newTask)
    res.status(200).json(newTask);
  }
};


export default handler;
