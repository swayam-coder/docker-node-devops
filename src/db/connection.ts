import mongoose from "mongoose"
import config from "./config"

const DB = `mongodb://mongodb:27017`

mongoose.connect(DB, { authSource: "admin", user: config.mongo.username, pass: config.mongo.password, dbName: "microservices" }).then(() => console.log("connected to database")).catch((e) => console.log(e))

/* but here one thing you gotta keep in mind is that if mongo service is not running before 
the node service then we will get unneccesary errors, even the depends_on property in the docker-compose file will not help, 
so that thing is needed to be solved in the code itself */

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to db')
})

mongoose.connection.on('error', (err) => {
    console.log(err.message)
})

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected.')
})

process.on('SIGINT', async () => {    // SIGINT will trigger when you click ctrl+c to close the server
    await mongoose.connection.close()
    process.exit(0)
})