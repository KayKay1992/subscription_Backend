import { Router } from "express";

const userRouter = Router();

// Define the API endpoints
userRouter.get('/', (req, res )=>res.send({
    title: 'GET all users'
}))
//get a single user
userRouter.get('/:id', (req, res )=>res.send({
    title: `GET user details`
}))

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