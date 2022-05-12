const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const path=require('path');
var passport = require('passport');
var authenticate = require('./Middleware/authenticate');
const dotenv=require('dotenv').config()

const logger=require('./logger')

// Loading routers
const bookRouter = require('./routes/bookRoute');
const userRouter = require('./routes/userRoute');
const issueRouter = require('./routes/issueRoute');
const app= express();

app.use(function(req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  next();

});

// Bodyparser Middleware
app.use(bodyParser.json());

// DB config 
const mongoURI = process.env.MONGO_URI;

// Connect to mongo
mongoose.connect(mongoURI)
.then(()=> {
  logger.info('MongoDB connected');
  console.log(`MongoDB Connected`);
})
.catch(err =>{
  logger.info('MongoDB connection error');
  console.log(err);
});

app.use(passport.initialize());

// Use routes
app.use('/api/books',bookRouter);
app.use('/api/users',userRouter);
app.use('/api/issues',issueRouter);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

const port = process.env.PORT || 5000;

app.listen(port, ()=>{
  logger.info(`Server started on port ${port}`)
  console.log(`Server started running on port ${port}`)
});

module.exports=app