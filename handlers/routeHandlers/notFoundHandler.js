//module scaffolding
const handler = {};

handler.notFoundleHandler = (requestProperties, callback)=>{
    callback(404, {
        message: "Not found",
    })
}

module.exports = handler;