/**
 * Sprite editor
 * 
 * @param {*} ref 
 * @param {*} config 
 * 
 */
var Spreditor = function( ref, config ) {

    var me = this;
    me.config = new Config( config, { width: 16, height: 16 } );
    me.bitscreen = new Bitscreen( ref, me.config );
    me.sprite = new Sprite( me.config );

    /**
     * Redraw sprite
     */
    me.update = function() {
        var me = this;
        me.bitscreen.drawSprite( 0, 0, me.sprite, me.palette );
    }

    me.update();

};

