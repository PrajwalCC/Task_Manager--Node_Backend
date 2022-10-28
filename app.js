const express = require('express'); 
const app = express();
const tasksRoute = require('./routes/tasks')
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
require('dotenv').config()

// // middleware
// app.use(express.static('./public'))
app.use(express.json())

// // routes
app.get('/', (req,res)=>{
    res.send('<h1>Task manager App</h1>');
})

// // using middleware
app.use('/api/v1/tasks', tasksRoute)
app.use(notFound)
// custom error handler
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 3000;

// connecting DB
const start = async()=>{
    try {
        await connectDB();
        app.listen(port, console.log('server is listening on port '+port ))
    } catch (error) {
        console.log(error)
    }
}

start()