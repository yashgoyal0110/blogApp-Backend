import express from 'express'
import addComment from '../controllers/Comments.js';
import isLogin from "../middleware/isLoggedIn.js";
const commentRoutes = express.Router();

commentRoutes.post('/addcomment', isLogin, addComment);

export default commentRoutes