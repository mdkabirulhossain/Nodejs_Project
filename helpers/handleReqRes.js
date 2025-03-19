// Dependencies
const url = require("url");
const { StringDecoder } = require("string_decoder");
const routes = require("../routes");
const { notFoundleHandler } = require("../handlers/routeHandlers/notFoundHandler");
const { parseJSON } = require("../helpers/utilities");

// Module scaffolding
const handler = {};

handler.handleReqRes = (req, res) => {
    // Parse request
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname.replace(/^\/+|\/+$/g, ""); // Remove leading/trailing slashes
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const headersObject = req.headers;

    const requestProperties = {
        parsedUrl,
        path,
        method,
        queryStringObject,
        headersObject,
        body: {}, // ✅ Default to empty object
    };

    const decoder = new StringDecoder("utf-8");
    let realData = "";

    // Handle request data
    req.on("data", (buffer) => {
        realData += decoder.write(buffer);
    });

    req.on("end", () => {
        realData += decoder.end();

        // ✅ Ensure JSON parsing is safe
        try {
            requestProperties.body = JSON.parse(realData);
        } catch (error) {
            console.error("❌ Invalid JSON received:", realData);
            requestProperties.body = {}; // Default to empty object
        }

        // Choose handler
        const chosenHandler = routes[path] ? routes[path] : notFoundleHandler;

        chosenHandler(requestProperties, (statusCode = 500, payload = {}) => {
            const responsePayload = JSON.stringify(payload);

            // Return response
            res.writeHead(statusCode, { "Content-Type": "application/json" });
            res.end(responsePayload);
        });
    });
};

module.exports = handler;
