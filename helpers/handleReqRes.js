
// //dependencies
// const url = require('url');
// const { StringDecoder } = require('string_decoder');
// const { buffer } = require('stream/consumers');
// const routes = require('./../routes');
// const { notFoundleHandler} = require('../handlers/routeHandlers/notFoundHandler');
// const {parseJSON} = require('../helpers/utilities');

// //module scaffolding
// const handler = {};

// handler.handleReqRes = (req, res) => {
//     //handle req
//     const parsedUrl = url.parse(req.url, true);
//     // console.log(parsedUrl);
//     const path = parsedUrl.pathname;
//     //Use regular expression for remove unwanted slash
//     const trimmedPath = path.replace(/^\/|\/$/g, '');
//     // console.log(trimmedPath);
//     const method = req.method.toLowerCase();
//     const queryStringObject = parsedUrl.query;
//     const headersObject = req.headers;

//     const requestProperties = {
//         parsedUrl, 
//         path,
//         trimmedPath,
//         method,
//         queryStringObject,
//         headersObject,
//     };

//     const decoder = new StringDecoder('utf-8');
//     let realData = '';
//     const choseHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundleHandler;

    
//     req.on('data', (buffer) => {
//         realData += decoder.write(buffer);
//     });

//     req.on('end', () => {
//         realData += decoder.end();

//         requestProperties.body = parseJSON(realData);
        
//         choseHandler(requestProperties, (statusCode, payload) =>{
//             statusCode = typeof(statusCode) === 'number' ? statusCode : 500;
//             payload = typeof(payload) === 'object' ? payload : {};
    
//             const payloadString = JSON.stringify(payload);
    
//             //return the response
//             res.writeHead(statusCode);
//             res.end(payloadString);
//         })
      

//     });


// }

// module.exports = handler;

// ############               updated handleReqRes

// dependencies
const url = require('url');
const { StringDecoder } = require('string_decoder');
const routes = require('./../routes');
const { notFoundleHandler } = require('../handlers/routeHandlers/notFoundHandler');
const { parseJSON } = require('../helpers/utilities');

// module scaffolding
const handler = {};

handler.handleReqRes = (req, res) => {
    // parse request
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname.replace(/^\/|\/$/g, ''); // remove unwanted slashes
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const headersObject = req.headers;

    const requestProperties = {
        parsedUrl,
        path,
        method,
        queryStringObject,
        headersObject,
    };

    const decoder = new StringDecoder('utf-8');
    let realData = '';

    // handle request data
    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });

    req.on('end', () => {
        realData += decoder.end();

        try {
            requestProperties.body = JSON.parse(realData); // ✅ Proper JSON parsing
        } catch (error) {
            console.error("❌ JSON Parsing Error:", error.message); // Log error
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: "Invalid JSON format" }));
        }

        // choose handler
        const chosenHandler = routes[path] ? routes[path] : notFoundleHandler;

        chosenHandler(requestProperties, (statusCode, payload) => {
            statusCode = typeof statusCode === 'number' ? statusCode : 500;
            payload = typeof payload === 'object' ? payload : {};

            const payloadString = JSON.stringify(payload);

            // return response
            res.writeHead(statusCode, { 'Content-Type': 'application/json' });
            res.end(payloadString);
        });
    });
};

module.exports = handler;
