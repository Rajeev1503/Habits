import { getSession } from "next-auth/react";
import dbConnect from "../../../../../database/database";
import TaskListCategory from "../../../../../model/TaskListCategoryModel";
import TaskList from "../../../../../model/TaskListModel";
import UserModel from "../../../../../model/UserModel";
const handler = async (req, res) => {

  const { userId, tasklistcategoryId } = req.query;
  if (req.method === "GET") {
    await dbConnect();
    const currTaskListCategory = await TaskListCategory.findById(tasklistcategoryId).populate({path: 'taskList'});
    if (!currTaskListCategory) {
      return res.status(404).json({
        message: "not found",
      });
    }
    return res.status(200).json(currTaskListCategory.taskList);
  }

  if (req.method === "POST") {
    await dbConnect();

    const currTaskListCategory = await TaskListCategory.findById(tasklistcategoryId);
    const newTaskList = new TaskList({
      taskListName: req.body,
      creator: userId,
      taskListCategory: tasklistcategoryId,
    });

    await currTaskListCategory.taskList.push(newTaskList);
    newTaskList.save((err) => {
      if (err) {
        return res.status(400);
      }
    });
    currTaskListCategory.save((err) => {
      if (err) {
        return res.status(400);
      }
    });

    res.status(200).json(newTaskList);
  }
};


export default handler;
