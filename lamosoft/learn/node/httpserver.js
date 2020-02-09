const exec = require( 'child_process' ).exec;
var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
    let URL = url.parse( req.url );
    if( req.method == 'GET' ) {
        if( URL.pathname.endsWith( '.ico' ) ) {            
            var s = fs.createReadStream( '../images/' + URL.pathname );
            s.on('open', function () {
                res.writeHead(200, {'Content-Type': 'image/x-icon'});
                s.pipe(res);
            });
            s.on('error', function () {
                res.setHeader('Content-Type', 'text/plain');
                res.statusCode = 404;
                res.end('Not found');
            });
        }
    }
    console.log(req.method + ' ' + req.url);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!');
}).listen(3000);

let appUrl = "http://localhost:3000/";
console.log( "Server started:\n" + appUrl );
exec( "open " + appUrl );
