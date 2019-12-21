//super admin >>>>>>>> type:1
//admin/super admin >>>>>> type:2
//user >>>>>>>>>>>>>>>>>>>> type:3


const express = require('express');

//db
require('./db/mongoose')
//routes
const userRouter = require('./routers/User')
const eventRouter = require('./routers/Event')
const app = express();

port = process.env.PORT || 5009;
app.use(express.json());
//use routes
app.use(userRouter)
app.use(eventRouter)
app.listen(port, ()=>{
    console.log(`server up on port ${port}`)
})