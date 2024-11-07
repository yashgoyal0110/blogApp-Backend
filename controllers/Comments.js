import PostModel from "../models/Blog.js";
import CommentModel from "../models/comments.js";
const addComment = async (req, res) => {
  try {
    const { postId, userId, comment } = req.body;
    const newComment = new CommentModel({
      postId,
      userId,
      comment,
    });

    await newComment.save();

    const existingPost = await PostModel.findById(postId);
    if(!existingPost) {
        return res.status(400).json({message: "post not found"})
    }
    existingPost.comments.push(newComment, newComment._id);
    await existingPost.save();
    res.status(200).json({message : "comment added successfully"})
  } catch (error) {
    console.log(error);

  }
};

export default addComment;
