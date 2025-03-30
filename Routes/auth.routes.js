import { Router } from "express";

const authRouter = Router();

authRouter.post('/sign-up', (req, res) => {
    // Handle user signing up
    res.status(201).send({ title: 'User signed up successfully' });
})

authRouter.post('/sign-in', (req, res) => {
    // Handle user signing in
    res.send({ title: 'User signed in successfully' });
});

authRouter.get('/logout', (req, res) => {
    // Handle user logging out
    res.send({ title: 'User logged out successfully' });
});

export default authRouter;