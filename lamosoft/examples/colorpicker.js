/**
 * A sprite editor lets you click on pixels to modify them
 * 
 * @param {*} config 
 */
function ColorPicker( config ) {

    let me = this;

    me.el = typeof config.el == 'string' ? document.getElementById( config.el ) : config.el;
    me.div = typeof config.div == 'string' ? document.getElementById( config.div ) : config.div;

    let canvas = document.createElement( 'canvas' );
    canvas.setAttribute( 'id', 'pickerCanvas' );
/*
    canvas.setAttribute( 'width', '200' );
    canvas.setAttribute( 'height', '200' );
*/
    me.div.appendChild( canvas );

    for( var i = 0; i < config.historySize; i++ ) {
        let span = document.createElement( 'span' );
        span.setAttribute( 'class', 'historyEntry' );
        span.innerHTML = '&nbsp;';
        me.div.appendChild( span );
    }

    me.ctx = me.el.getContext( '2d' );

    me.el.addEventListener( 'click', function( event ) {
        me.doclick( event.offsetX, event.offsetY );
    });

    canvas.addEventListener( 'click', function( event ) {
        me.doclick( event.offsetX, event.offsetY );
    });

    var imageObj = new Image();
    imageObj.onload = function() {
        me.ctx.drawImage( imageObj, 0, 0 );
    };

    imageObj.src = config.imageUrl;

    var imageObj = new Image();
    imageObj.onload = function() {
        let ctx = canvas.getContext( '2d' );
        canvas.setAttribute( 'width', '' + imageObj.width );
        canvas.setAttribute( 'height', '' + imageObj.height );
        ctx.drawImage( imageObj, 0, 0 );
    };

    imageObj.src = config.imageUrl;

}

ColorPicker.prototype.doclick = function( x, y ) {
    var p = this.ctx.getImageData(x, y, 1, 1).data; 
    var hex = "#" + ("000000" + this.rgbToHex(p[0], p[1], p[2])).slice(-6);
    document.body.style = 'background-color: ' + hex;
}

ColorPicker.prototype.rgbToHex = function(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}
