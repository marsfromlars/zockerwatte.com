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
    }

    me.bitscreen.callback( 'click', function( x, y ) {
        me.sprite.set( x, y, me.colorCode );
        me.update();
    });

    me.update();

};

