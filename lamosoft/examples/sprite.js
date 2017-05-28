/**
 * A sprite is an image with blown up pixels
 * 
 * @param {*} config 
 */
function Sprite( config ) {
    this.el = config.el;
    this.rows = config.rows || 8;
    this.cols = config.cols || 8;
    this.pixelWidth = config.pixelWidth || 10;
    this.pixelHeight = config.pixelHeight || 10;
    this.pixels = [];
    this.ctx = this.el.getContext( '2d' );
}

Sprite.prototype.repaint = function() {
    for( var y = 0; y < this.rows; y++ ) {
        for( var x = 0; x < this.rows; x++ ) {
            let index = this.getIndex( x, y );
            let color = this.pixels[ index ];
            if( color ) {
                this.paint( x, y, color );
            }
            else {
                this.clearPixel( x, y, color );
            }
        }
    }
}

Sprite.prototype.getIndex = function( x, y, color ) {
    return y * this.cols + x;
}

Sprite.prototype.set = function( x, y, color ) {
    this.pixels[ this.getIndex( x, y ) ] = color;
}

Sprite.prototype.get = function( x, y ) {
    return this.pixels[ this.getIndex( x, y ) ];
}

Sprite.prototype.paint = function( x, y, color ) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect( this.pixelWidth * x, this.pixelHeight * y, this.pixelWidth, this.pixelHeight );
}

Sprite.prototype.clearPixel = function( x, y, color ) {
    this.ctx.clearRect( this.pixelWidth * x, this.pixelHeight * y, this.pixelWidth, this.pixelHeight );
}

Sprite.prototype.clear = function() {
    this.pixels = [];
    this.repaint();
}

Sprite.prototype.x2col = function( x ) {
    let col = Math.floor( x / this.pixelWidth );
    return col < 0 ? 0 : col >= this.cols ? this.cols - 1 : col;
}

Sprite.prototype.y2row = function( y ) {
    let row = Math.floor( y / this.pixelHeight );
    return row < 0 ? 0 : row >= this.rows ? this.rows - 1 : row;
}


