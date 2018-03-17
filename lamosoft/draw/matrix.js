/**
 * @class Matrix
 * 
 */
(function() {

    /**
     * Two dimensional Matrix of characters which each symbolizes a pixel in a sprite
     * 
     * @constructor
     * @param {*} w Width of matrix
     * @param {*} h Height of matrix
     * @param {*} preFillChar Character to fill all matrix positions at beginning
     * 
     */
    var Matrix = function( w, h, preFillChar ) {

        var me = this;

        /**
         * Fill all matrix positions with the preFillChar
         * 
         */
        me.clear = function() {
            var me = this;
            me.data = [ h ];
            for( var i = 0; i < h; i++ ) {
                me.data[ i ] = preFillChar.repeat( w );
            }
            return me;
        };
        
        /**
         * Set a matrix position
         * 
         * @param {*} x X coordinate
         * @param {*} y Y coordinate
         * @param {*} char New character at position x,y
         */
        me.set = function( x, y, char ) {
            var me = this;
            if( x >= 0 && y >= 0 && x < me.w && y < me.h ) {
                me.data[ y ] = me.data[ y ].slice( 0, x ) + char[ 0 ] + me.data[ y ].slice( x+1 );
            }
        };
        
        /**
         * Get character a position x,y
         * 
         * @param {*} x X coordinate
         * @param {*} y Y coordinate
         * @returns Character at position
         * 
         */
        me.get = function( x, y ) {
            var me = this;
            if( x >= 0 && y >= 0 && x < me.w && y < me.h ) {
                return me.data[ y ][ x ];
            }
            return null;
        };
        
        /**
         * Debug output of matrix
         * 
         * @returns Debug output as string
         * 
         */
        me.toString = function() {
            var me = this;
            var s = '', sep = '';
            for( var i = 0; i < h; i++ ) {
                s += sep + me.data[ i ];
                sep = '\n';
            }
            return s;
        };

        me.w = w;
        me.h = h;
        preFillChar = preFillChar || ' ';
        preFillChar = preFillChar[ 0 ];
        me.clear();

    };


    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
        module.exports = Matrix;
    else
        window.Matrix = Matrix;

})();


