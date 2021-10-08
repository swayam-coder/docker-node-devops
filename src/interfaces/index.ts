import { Document } from "mongoose";

export interface IBlog extends Document {
    title: string,
    body: string
    extrainfo?: string
}

export interface IUser extends Document {
    username: string,
    password: string
}