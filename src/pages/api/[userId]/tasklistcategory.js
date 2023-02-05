import dbConnect from "../../../../database/database";
import UserModel from "../../../../model/UserModel";
import TaskListCategory from "../../../../model/TaskListCategoryModel";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const { userId } = req.query;
    await dbConnect();
    await UserModel.findById(userId, '_id').populate('taskListCategory')
      .then((user) => {
        return res.status(200).json(user.taskListCategory);
      })
      .catch((err) => {
        return res.status(404).json({
          message: "not found",
          error: err,
        });
      });
  }

  if (req.method === "POST") {
    const { userId } = req.query;
    await dbConnect();

    const currUser = await UserModel.findById(userId);
    const newTaskListCategory = new TaskListCategory({
      taskListCategoryName: req.body,
      creator: userId,
    });

    await currUser.taskListCategory.push(newTaskListCategory);
    newTaskListCategory.save((err) => {
      if (err) {
        return res.status(400);
      }
    });
    currUser.save((err) => {
      if (err) {
        return res.status(400);
      }
    });

    res.status(200).json(newTaskListCategory);
  }
};
export default handler;
