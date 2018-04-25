const mongoose = require('mongoose');

const User = require('./user');

const schema = new mongoose.Schema({
    content: {
        type: String, 
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }
});

// middleware to remove message from user's 
// message array when it is deleted.
schema.pre('remove', async function(next) {
    try {
     let user = await User.findById(this.user);
     user.messages.remove(this._id);
     await user.save();
     return next();
    } catch (err) {
        return next(err)
    }
});

module.exports = mongoose.model('Message', schema);