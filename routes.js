//dependencies
const{sampleHandler} = require('./handlers/routeHandlers/sampleHandler')
//routes
const routes = {
    sample : sampleHandler,
    user : userHandler,
}

module.exports = routes;