import dbConnect from "../../../../../database/database";
import TaskListCategory from "../../../../../model/TaskListCategoryModel";
import UserModel from "../../../../../model/UserModel";

const handler = async (req, res) => {
 const { userId, tasklistcategoryId } = req.query; 
 if (req.method === "PUT") {   
    await dbConnect();
    await TaskListCategory.findByIdAndUpdate(tasklistcategoryId, req.body, {
      runValidators: true,
      new: true,
    })
      .then(() => {
        return res.status(200).json({message:'success'});
      })
      .catch((err) => {
        return res.status(404).json({
          message: "not found",
          error: err,
        });
      });
  }

  if (req.method === "DELETE") {
    await dbConnect();
    const currUser = await UserModel.findById(userId);
    const taskListCategory = await TaskListCategory.findByIdAndDelete(tasklistcategoryId);
    await currUser.taskListCategory.pull(taskListCategory);
    currUser.save((err) => {
      if (err) {
        return res.status(400);
      }
    });

    res.status(200).json({ message: "success" });
  }
};
export default handler;
