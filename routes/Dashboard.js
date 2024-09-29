import express from 'express'
import isAdmin from '../middleware/isAdmin.js';
import {getAllData, getUsers, userDelete} from '../controllers/Dashboard.js';

const DashBoardRoutes = express.Router()

DashBoardRoutes.get('/', isAdmin, getAllData)
DashBoardRoutes.get('/users', isAdmin, getUsers)
DashBoardRoutes.delete('/deleteuser/:id', isAdmin, userDelete)

export default DashBoardRoutes;