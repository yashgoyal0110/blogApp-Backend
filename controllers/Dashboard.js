import PostModel from "../models/Blog.js";
import UserModel from "../models/user.js";

const getAllData = async (req, res) => {
  try {
    const Users = await UserModel.find();
    const Posts = await PostModel.find();
    console.log("api hit for dashboard data");

    if (!Users || !Posts) {
      return res.status(400).send("Data not found");
    }
    return res.status(200).json({ Users, Posts });
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error");
  }
};

const getUsers = async (req, res) => {
  try {
    const Users = await UserModel.find();

    if (!Users) {
      return res.status(400).send("Data not found");
    }
    return res.status(200).json({ Users });
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error");
  }
};

const userDelete = async (req, res) => {
  try {
    const userId = req.params.id;
    const existingUser = await UserModel.findById(userId);
    if (!existingUser) {
      return res.status(400).send("user don't exist");
    }
    if (existingUser.role == "admin") {
      return res.status(400).send("admin can't be deleted");
    }
    if (existingUser.image) {
      const profilePath = path.join("public/images", existingUser.image);
      await fs.promises
        .unlink(profilePath)
        .then(() => console.log("photo deleted"))
        .catch((error) => console.log("unable to delete post image", error));
    }
    await UserModel.findByIdAndDelete(userId);
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error");
  }
};

export { getAllData, getUsers, userDelete };
