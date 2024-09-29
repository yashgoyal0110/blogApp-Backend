import { error } from "console";
import PostModel from "../models/Blog.js";
import fs from 'fs'
import path from "path";

const Create = async(req, res) => {
    try {
        const{title, desc} = req.body;
        const imagePath = req.file.filename

        const CreateBlog = new PostModel({
            title,
            desc,
            image : imagePath
        })
        await CreateBlog.save()
        res.status(200).send("post created successfully");
    } catch (error) {
        console.log(error);
        res.status(200).send("unable to create");
        
    }
}

const deletePost = async(req, res)=>{
    try {
        const postId = req.params.id;
        const FindPost = await PostModel.findById(postId)
        if(!FindPost){
            res.status(400).send("post not found");
        }
        if(FindPost.image) {
            const profilePath = path.join('public/images', FindPost.image)
            await fs.promises.unlink(profilePath)
            .then(() => console.log("photo deleted"))
            .catch((error) => console.log("unable to delete post image", error))
        }
        await PostModel.findByIdAndDelete(postId);
        return res.status(200).send("post deleted successfully");
    } catch (error) {
        console.log(error);
        res.status(400).send("server error");

    }
}

const getPosts = async(req, res)=>{
    try {
        const posts = await PostModel.find()
        if(!posts || posts.length === 0){
            return res.status(400).send("posts not found");
        }
        return res.status(200).json(posts); 

        
    } catch (error) {
        console.log(error);
        return res.status(500).send("server error");
    }
}

const update = async(req, res)=>{
    try {
        const {title, desc} = req.body;
        const postId = req.params.id;
        const reqPost = await PostModel.findById(postId);
        if(!reqPost){
            return res.status(400).send("post with given id don't exists");
        }
        if(title){
            reqPost.title = title;
        }
        if(desc){
            reqPost.desc = desc;
        }
        if(req.file){
            reqPost.image = req.file.filename;
        }
        await reqPost.save();
        return res.status(200).send("post updated successfully");
        
    } catch (error) {
        console.log(error);
        return res.status(500).send("server error");
    }
}

export {Create, deletePost, getPosts, update}