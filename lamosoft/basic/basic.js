window.basic = {

    _canvas: null,
    _ctx: null,
    _color: 'white',
    _backgroundColor: 'black',
    _colors: [ 'black', 'white', 'red', 'green', 'blue' ],
    _pixel: { x: 1, y: 1 },
    _font: 'default',
    _fonts: {
        'default': {
            dimension: { w: 8, h: 8 }
        }
    },
    _column: 0,
    _row: 0,

    /**
     * Set current screen output to a canvas
     * 
     * @param canvas Canvas or id of canvas
     * 
     */
    screen: function( canvas ) {
        var me = this;
        if( canvas ) {
            me._canvas = typeof canvas == 'string' ? document.getElementById( canvas ) : canvas;
            me._ctx = document.getElementById( 'c1' ).getContext( '2d' );
        }
    },
    
    /**
     * Clear screen with given color or black for default
     */
    clear: function( color ) {
        var me = this;
        var size = me.getSize();
        me.saveColor( color );
        me._ctx.fillRect( 0, 0, size.w, size.h );
        me.restoreColor();
        me._backgroundColor = color;
    },

    /**
     * @return Object with w, h members which are width and height in browser coordinates
     */
    getSize: function() {
        var me = this;
        return { w: me._canvas.width, h: me._canvas.height };
    },

    /**
     * Define resolution by defining the x and y size of a pixel
     */
    resolution: function( x, y ) {
        var me = this;
        me._pixel = { x: y, y: y };
    },
    
    /**
     * Define color for next drawing operations
     */
    color: function( color ) {
        var me = this;
        me._color = color;
        me._ctx.fillStyle = color;
        me._ctx.strokeStyle = color;
    },
    
    /**
     * Draw a single point
     * 
     * @param x X position
     * @param y Y position
     * @param color Optional color for point (default is current drawing color)
     * 
     */
    point: function( x, y, color ) {
        var me = this;
        me.saveColor( color );
        me._ctx.fillRect( x * me._pixel.x, y * me._pixel.y, me._pixel.x, me._pixel.y );
        me.restoreColor();
    },
    
    /**
     * Save current color and change temporarily
     * 
     * @param color Temporary new color
     */
    saveColor: function( color ) {
        var me = this;
        if( color ) {
            me._saveColor = me._color;
            me.color( color );
        }
    },
    
    /**
     * Restore saved color
     */
    restoreColor: function() {
        var me = this;
        if( me._saveColor ) {
            me.color( me._saveColor );
            me._saveColor = null;
        }
    },
    
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
    points: function( x, y, points, color, opaque ) {
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
    },

    /**
     * Select font
     * 
     * @name Name of font
     * 
     */
    font: function( name ) {
        var me = this;
        me._font = name;
    },

    /**
     * Define a letter in a font
     * 
     * @param letter Letter to define
     * @param pixels Multiline string defining the pixeled shape of the letter
     * 
     */
    defineLetter: function( letter, pixels ) {
        var me = this;
        var font = me._fonts[ me._font ];
        if( !font ) {
            font = {};
            me._fonts[ me._font ] = font;
        }
        font[ letter ] = [];
        var lines = pixels.split( '\n' );
        for( var i = 0; i < lines.length; i++ ) {
            if( lines[ i ].length > 0 ) {
                font[ letter ].push( lines[ i ] );
            }
        }
    },

    /**
     * @return All letters defined in the current font
     */
    getLetters: function() {
        var me = this;
        var font = me._fonts[ me._font ];
        if( !font ) throw 'No such font "' + me._font + '"';
        var letters = "";
        for( var letter in font ) {
            letters += "" + letter;
        }
        return letters;
    },

    /**
     * Draw text using current font
     * 
     * @param x X position
     * @param y Y position
     * @param text The text to write
     * @param opaque Draw text with opaque letters
     * 
     */
    text: function( x, y, text, opaque ) {
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
    },

    print: function( text, opaque ) {
        var me = this;
        for( var i = 0; i < text.length; i++ ) {
            me.printChar( text[ i ], opaque );
        }
    },
    
    printChar: function( char, opaque ) {
        var me = this;
        var font = me._fonts[ me._font ];
        var x = me._column * font.dimension.w;
        var y = me._row * font.dimension.h;
        me.text( x, y, char, opaque );
        me._column++;
        var size = me.getSize();
        if( me._column * font.dimension.w * me._pixel.x > size.w ) {
            me._row++;
            me._column = 0;
        }
    },

    zzz: null

}


