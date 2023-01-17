import dbConnect from "../../../database/database";
import TaskList from '../../../model/tasklist-model';
const handler = async ( req, res) => {
  
//   const { userId } = req.query
//   await dbConnect();
  const allTaskListTypes = [{name: 'My Tasks'},{name: 'Team Tasks'}, {name:'Assigned to me'},{name: 'Daily'}];
  if (!allTaskListTypes) {
    return res.status(404).json({
      message: "not found",
    });
  }
  return res.status(200).json(allTaskListTypes);
};

export default handler;
