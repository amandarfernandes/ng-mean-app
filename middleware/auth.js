require('dotenv').load();
const jwt = require("jsonwebtoken");

exports.loginRequired = function(req,res,next) {
    try {
        const token= req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, 
            (err,decoded)=>decoded ? next() : next({status:401, 
                title:'Authorization Error',    
                message:'Please sign in first'})
        );
    } catch (error) {
        console.log('login required',error)
        next(error);
    }
}

exports.isAuthorized = function(req,res,next) {
    try {
        const token= req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, 
            (err,decoded)=>{
                console.log('in   is authorized')
                console.log('decoded id', decoded.user._id);
                console.log('req', req.query.userid);
                if (decoded && decoded.user._id == req.query.userid) {
                    next();
                } else {
                    return next({status: 401,  message: 'Not Authorized'}); 
                }
            }
        );
    } catch (error) {
        next(error);
    }
}