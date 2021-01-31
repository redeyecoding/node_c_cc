/*
* Primary file for the api
*/

// Dependencies
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {

    // Get URL and parse it
    const parseUrl = url.parse(req.url, true)
    console.log('**[PARSEDURL]**', parseUrl);


    // Get the path
    let path = parseUrl.pathname;
    console.log('**[PATH]**',path);


    // Remove any trailing slashes in the url
    let trimmedPath = path.replace(/^\/+|\/+$/g,'');


    // Get the query string as an object
    let queryStringObject = parseUrl.query;


    // Get the HTTP Method
    let method = req.method.toLowerCase();


    // send response
    res.end('Hello World\n');

    // Log the request path
    console.log(`Request is recieved on this path: ${trimmedPath} with this method: "${method}"`);
    console.log(`**[QUERYSTING PARAMS SENT]**`, queryStringObject);

});



server.listen(3003, () => console.log('Server is listing on port 3003'));


