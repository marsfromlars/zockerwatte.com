/**
 * Pick color from a palette
 * 
 */
(function() {

    var Palettepicker = function( ref, palette, callback ) {

        var me = this;
        me.palette = palette;
        me.callback = callback;
        me.bitscreen = new Bitscreen( ref, { width: palette.length(), height: 1 });

        for( var i = 0; i < palette.length(); i++ ) {
            me.bitscreen.setPixel( i, 0, palette.get( palette.getCode( i ) ) );
        }

        me.bitscreen.callback( 'click', function( x, y ) {
            me.callback( me.palette.getCode( x ) );
        });

    };


    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
        module.exports = Palettepicker;
    else
        window.Palettepicker = Palettepicker;

})();


