import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/studentmodel"

/* REGISTER USER */

export const register = async (req,res) => {
    try {
        const {
            firstname,
            lastname,
            email,
            password,
            academicGoals,
            courseSchedule,
            progress

        }= req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password,salt);
        const newUser = new User (
            {
                firstname,
                lastname,
                email,
                password:passwordHash,
                academicGoals,
                courseSchedule,
                progress
            }
        );
        const savedUSer = await newUser.save();
        res.status(201).json(savedUSer);
    }
    catch (err) {
        res.status(500).json({error : err.message});
    }
};

 /* logging in */

 export const login = async (req,res) => {
    try {
        const {email , password } = req.body;
        const user = await user.findOne({email : email});

        if(!user) {
            return res.status(400).json({msg : "User not exist"});
        }
        const ismatch = await bcrypt.compare(password , user.password);
        if(!ismatch) return res.status(400).json({msg : "Invalid credentials"});
        const token = jwt.sign({id:user_id}, process.env.JWT_SECRET)  ;
        delete user.password;
        res.status(200).json({token , user});
    }
    catch (err) {
        res.status(500).json({error : err.message});
    }
 }
