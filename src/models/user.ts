import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces";

const schema: Schema = new Schema({
    username: {type: String, required: [true, "username is required"]},
    password: {type: String, required: [true, "password is required"]},
}, { timestamps: true })

export default mongoose.model<IUser>('user', schema)