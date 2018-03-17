/**
 * Sprite editor
 * 
 * @param {*} ref 
 * @param {*} config 
 * 
 */
var Spreditor = function( ref, config ) {

    var me = this;
    me.config = new Config( config, { width: 16, height: 16, palette: Palette.C64 } );
    me.palette = me.config.palette;
    me.bitscreen = new Bitscreen( ref, me.config );
    me.sprite = new Sprite( me.config );
    me.colorCode = me.palette.getCode( 0 );
    me.pendown = false;

    /**
     * Redraw sprite
     */
    me.update = function() {
        var me = this;
        me.bitscreen.drawSprite( 0, 0, me.sprite, me.palette );
        if( me.config.onUpdate ) {
            me.config.onUpdate( me );
        }
    }

    me.setColor = function( colorCode ) {
        var me = this;
        me.colorCode = colorCode;
    };

    me.penup = function() {
        me.pendown = false;
        me.bitscreen.canvas.el.setAttribute( 'style', 'border: 1px solid white;' );
    };

    me.bitscreen.callback( 'click', function( x, y ) {
        me.sprite.set( x, y, me.colorCode );
        me.update();
    });

    me.bitscreen.callback( 'mousedown', function( x, y ) {
        me.pendown = true;
        me.bitscreen.canvas.el.setAttribute( 'style', 'border: 1px solid gray;' );
    });
    
    me.bitscreen.callback( 'mouseup', function( x, y ) {
        me.penup();
    });
    
    me.bitscreen.callback( 'mouseout', function( x, y ) {
        me.penup();
    });
    
    me.bitscreen.callback( 'mousemove', function( x, y ) {
        if( me.pendown ) {
            me.sprite.set( x, y, me.colorCode );
            me.update();
        }
    });

    me.update();

};

