import { Router } from "express"
import * as posts from "../controllers/posts"

const router = Router()

router.get("/api/", posts.getAllPosts)
router.get("/api/:id", posts.getPost)
router.patch("/api/updatepost", posts.updatePost)
router.delete("/api/:id", posts.deletePost)
router.post("/api/", posts.addPost)

export default router
