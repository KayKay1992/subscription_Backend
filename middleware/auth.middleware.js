import { JWT_SECRET } from "../config/env.js";
import jwt from "jsonwebtoken"
import User from "../models/user.model.js";


//Someone is making a request to get user details, so this authorize middleware will verify the token, check if they have permission to get user details, if they do we go over the next and give access to the user.

export const authorize = async (req, res, next) => {

    try{
        let token;
        //check for authorization
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
            token = req.headers.authorization.split(' ')[1];
        }
        //if no token
        if(!token){
            throw new Error('No token provided');
        }
        //validate token if there is one
        const decoded = jwt.verify(token,JWT_SECRET);
        //find user associated with the token
        const user = await User.findById(decoded.userId);
        //if the there is no user associated with the token
        if(!user){
            throw new Error('Unauthorised user');
        }
        //if everything is okay, attach user to request object
        req.user = user;
        next();
    }catch(error){
        res.status(401).json({ message: 'Unauthorized', error: error.message });
        
    }
}