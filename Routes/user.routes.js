import { Router } from "express";
import {getUser, getAllUsers} from "../controllers/user.controller.js"
import { authorize } from "../middleware/auth.middleware.js";
import arcjetMiddleware from "../middleware/arcjet.middleware.js";



const userRouter = Router();

// Define the API endpoints
userRouter.get('/', authorize, arcjetMiddleware, getAllUsers)
//get a single user
userRouter.get('/:id', authorize, arcjetMiddleware, getUser)


//add a new user

userRouter.post('/', (req, res )=>res.send({
    title: 'Create a new user'
}))

//update a user

userRouter.put('/:id', (req, res )=>res.send({
    title: `Update user details`
}))

//delete a user

userRouter.delete('/:id', (req, res )=>res.send({
    title: `Delete user`
}))

export default userRouter;