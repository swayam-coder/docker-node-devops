import user from "../models/user";
import { Request, Response, NextFunction } from "express";
import createError from "http-errors"
import bcrypt from "bcrypt"

export const register = async (req: Request, res: Response, next: NextFunction) => {
    const userInfo = req.body
    try {
        const checkUser = await user.findOne({ username: userInfo.username })

        if(checkUser) {
            throw new createError.Conflict("You are already registered plz login...")
        }

        const hashedPassword = bcrypt.hash(userInfo.password, 10)
        const registeredUser = await user.create({ username: userInfo.username, password: hashedPassword});

        res.json({ registeredUser })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInfo = await user.findOne({ username: req.body.username })

        if(userInfo === null) {
            throw new createError.NotFound("You are not registered!")
        } 

        const password = await bcrypt.compare(req.body.password, userInfo.password)

        if(!password) {
            throw new createError.Unauthorized("You entered wrong password!")
        }

        res.json({ verified: true })
    } catch (error) {
        console.log(error);
        next(error)
    }
}