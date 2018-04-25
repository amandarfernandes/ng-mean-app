require('dotenv').load();

const mongoose = require('mongoose');

mongoose.set("debug",true);
// allows us to use async functions
mongoose.Promise=Promise;
mongoose.connect('mongodb://DB_USER:DB_PASSWORD@ds259109.mlab.com:59109/ng-angular-app',{
    keepAlive:true
});


module.exports.User = require('./user');
module.exports.Message = require('./message');