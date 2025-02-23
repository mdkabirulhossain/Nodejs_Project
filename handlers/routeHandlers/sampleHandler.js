//module scaffolding
const handler = {};

handler.sampleHandler = (requestProperties, callback)=>{
    console.log(requestProperties);

    callback(200, {
        message: "Sample Handler working properly",
    })
}

module.exports = handler;