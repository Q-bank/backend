import authServices from "@/services/auth.services";
import { Request, Response, NextFunction } from "express";

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { email, password } = req.body;
        const { token, user } = await authServices.login(email, password);

        res.status(200).json({ message: "logged in successfully", user, token })

    } catch(error){
        next(error)
    }
}