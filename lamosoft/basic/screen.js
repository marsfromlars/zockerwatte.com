/**
 * Create screen for canvas
 * 
 * @param {*} canvas Canvas or id of canvase
 * 
 */
function Screen( canvas ) {

    var me = this;

    me._canvas = typeof canvas == 'string' ? document.getElementById( canvas ) : canvas;
    me._ctx = me._canvas.getContext( '2d' );

    me._color = 'blue';
    me._backgroundColor;
    me._colors = [ 'black', 'white', 'red', 'green', 'blue' ];
    me._pixel = { x: 1, y: 1 };
    me._font = 'default';
    me._fonts = {
        'default': {
            dimension: { w: 8, h: 8 }
        }
    };
    me._column = 0;
    me._row = 0;
    me._sprites = {};
    me._blinkTime = 500;

}


/**
 * Set current screen output to a canvas
 * 
 * @param canvas Canvas or id of canvas
 * 
 */
Screen.prototype.clear = function( color ) {
    var me = this;
    var size = me.getSize();
    me.saveColor( color );
    me._ctx.fillRect( 0, 0, size.w, size.h );
    me.restoreColor();
    me._backgroundColor = color;
};

/**
 * @return Object with w, h members which are width and height in browser coordinates
 */
Screen.prototype.getSize = function() {
    var me = this;
    return { w: me._canvas.width, h: me._canvas.height };
};

/**
 * Define resolution by defining the x and y size of a pixel
 */
Screen.prototype.resolution = function( x, y ) {
    var me = this;
    me._pixel = { x: y, y: y };
};

/**
 * Define color for next drawing operations
 */
Screen.prototype.color = function( color ) {
    var me = this;
    me._color = color;
    me._ctx.fillStyle = color;
    me._ctx.strokeStyle = color;
};

/**
 * Draw a single point
 * 
 * @param x X position
 * @param y Y position
 * @param color Optional color for point (default is current drawing color)
 * 
 */
Screen.prototype.point = function( x, y, color ) {
    var me = this;
    me.saveColor( color );
    me._ctx.fillRect( x * me._pixel.x, y * me._pixel.y, me._pixel.x, me._pixel.y );
    me.restoreColor();
};

/**
 * Save current color and change temporarily
 * 
 * @param color Temporary new color
 */
Screen.prototype.saveColor = function( color ) {
    var me = this;
    if( color ) {
        me._saveColor = me._color;
        me.color( color );
    }
};

/**
 * Restore saved color
 */
Screen.prototype.restoreColor = function() {
    var me = this;
    if( me._saveColor ) {
        me.color( me._saveColor );
        me._saveColor = null;
    }
};

/**
 * Draw some points in a horizontal line
 * 
 * @param x X start position
 * @param y Y start position
 * @param points String containing numbers which are single digit indexes to the color table
 * @param color Optional color to be used for any pixel != 0
 * @param opaque Paint empty pixels with background color
 * 
 */
Screen.prototype.points = function( x, y, points, color, opaque ) {
    var me = this;
    me.saveColor( color );
    for( var i = 0; i < points.length; i++ ) {
        var index = parseInt( points[ i ] );
        if( index > 0 ) {
            var pointColor = me._colors[ index ];
            if( color ) {
                pointColor = color;
            }
            me.color( pointColor );
            me.point( x + i, y );
        }
        else if( opaque ) {
            me.point( x + i, y, me._backgroundColor );
        }
    }
    me.restoreColor();
};

/**
 * Select font
 * 
 * @name Name of font
 * 
 */
Screen.prototype.font = function( name ) {
    var me = this;
    me._font = name;
};

/**
 * Define a letter in a font
 * 
 * @param letter Letter to define
 * @param pixels Multiline string defining the pixeled shape of the letter
 * 
 */
Screen.prototype.defineLetter = function( letter, pixels ) {
    var me = this;
    var font = me._fonts[ me._font ];
    if( !font ) {
        font = {
            dimension: { w: 8, h: 8 }
        };
        me._fonts[ me._font ] = font;
    }
    font[ letter ] = [];
    var letterPixels = font[ letter ];
    var lines = pixels.split( '\n' );
    for( var i = 0; i < lines.length; i++ ) {
        if( lines[ i ].length > 0 && letterPixels.length < font.dimension.h ) {
            var line = lines[ i ];
            if( line.length > font.dimension.w ) {
                line = line.substring( 0, font.dimension.w );
            }
            letterPixels.push( line );
        }
    }
};

/**
 * @return All letters defined in the current font
 */
