import express from 'express'
import {Register, Login, Logout} from '../controllers/Auth.js';
import upload from '../middleware/Multer.js';



const AuthRoutes = express.Router()
AuthRoutes.post('/register',upload.single('image'), Register)
AuthRoutes.post('/login', Login)
AuthRoutes.post('/logout', Logout)

export default AuthRoutes;