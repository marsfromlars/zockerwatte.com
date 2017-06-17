/**
 * A sprite is an image with blown up pixels
 * 
 * @param {*} config 
 */
function Sprite( config ) {
    this.el = typeof config.el == 'string' ? document.getElementById( config.el ) : config.el;
    this.rows = config.rows || 8;
    this.cols = config.cols || 8;
    this.pixelWidth = config.pixelWidth || this.el ? this.el.width / this.cols : 2;
    this.pixelHeight = config.pixelHeight || this.el ? this.el.height / this.rows : 2;
    this.pixels = [];
    this.ctx = this.el ? this.el.getContext( '2d' ) : null;
    this.onRepaint = config.onRepaint;
    this.mirrors = config.mirrors ? config.mirrors : [];
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
    if( this.onRepaint ) {
        this.onRepaint();
    }
    for( var i = 0; i < this.mirrors.length; i++ ) {
        this.mirrors[ i ].copyFrom( this );
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

Sprite.prototype.paintSprite = function( sprite, x, y ) {
    for( var c = 0; c < sprite.cols; c++ ) {
        for( var r = 0; r < sprite.rows; r++ ) {
            let color = sprite.get( c, r );
            if( color ) {
                this.paint( x + c, y + r, color );
            }
            else {
                this.clearPixel( x + c, y + r );
            }
        }
    }
}

/**
 * Clear all pixels
 * 
 */
Sprite.prototype.clear = function() {
    this.pixels = [];
}

/**
 * Make this sprite a copy of the given sprite
 * 
 * @param sprite Original sprite
 */
Sprite.prototype.copyFrom = function( sprite ) {
    this.pixels = sprite.pixels;
    this.repaint();
}

Sprite.prototype.clearPixel = function( x, y ) {
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

Sprite.prototype.shift = function( x, y ) {
    var newSprite = new Sprite({
        rows: this.rows,
        cols: this.cols
    });
    for( var r = 0; r < this.rows; r++ ) {
        for( var c = 0; c < this.rows; c++ ) {
            var newR = r + y;
            var newC = c + x;
            if( newR >= this.rows ) {
                newR -= this.rows;
            }
            if( newR < 0 ) {
                newR += this.rows;
            }
            if( newC >= this.cols ) {
                newC -= this.cols;
            }
            if( newC < 0 ) {
                newC += this.cols;
            }
            newSprite.set( newC, newR, this.get( c, r ) );
        }
    }
    this.pixels = newSprite.pixels;
}

/**
 * Add a sprite which will mirror the content of this sprite
 * 
 * @param sprite Sprite which will mirror content
 * 
 */
Sprite.prototype.addMirror = function( sprite ) {
    this.mirrors.push( sprite );
    sprite.copyFrom( this );
}

/**
 * Remove all mirror sprites
 * 
 */
Sprite.prototype.clearMirrors = function() {
    this.mirrors = [];
}


