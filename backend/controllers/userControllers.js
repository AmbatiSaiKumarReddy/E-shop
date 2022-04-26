import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { generateToken } from "../utils/getJwtToken.js";

export const authUser=asyncHandler(async(req,res)=>{

    const {email,password}=req.body

    const user=await User.findOne({email})

    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
            
        })
    }
    else{
        res.status(401)
        throw new Error('Invalid Email or Password')
    }







})


export const getUserProfile=asyncHandler(async(req,res)=>{
    
    const user=await User.findById(req.user._id)
    if (user){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin
        })

    }
    else{
        res.status(404)
        throw new Error('User Not Found')
    }
})


export const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body

    const isExistedUser=await User.findOne({email})


    if (isExistedUser){
        res.status(400)
        throw new Error ('User Already exists')
    }


    const user=User.create({
        name,
        email,
        password

    })

    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)

        })
    }
    else{
        res.status(400)
        throw new Error ('Invalid User Data')
    }


    

    
})