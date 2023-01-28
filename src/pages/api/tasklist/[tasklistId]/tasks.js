import dbConnect from "../../../../../database/database";
import Task from "../../../../../model/task-model";

const handler = async ( req, res) => {
  
     const { tasklistId } = req.query;
     await dbConnect();
  const allTasks = await Task.find({taskList : tasklistId});
  if (!allTasks) {
    return res.status(404).json({
      message: "not found",
    });
  }
  return res.status(200).json(allTasks);
};

export default handler;
