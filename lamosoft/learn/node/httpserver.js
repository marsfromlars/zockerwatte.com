var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
    let url = url.parse( req.url );
    // if( req.method == 'GET' ) {
    //     if( url.pathname.
    // }
    console.log(req.method + ' ' + req.url);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!');
}).listen(3000);

console.log( 'Http server running on port 3000.' );

