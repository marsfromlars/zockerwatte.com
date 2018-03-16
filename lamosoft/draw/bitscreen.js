var Bitscreen = function( ref, config ) {

    var me = this;
    me.canvas = new Canvas( ref );
    me.config = config;
    me.config.width = me.config.width || me.canvas.el.width;
    me.config.height = me.config.height || me.canvas.el.height;
    me.callbacks = {};

    me.pixelW = me.canvas.el.width / me.config.width;
    me.pixelH = me.canvas.el.height / me.config.height;


    me.setPixel = function( x, y, color ) {
        var me = this, c = me.canvas;
        c.setColor( color );
        x = x * me.pixelW;
        y = y * me.pixelH;
        c.rect( x, y, me.pixelW, me.pixelH );
    }

    me.clearPixel = function( x, y ) {
        var me = this, c = me.canvas;
        x = x * me.pixelW;
        y = y * me.pixelH;
        c.clear( x, y, me.pixelW, me.pixelH );
    }

    me.drawSprite = function( x, y, sprite, palette ) {
        var me = this;
        for( var j = 0; j < sprite.height(); j++ ) {
            for( var i = 0; i < sprite.width(); i++ ) {
                var c = sprite.get( i, j );
                if( c == ' ' ) {
                    me.clearPixel( x + i, y + j );
                }
                else {
                    var color = palette.get( c );
                    me.setPixel( x + i, y + j, color );
                }
            }
        }
    }

    me.callback = function( eventName, callback ) {

        var me = this;
        me.callbacks[ eventName ] = callback;

        me.canvas.callback( eventName, function( x, y ) {
            me.callbacks[ eventName ]( Math.floor( x / me.pixelW ), Math.floor( y / me.pixelH ) );
        });

    }

}

