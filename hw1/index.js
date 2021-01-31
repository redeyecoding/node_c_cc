/*
    Baseline for HelloWorld API
*/

// API dependencies
const http = require('http');
const https = require('https');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');
const fs = require('fs');


// INSTANTIATING HTTP-SERVER
const httpServer = http.createServer(( req, res) => collectiveServer(req, res));
httpServer.listen(config.httpPort, () => console.log(`Server is now listening on port ${config.httpPort} in ${config.envName} mode..`));


// INSTANTIATING HTTPS-SERVER
const httpsConfig = {
    'key': fs.readFileSync('./https/key.pem'),
    'cert': fs.readFileSync('./https/cert.pem')
};
const httpsServer = https.createServer(httpsConfig, ( req, res) => collectiveServer(req, res));
httpsServer.listen(config.httpsPort, () => console.log(`Server is now listening on port ${config.httpsPort} in ${config.envName} mode.`));



const collectiveServer = (( req, res) => {
    // EXTRACT AND PARSE INFORMATION FROM THE USER'S REQUEST
        // Get the URL from the request the user sent
        const parsedInBoundURL = url.parse(req.url, true);

        // Get the PATH from the request the user sent
    const path = parsedInBoundURL.pathname;

        // Modify the PATH ( strip away slashes )
    const trimmedUrlPath = path.replace(/^\/+|\/+$/g, '');

        // Parse the queryStrings ( if Any and place them into an object )    
    const reqQueryStringObject = parsedInBoundURL.query;

        // Pull the method from the request
    const method = req.method.toLowerCase();

        // Pull the Headers from the request
    const headers = req.headers;



    // Decode the data from the user ( use utf-8 );
        // Assemble the data object
    const deCorder = new StringDecoder('utf-8');

    let payloadBuffer = '';

        // On recievig ne data, we're turning that code into a simple Human readable string
            // by dcoding it using utf-8 and then appending it to the buffer
    req.on('data', data => {
        payloadBuffer += deCorder.write(data);
    });

    //  Returns the handler function 
    const findARouteHandler = typeof( router[trimmedUrlPath] ) !== 'undefined' ? router[trimmedUrlPath] : reqHandler.notFound;

    const data = {
        'header': headers,
        'method': method,
        'trimmedUrlPath': trimmedUrlPath,
        'reqQueryStringObject': reqQueryStringObject,
        'payload': payloadBuffer
    };

    findARouteHandler(data, (statusCode, payload) => {
        statusCode = typeof(statusCode) === 'number' ? statusCode : 200;
        payload = typeof(payload) === 'object' ? payload : {};

        // Stringfy the payload
        const stringyfiedPayload = JSON.stringify(payload);
        
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(statusCode)
        res.end(stringyfiedPayload);
    });

    // console.log('[DATA AFTER DECODING]', payloadBuffer)
    // console.log('[DATA BEFORE DECODING]', data)
    // console.log('[URL FROM REQUEST]', parsedInBoundURL);
    // console.log('[PATH FROM REQUEST]', req.path);
    // console.log(Object.keys(req))
    // console.log('[method]', req.method);
    // console.log('[HEADERS]',headers);
    // console.log('[QUERY STRING FROM URL]', reqQueryStringObject);
    // console.log('[trimmedUrlPath FROM REQUEST]', trimmedUrlPath);
    // console.log('TYPEOF', router['testSample'])
});








// API Handlers
const reqHandler = {};


reqHandler.notFound = (( data, callback ) => {
    callback(404);
});

reqHandler.ping = (( data, callback ) => {
    callback(200, { 'serverActive': true });
});

reqHandler.hello = (( data, callback ) => {
    callback(200, { 'Hello': 'HELLO THERE THIS IS THE HELLO API..WE CAN ALSO HANDLE YOUR HTTPS REQUESTS!!' });
});


// Routes
const router = {
    'testSample': reqHandler.testSample,
    'ping': reqHandler.ping,
    'hello': reqHandler.hello
};