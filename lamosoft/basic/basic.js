window.basic = {

    _canvas: null,
    _ctx: null,
    _color: 'black',
    _colors: [ 'black', 'white', 'red', 'green', 'blue' ],
    _pixel: { x: 1, y: 1 },
    _font: 'default',
    _fonts: {},

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
     * 
     */
    points: function( x, y, points, color ) {
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
        for( i = 0; i < lines.length; i++ ) {
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
        return Object.keys( font );
    },

    /**
     * Draw text using current font
     * 
     * @param x X position
     * @param y Y position
     * @param text The text to write
     * 
     */
    text: function( x, y, text ) {
        var me = this;
        var font = me._fonts[ me._font ];
        if( !font ) throw 'No such font "' + me._font + '"';
        var width;
        for( i = 0; i < text.length; i++ ) {
            var letter = text[ i ];
            var pixels = font[ letter ];
            if( !letter ) throw 'No letter "' + letter + '" defined in font "' + me._font + '"';
            for( l = 0; l < pixels.length; l++ ) {
                if( !width ) {
                    width = pixels[ l ].length;
                }
                me.points( x + ( i * width ), y + l, pixels[ l ], me._color );
            }
        }
    }

}


