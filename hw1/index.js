/*
    Baseline for HelloWorld API
*/

// API dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;




const server = http.createServer(( req, res) => {  
    // console.log(Object.keys(req))  

    // Get the URL from the request the user sent
    const parsedInBoundURL = url.parse(req.url, true);
    console.log('[URL FROM REQUEST]', parsedInBoundURL);


    // Get the PATH from the request the user sent
    // console.log('[PATH FROM REQUEST]', req.path);
    const path = parsedInBoundURL.pathname;



    // Modify the PATH ( strip away slashes )
    // console.log('[trimmedUrlPath FROM REQUEST]', trimmedUrlPath);
    const trimmedUrlPath = path.replace(/^\/+|\/+$/g, '');


    // Parse the queryStrings ( if Any and place them into an object )    
    const reqQueryStringObject = parsedInBoundURL.query;
    // console.log('[QUERY STRING FROM URL]', reqQueryStringObject);


    // Pull the method from the request
    // console.log('[method]', req.method);
    const method = req.method.toLowerCase();


    // Pull the Headers from the request
    const headers = req.headers;
    // console.log('[HEADERS]',headers);


    // Decode the data from the user ( use utf-8 );
        // Assemble the data object
    const data = {

    };
    const deCorder = new StringDecoder('utf-8');

    let buffer = '';

        // On recievig ne data, we're turning that code into a simple Human readable string
            // by dcoding it using utf-8 and then appending it to the buffer
    req.on('data', data => {
        console.log('[DATA BEFORE DECODING]', data)
        buffer += deCorder.write(data);
        console.log('[DATA AFTER DECODING]', buffer)
    });
    
    res.end('TSTING13');

});

server.listen(4000, () => console.log('Server is now listening on port 4000'));



// API Handlers
const reqHandler = {};

reqHandler.testSample = (( data, callback ) => {
    callback(200, { 'testApi': 'SUCCESS!' });
});



// Routes
const router = {
    'testSample': reqHandler.testSample
};