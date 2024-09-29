import express from "express";
import { Create, deletePost, getPosts, update} from "../controllers/Blog.js";
import isAdmin from "../middleware/isAdmin.js";
import upload from "../middleware/Multer.js";

const BlogRoutes = express.Router();
BlogRoutes.post("/create", isAdmin, upload.single("image"), Create);
BlogRoutes.delete("/delete/:id", isAdmin, deletePost);
BlogRoutes.get("/getposts", getPosts);
BlogRoutes.patch("/update/:id", isAdmin, upload.single("image"), update);
export default BlogRoutes;
