const   mongoose = require('mongoose'),
        bcrypt = require('bcryptjs'),
        mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
  //  username: {type: String, required: true, unique: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}]
});

schema.plugin(mongooseUniqueValidator);

schema.pre('save', async function(next) {
    try {
        if (!this.isModified('password')) {
            next();
        }

        let hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);        
    }
});

schema.methods.comparePassword = async function(userPassword,next) {
    try {
        let passwordsMatch = await bcrypt.compare(userPassword,this.password);
        return passwordsMatch;
    } catch (error) {
        next(error);
    }
}
module.exports = mongoose.model('User', schema);