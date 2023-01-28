import dbConnect from "../../../../database/database";
import Task from "../../../../model/task-model";

const handler = async ( req, res) => {
    
    if(req.method==="PUT") {
        const { taskId } = req.query;
        await dbConnect();

        const editedTask = await Task.findByIdAndUpdate(
            taskId,
            req.body,
            { runValidators: true, new: true }
          );
          return res.status(200).json(editedTask);
        }

    else if(req.method === "DELETE"){
    }
    return res.status(200).json({message: "all good"});
};

export default handler;