Screen.prototype.getLetters = function() {
    var me = this;
    var font = me._fonts[ me._font ];
    if( !font ) throw 'No such font "' + me._font + '"';
    var letters = "";
    for( var letter in font ) {
        letters += "" + letter;
    }
    return letters;
};

/**
 * Draw text using current font
 * 
 * @param x X position
 * @param y Y position
 * @param text The text to write
 * @param opaque Draw text with opaque letters
 * 
 */
Screen.prototype.text = function( x, y, text, opaque ) {
    var me = this;
    text = new String( text ).toUpperCase();
    var font = me._fonts[ me._font ];
    if( !font ) {
        console.log( 'No such font "' + me._font + '"' );
        return;
    }
    var width;
    for( var i = 0; i < text.length; i++ ) {
        var letter = text[ i ];
        var pixels = font[ letter ];
        if( !pixels ) {
            console.log( 'No letter "' + letter + '" defined in font "' + me._font + '"' );
        }
        else {
            for( var l = 0; l < pixels.length; l++ ) {
                if( !width ) {
                    width = pixels[ l ].length;
                }
                me.points( x + ( i * width ), y + l, pixels[ l ], me._color, opaque );
            }
        }
    }
};

Screen.prototype.print = function( text, opaque ) {
    var me = this;
    for( var i = 0; i < text.length; i++ ) {
        me.printChar( text[ i ], opaque );
    }
};

Screen.prototype.printChar = function( char, opaque ) {
    var me = this;
    var font = me._fonts[ me._font ];
    if( char == '\n' ) {
        me._row++;
        me._column = 0;
    }
    else {
        var x = me._column * font.dimension.w;
        var y = me._row * font.dimension.h;
        me.text( x, y, char, opaque );
        me._column++;
    }
    // automatic line break
    var size = me.getSize();
    if( (me._column+1) * font.dimension.w * me._pixel.x >= size.w ) {
        me._row++;
        me._column = 0;
    }
    // scroll at the end of the page
    if( (me._row+1) * font.dimension.h * me._pixel.y >= size.h ) {
        me.scroll( 0, -font.dimension.h * me._pixel.y );
        me._row--;
    }
};

Screen.prototype.scroll = function( x, y, millis ) {
    var me = this;
    /*
    if( !millis ) {
        me._scroll( x, y );
    }
    else {
        
    }
    */
    me.scrollImpl( x, y );
}

Screen.prototype.scrollImpl = function( x, y ) {
    var me = this;
    var x1 = x < 0 ? -x : 0;
    var y1 = y < 0 ? -y : 0;
    var x2 = x > 0 ? x : 0;
    var y2 = y > 0 ? y : 0;
    var size = me.getSize();
    var imageData = me._ctx.getImageData( x1, y1, size.w - Math.abs( x ), size.h - Math.abs( y ) );
    me._ctx.putImageData( imageData, x2, y2 );
    me._ctx.fillStyle = me._backgroundColor;
    var xClear = x < 0 ? size.w + x : 0;
    var yClear = y < 0 ? size.h + y : 0;
    me._ctx.fillRect( xClear, 0, Math.abs( x ), size.h );
    me._ctx.fillRect( 0, yClear, size.w, Math.abs( y ) );
}

Screen.prototype.defineSprite = function( name, w, h ) {
    var me = this;
    var canvas = document.createElement( 'canvas' );
    canvas.setAttribute( 'width', w );
    canvas.setAttribute( 'height', h );
    var ctx = canvas.getContext( '2d' );
    me._sprites[ name ] = {
        name: name,
        w: w,
        h: h,
        canvas: canvas,
        ctx: ctx
    }
    ctx.fillStyle = 'rgba(0,0,0,0)';
    ctx.fillRect( 0, 0, w, h );
    ctx.fillStyle = 'red';
    ctx.fillRect( 2, 2, 10, 10 );
};

Screen.prototype.drawSprite = function( name, x, y ) {
    var me = this;
    var sprite = me._sprites[ name ];
    me._ctx.drawImage( sprite.canvas, x, y );
};

Screen.prototype.showCursor = function( on ) {
    var me = this;
    if( !on ) {
        if( me._cursorInterval ) {
            clearInterval( me._cursorInterval );
        }
    }
    else {
        me._cursorInterval = setInterval( () => {
            var font = me._fonts[ me._font ];
            var x = me._column * font.dimension.w;
            var y = me._row * font.dimension.h;
            var cursorChar = !me._cursorBright ? "1" : "2";
            me._cursorBright = !me._cursorBright;
            me.text( x, y, cursorChar, true );
        }, me._blinkTime );
    }
};



