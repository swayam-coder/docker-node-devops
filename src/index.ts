import express, { NextFunction, Request, Response } from "express"
import createHttpError from "http-errors";
import createError from "http-errors"
import config from "./db/config"
import dotenv from "dotenv"

dotenv.config()

import "./db/connection"
import { redisClient, RedisStore, session } from "./db/redisConnection"

import postsRoutes from "./routes/posts"  
import userRoutes from "./routes/users"

interface sessionResponse extends Response {
  session?: session.Session & Partial<session.SessionData>,
  sessionID?: string
}

const app = express();

app.use(express.json({limit: '30mb'}))
app.use(express.urlencoded({limit: '30mb'}))

app.use(session ({
  store: new RedisStore({ client: redisClient }),
  secret: config.redisdb.secret,
  saveUninitialized: false,
  name: "sessionId",
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 30  // 30 mins in miliseconds
  }
}))

app.use("/auth", userRoutes)

app.use((req: Request, res: sessionResponse, next: NextFunction) => {
  if(!res.session) {
    next(new createError.Unauthorized("You are not authorized"))
  }
  next()
})

app.use("/posts", postsRoutes)

app.use(async (req: Request, res: Response, next: NextFunction) => {
  next(new createError.NotFound("Page not found"))
})

app.use((err: createHttpError.HttpError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500)   // 500 is a generic error so if nothing, then 500
  res.json ({    
      status: err.status || 500,
      message: err.message
  })
})

const port = process.env["PORT"] || 5000;

app.listen(port, () => {
  console.log("listening at port 5000");
});

/* 
Cookie attributes
- secure
- httpOnly
- host and domain
- samesite
- hostOnly
- expires
*/