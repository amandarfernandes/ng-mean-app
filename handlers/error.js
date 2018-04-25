function errorHandler (error, req,res,next) {
    console.log('In Error Handler',error)
    return res.status(error.status || 500)
            .json({
                title: error.title || 'Server Error', 
                message:error.message || 'Something went wrong!' 
            });
}

module.exports = errorHandler;