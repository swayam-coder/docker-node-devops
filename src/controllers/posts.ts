import blog from "../models/blog";
import { Request, Response, NextFunction } from "express";
import createError from "http-errors"

export const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const posts = await blog.find({});

        if(posts === undefined) {
            throw new createError.NotFound("No posts found")
        }

        res.json({ posts })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

export const getPost = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    try {
        const posts = await blog.findById({ id })

        if(posts === undefined) {
            throw new createError.NotFound("Post not found")
        }

        res.json({ posts })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

export const addPost = async (req: Request, res: Response, next: NextFunction) => {
    const post = req.body
    try {
        await blog.create(post)

        res.json({ post, poststatus: 'saved' })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    const post = req.body
    try {
        const updatedPost = await blog.findByIdAndUpdate(req.params.id, post, { new: true })

        res.json({ updatedPost, poststatus: 'updated' })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params
    try {
        const updatedPost = await blog.findByIdAndDelete(id)

        res.json({ updatedPost, poststatus: 'delete' })
    } catch (error) {
        console.log(error);
        next(error)
    }
}