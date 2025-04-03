import mongoose from "mongoose"
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";


export const signUp = async (req, res, next) => {
    //Atomic operation: this either run the operation or stop the operation immediately.
    const session = await mongoose.startSession();
    session.startTransaction();

    //signup logic the for controller
    try{
        //Create a new user
        const {name, email, password} = req.body;
        //check if the user already exists
        const existingUser = await User.findOne({email});
        //if the user already exists we can create a new error
        if(existingUser){
            const error = new Error(`User already exists`);
            error.status = 409;
            throw error;
        }
        //if the user does not exist we can hash the password.
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Now you can create a new user
        const newUsers = await User.create([{name, email, password: hashedPassword}], {session})

        //lets generate a token for the new user
        const token = jwt.sign({userId: newUsers[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN})

        //commit the transaction
        await session.commitTransaction();
        session.endSession();
        

        //After creating the controller now serves the success response.
        res.status(201).json({message: "User created successfully", success: true,  data: {
            token,
            user: newUsers[0]
        }})

        //if an error occurs during the transaction rollback the transaction
    }catch(error){
        await session.abortTransaction();
        session.endSession();
        next(error);
       
    }

}

export const signIn = async (req, res, next) => {
    //signin logic the for controller
    try{
        //get the user and password from the request body
        const {email, password} = req.body;
        //check if the user exist
        const user = await User.findOne({email});
        //if the user does not exist return a 401 error
        if(!user){
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }
        //if the user does exist check the password or validate their password.
        const isPasswordValid = await bcrypt.compare(password, user.password);
        //if the password does not match return a 401 error
        if(!isPasswordValid){
            const error = new Error("Invalid credentials");
            error.status = 401;
            throw error;
        }

        //if the password matches generate a token for the user
        const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN})

        //serve the response if signup is successful
        res.status(200).json({
            message: "signed in successfully",
            success: true,
            data: {
                token,
                user
            }
        })
}catch(error){
    next(error)
}
}
export const logOut = async (req, res, next) => {
    //logout logic the for controller
   
}