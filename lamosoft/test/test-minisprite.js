var test = require('tape');
var fs = require("fs");

function read(f) {
  return fs.readFileSync(f).toString();
}
function include(f) {
  eval.apply(global, [read(f)]);
}

include( 'examples/sprite.js' );

test('unpacked method', function (t) {

    let sprite = new Sprite();
    sprite.pixels = [ 'red' ];

});
