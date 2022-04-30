const express=require('express')
const colors=require('colors')
const dotenv=require('dotenv').config()
const port=process.env.PORT

const connectDB=require('./config/db')

connectDB()

const app=express()

const testRouter=require('./routes/testroute')

//api/books
//api/users
//api/issues

app.use('/api/test',testRouter)


app.listen(port,()=>console.log(`Server started on port ${port}`))