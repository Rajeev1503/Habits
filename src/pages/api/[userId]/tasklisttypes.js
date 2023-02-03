import dbConnect from "../../../../database/database";
import UserModel from "../../../../model/UserModel";
const handler = async (req, res) => {
  const { userId } = req.query;
  await dbConnect();
  await UserModel.findById(userId)
    .then((user) => {
      return res.status(200).json(user.taskListCategory);
    })
    .catch((err) => {
      return res.status(404).json({
        message: "not found",
        error: err,
      });
    });
};

export default handler;
