import { signUp , Login, Logout} from '../controllers/auth.controllers.js';
import express from 'express';


const authRouter = express.Router();



authRouter.post("/signup",signUp)
authRouter.post("/signin", Login);
authRouter.get("/logout", Logout)


export default authRouter;