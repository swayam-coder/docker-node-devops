import mongoose, { Schema } from "mongoose";
import { IBlog } from "../interfaces";

const schema: Schema = new Schema({
    title: {type: String, required: [true, "post must have a title"]},
    body: {type: String, required: [true, "post must have a body"]},
    extrainfo: {type: String}
}, { timestamps: true })

schema.post<IBlog>('save', function () {   // if you have an arrow function here as a callback then an error will show that "this is undefined"...why?
    this.extrainfo = "something was saved"
})

export default mongoose.model<IBlog>('blog', schema)