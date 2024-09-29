import PostModel from "../models/Blog.js";

const getSinglePost = async(req, res) => {
    try {
        const postId = req.params.id;
        const FindPost = await PostModel.findById(postId)
        .populate({
            path : "comments",
            populate:{
                path:"userId"
            }
        })

        if(!FindPost){
            return res.status(404).json({message: "no post found"})
        }

        res.status(200).send(FindPost)
        
    } catch (error) {
        console.log(error);
    }
}
export default getSinglePost