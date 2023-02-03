import dbConnect from "../../../../database/database";
import UserModel from "../../../../model/UserModel";
const handler = async (req, res) => {
  if (req.method === "POST") {
    const { userId } = req.query;
    await dbConnect();
    await UserModel.updateOne(
      { _id: userId },
      {
        $push: {
          taskListCategory: {
            taskListCategoryName: req.body,
          },
        },
      }
    )
      .then(() => {
        res.status(200).json({ message: "success" });
      })
      .catch((err) => {
        res.status(400).json({ message: "failed" });
      });
  }
};
export default handler;
