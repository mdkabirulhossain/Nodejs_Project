 
//Module scaffolding
 const handler = {};

 handler.userHandler = (requestProperties, callback) =>{

    callback(200, {
        message: 'This is User Handler URL',
    });
 };

 module.exports = handler;