const express = require('express')
const dotenv = require('dotenv').config()//for environment variables

const port = process.env.PORT || 5000

const app = express()

app.use('/api/goals', require('./routes/goalRoutes'))

app.listen(port, ()=> console.log(`server listening on port ${ port }`))