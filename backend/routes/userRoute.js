var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var User = require('../models/userModel');
var passport = require('passport');
var authenticate = require('../Middleware/authenticate');

const logger=require('../logger');

const cors = require('./cors');

router.use(bodyParser.json());

/* GET users listing. */
router.options('*', cors.corsWithOptions, (req, res) => { res.sendStatus(200); 
  res.setHeader('Access-Control-Allow-Credentials', 'true');} )
router.get('/', cors.corsWithOptions, authenticate.verifyUser
                ,authenticate.verifyAdmin,
                  function(req, res, next) {
                    User.find({})
                      .then((users)=>{
                          res.statusCode=200;
                          res.setHeader('Content-Type','application/json');
                          res.json(users);
                      },(err)=>(next(err)))
                      .catch((err)=>(next(err)))
                  }
);

router.put('/:userId',cors.corsWithOptions,authenticate.verifyUser,
function(req,res,next){
  User.findByIdAndUpdate(req.params.userId,{
    $set: req.body
},{new: true})
.then((user) => {
  logger.info('Updated profile')
   res.statusCode = 200;
   res.setHeader('Content-Type', 'application/json');
   res.json(user);
}, (err) => next(err))
.catch((err) => {
  logger.info('Update profile failed');
  res.status(400).json({success: false});
});
})

// For change of password
router.put('/password/:userId',cors.corsWithOptions,authenticate.verifyUser,
function(req,res,next){
  User.findById(req.params.userId)
.then((user) => {
  if(user&&!user.admin){
    logger.info('Password change');
    user.setPassword(req.body.password, function(){

      user.save();
       res.status(200).json({message: 'password changed successfully'});
  });
  }
  else if(!user){
    res.status(500).json({message: "User doesn't exist"});      
  }
  else{
    res.status(400).json({message: "Password of an admin can't be changed this way.\nContact the webmaster"});
  }
}, (err) => next(err))
.catch((err) => {
  logger.error('Password change error');
  res.status(400).json({message: 'Internal Server Error'});
});
})


router.post('/signup',cors.corsWithOptions, (req, res, next) => {
  User.register(new User({username: req.body.username,
    firstname : req.body.firstname,
    lastname : req.body.lastname,
    email : req.body.email,
   roll : req.body.roll }), 
    req.body.password, (err, user) => {
      if(err) {
        logger.error('Singup error');
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({err: err});
      }
      else {
                 
        user.save((err, user) => {
          if (err) {
            logger.error('Singup error');
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({err: err});
            return ;
          }
          passport.authenticate('local')(req, res, () => {
            logger.info('Singup successful');
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, status: 'Registration Successful!'});
          });
        });
      }
    });
});

router.post('/login',cors.corsWithOptions, passport.authenticate('local'), (req, res,next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err){
      logger.error('Error logging in');
      return next(err);
    }

    if (!user) {
      logger.error('Login unsuccessful');
      console.log('1');
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.json({success: false, status: 'Login Unsuccessful!', err: info});
    }
    req.logIn(user, (err) => {
      if (err) {
        logger.error('Login unsuccessful');
        console.log('1');
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: false, status: 'Login Unsuccessful!', err: 'Could not log in user!'});          
      }

      var token = authenticate.getToken({_id: req.user._id});
      logger.info('Login successful');
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({success: true, status: 'Login Successful!', token: token, userinfo: req.user});
    }); 
  }) (req, res, next); // function call IIFE
  });

router.get('/logout',cors.cors, (req, res) => {
  if (req.session) {
    logger.info('Logout successful');
    console.log('2');
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

router.get('/checkJWTtoken', cors.corsWithOptions, (req, res) => {
  passport.authenticate('jwt', {session: false}, (err, user, info) => {
    if (err)
      return next(err);
    
    if (!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      return res.json({status: 'JWT invalid!', success: false, err: info});
    }
    else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.json({status: 'JWT valid!', success: true, user: user});

    }
  }) (req, res);
});

module.exports = router;