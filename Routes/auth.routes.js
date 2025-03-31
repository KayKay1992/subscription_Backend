import { Router } from "express";
import { logOut, signIn, signUp } from "../controllers/auth.contoller.js";

const authRouter = Router();

authRouter.post('/sign-up',signUp)

authRouter.post('/sign-in', signIn);

authRouter.post('/logout', logOut);

export default authRouter;