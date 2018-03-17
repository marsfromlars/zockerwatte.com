(function() {

    /**
     * Palette
     * 
     * @param {*} colors Optional initialization with colors: array of map of char<>color
     */
    var Palette = function( colors ) {

        var me = this;
        me.colors = {};
        me.len = undefined;

        me.set = function( code, color ) {
            var me = this;
            code = me.checkCode( code );
            me.colors[ code ] = color;
            me.length = undefined;
        };
        
        me.get = function( code ) {
            var me = this;
            code = me.checkCode( code );
            var color = me.colors[ code ];
            return color || null;
        };
        
        me.getCode = function( index ) {
            return Palette.CODES[ index ];
        };
        
        me.length = function() {
            var me = this;
            if( !me.len ) {
                var i = 0;
                for( var code in colors ) {
                    i++;
                }
                me.len = i;
            }
            return me.len;
        };

        me.toString = function() {
            return '' + colors;
        };

        me.checkCode = function( code ) {
            var me = this;
            code = code[ 0 ];
            if( ( code >= 'A' && code <= 'Z' ) || ( code >= 'a' && code <= 'z' ) ) {
                    return code;
            }
            throw "Invalid color index code: '" + code + "'. Allowed are A-Z,a-z";
        };

        if( colors ) {
            if( Array.isArray( colors ) ) {
                for( var i = 0; i < colors.length && i < Palette.CODES.length; i++ ) {
                    me.colors[ Palette.CODES[ i ] ] = colors[ i ];
                }
            }
            else {
                for( var code in colors ) {
                    me.set( code, colors[ code ] );
                }
            }
        }

    };

    Palette.CODES = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    Palette.C64 = new Palette([ '#000000', '#ffffff', '#880000', '#aaffee', '#cc44cc', '#00cc55', '#0000aa', '#eeee77', '#dd8855', '#664400', '#ff7777', '#333333', '#777777', '#aaff66', '#0088ff', '#bbbbbb' ]);

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
        module.exports = Palette;
    else
        window.Palette = Palette;

})();
