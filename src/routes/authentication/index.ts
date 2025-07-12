import { Router } from "express";
import { login } from "@/controllers/authentication";
const AuthRouter = Router();
import { validateData } from "@/middlewares";
import { loginSchema } from "@/schemas/auth";

AuthRouter.route('/login').post(validateData(loginSchema), login);


export default AuthRouter;