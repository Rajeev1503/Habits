import dbConnect from "../../../../database/database";
import TaskList from '../../../../model/TaskListModel';
const handler = async ( req, res) => {
  
  // const { userId } = req.query
  await dbConnect();
  const allTaskLists = await TaskList.find();
  if (!allTaskLists) {
    return res.status(404).json({
      message: "not found",
    });
  }
  return res.status(200).json(allTaskLists);
};

export default handler;
