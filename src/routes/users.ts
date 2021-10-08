import { Router } from "express"
import * as users from "../controllers/users"

const router = Router()

router.post('/api/register', users.register)
router.post('/api/login', users.login)

export default router