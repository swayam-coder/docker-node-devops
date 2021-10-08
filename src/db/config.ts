import dotenv from "dotenv"

dotenv.config()

const MONGO_OPTIONS = { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
}

const MONGO_USERNAME = process.env.USERNAME || 'superuser'
const MONGO_PASSWORD = process.env.PASSWORD || 'superpassword'
const MONGO_HOST = "mongo"  /* here ideally we should use the ip address of the mongodb container but here we use the name of the docker container cuz inside a network 
containers can interact with each other using their names only cuz docker by default has a DNS installed (only for custom networks) */

const MONGO = {
    username: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    host: MONGO_HOST,
    options: MONGO_OPTIONS
}

const REDIS = {
    host: "redis",
    port: 6379,
    secret: process.env.REDIS_SECRET || ' '
}

export default {
    mongo: MONGO,
    redisdb: REDIS
}