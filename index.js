// Title: Uptime Monitoring Application
// Description: A RESTFul API to monitor up or down time of user define link
// Author: Md. Kabirul Hossain
// Date: 15.02.25

//dependencies
const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');
const { buffer } = require('stream/consumers');
const {handleReqRes} = require('./helpers/handleReqRes');

//app object - module scaffolding
const app = {};

// configuration
app.config = {
    port: 3000
};

//crate server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, () => {
        console.log(`Server is running on port ${app.config.port}`);
    });
}

//handle request res
app.handleReqRes = handleReqRes;

//start the server
app.createServer();