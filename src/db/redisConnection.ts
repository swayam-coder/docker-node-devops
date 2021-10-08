import redis from 'redis'
import session from 'express-session'
import config from "./config"

let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient({
    host: config.redisdb.host,
    port: config.redisdb.port
})

export { RedisStore, redisClient, session }