const express=require('express')
const colors=require('colors')
const dotenv=require('dotenv').config()
const port=process.env.PORT

const connectDB=require('./config/db')

connectDB()

const app=express()

const userRouter=require('./routes/userRoute')
const bookRouter=require('./routes/bookRoute')
const issueRouter=require('./routes/issueRoute')

//api/books
//api/users
//api/issues

app.use('/api/users',userRouter)
app.use('/api/books',bookRouter)
app.use('/api/issues',issueRouter)

app.listen(port,()=>console.log(`Server started on port ${port}`))