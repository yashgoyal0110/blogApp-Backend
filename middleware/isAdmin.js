import jwt from 'jsonwebtoken'
import UserModel from '../models/user.js';

const isAdmin = async(req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).send("Unauthorized : no token provided");
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decode);
        const user = await UserModel.findById(decode.userId);

        if(!user) {
            return res.status(401).send("user not found");
        }
        if(user.role != 'admin'){
            return res.status(401).send("User is not admin");
        }
        next()
    } catch (error) {
        console.log(error);
    }
}

export default isAdmin;