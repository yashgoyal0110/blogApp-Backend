import express from 'express'
import getSinglePost from '../controllers/Public.js';

const PublicRoutes = express.Router();

PublicRoutes.get('/singlepost/:id', getSinglePost)

export default PublicRoutes