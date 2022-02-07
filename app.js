require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const errorHandler = require('./middleware/error-handler')
const notFoundRoute = require('./middleware/not_found')
const taskRouter = require('./routes/tasks')

const port = process.env.PORT || 3000
const app = express()
//middleware
app.use(express.json())

//routes
app.use('/api/v1/tasks', taskRouter)
app.use(notFoundRoute)
app.use(errorHandler)
async function startServerAndDbConnection (){
    await mongoose.connect(process.env.MONGO_URI)
    app.listen(port,()=>{
        console.log(`task manager is listening at port ${port}`)
    })
}
startServerAndDbConnection().catch(err=>{console.log(err.message)})


