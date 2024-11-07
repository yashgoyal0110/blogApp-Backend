import UserModel from "../models/user.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const Register = async(req, res) => {
    try{
        const{FullName, email, password} = req.body;
        const existingUser = await UserModel.findOne({email})
        
        if(existingUser){
            return res.status(303).json({message : "user already exist"})
        }
        const imagePath = req.file.filename
        const hashPass = await bcrypt.hashSync(password, 10)
        
        const NewUser = new UserModel({
            FullName, email, password:hashPass, profile: imagePath
        })
        await NewUser.save()
        console.log("userCreated");
        return res.status(200).json({message : "user created successfully"})
    }
    catch(err){
        console.log(err);
    }
}

const Login = async(req, res) =>{
    try{
        const {email, password} = req.body
        console.log(req.body)
        if(!email || !password) {
            return res.status(400).json({message : "all fields are required"})
        }
        const findUser = await UserModel.findOne({email})
        if(!findUser) {
            return res.status(400).json({message : "no user found"});
        }
        const comparePass = await bcrypt.compare(password, findUser.password)
        if(!comparePass) {
            return res.status(400).json({message : "invalid password"});
        }

        const token = jwt.sign({userId : findUser._id}, process.env.JWT_SECRET)
        res.cookie('token', token, {
            httpOnly : true,
            secure : false,
            maxAge : 100 * 24 * 60 * 60

        })

        return res.status(200).send("user logged in successfully")
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
}

const Logout = async(req, res) => {
    try{
        res.clearCookie('token')
        res.status(200).send("user logged out successfully");
    }
    catch(err){
        console.log(err);
        res.status(400).send(err)
    }
}


export {Register, Login, Logout};

