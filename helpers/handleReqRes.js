
//module scaffolding
const handler = {};

handler.handleReqRes = (req, res) => {
    //handle req
    const parsedUrl = url.parse(req.url, true);
    // console.log(parsedUrl);
    const path = parsedUrl.pathname;
    //Use regular expression for remove unwanted slash
    const trimmedPath = path.replace(/^\/|\/$/g, '');
    // console.log(trimmedPath);
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const headersObject = req.headers;

    const decoder = new StringDecoder('utf-8');
    let realData = '';
    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });

    req.on('end', () => {
        realData += decoder.end();
        console.log(realData);
        //response hendle
        res.end("Hello World");

    });


}

module.exports = handler;