const jwt   = require('jsonwebtoken'); 
const db    = require('../models');

exports.signin = async function(req,res,next) {
    try {
        let user = await db.User.findOne({email: req.body.email});
        //console.log(user)
        if (!user) next({ status:401, title: 'Authorization Error', message: 'Invalid credentials'  });
        let passwordsMatch = await user.comparePassword(req.body.password);
       
        if (passwordsMatch) {
            var token = jwt.sign({user}, process.env.SECRET_KEY, {expiresIn:7200} );
            return res.status(201).json({
                        message:'User signed in',
                        userid: user._id,
                        token: token
            });
        } else {
            next({
                status:401,
                title: 'Authorization Error', 
                message: 'Invalid credentials'
            });
        }
    } catch (error) {
        return next({status: 500, message:error.message});
    }
};

exports.signup = async function(req,res,next) {
    try {
        console.log(req.body)
        const newUser = {
            email:req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password:req.body.password,
        }
        let addedUser = await db.User.create(newUser);
        
        var token = jwt.sign({user:addedUser}, process.env.SECRET_KEY, {expiresIn:7200} );
        return res.status(201).json({
                    message:'User created',
                    userid: addedUser._id, 
                    token: token
                });
    } catch (error) {
        //console.log(error)
        let str = error.message;
        if (str.includes('to be unique'))
            error.message = "Sorry, The username/email are already taken";
        //if (error.code === 11000) error.message = "Sorry, The username/email are already taken";
        return next({status: 500, title:'Signup Error', message:error.message});
    }
};