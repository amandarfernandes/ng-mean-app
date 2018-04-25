const db = require('../models');
const jwt = require('jsonwebtoken');

exports.getMessages = async function(req,res,next) {
    try {
        let messages = await db.Message.find()
            .populate('user', {firstName:true, lastName:true});
        return res.status(201).json({ message:'Got messages', obj: messages });
    } catch (error) {
        return next(error);
    }
}

exports.createMessage = async function (req,res,next) {
    try {
        const token= req.headers.authorization.split(' ')[1];
        const decoded = jwt.decode(token)
        const message = { 
            content:req.body.content,
            user:decoded.user._id
        };
        
        let newMessage = await db.Message.create(message);
        let foundUser = await db.User.findById(decoded.user._id);
        foundUser.messages.push(newMessage._id);
        await foundUser.save();
        let foundMessage = await db.Message.findById(newMessage._id)
                .populate('user', {firstName:true, lastName:true});
        return res.status(201).json({ message:'Created new message', obj: foundMessage});
    } catch (error) {
        return next(error);
    }
}

exports.modifyMessage = async function(req,res,next) {
    try {
        let foundMessage = await db.Message.findById(req.params.id);
        foundMessage.content = req.body.content;
        let updatedMessage = await foundMessage.save();
        return res.status(200).json({ message:'Updated message', obj: updatedMessage });
    } catch (error) {
        return next(error)  ;  
    }

}

exports.deleteMessage = async function(req,res,next) {
    try {
        let foundMessage = await db.Message.findById(req.params.id);
        let deletedMessage = await foundMessage.remove();
        return res.status(200).json({ message:'Deleted message'});
    } catch (error) {
        return next(error);
    }
}