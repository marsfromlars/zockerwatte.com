/**
 * A sprite editor lets you click on pixels to modify them
 * 
 * @param {*} config 
 */
function ColorPicker( config ) {
    this.el = config.el;
    this.ctx = this.el.getContext( '2d' );

    var me = this;
    this.el.addEventListener( 'click', function( event ) {
        me.doclick( event.offsetX, event.offsetY );
    });
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
