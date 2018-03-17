(function() {

    var Matrix = function( w, h, preFillChar ) {

        var me = this;

        me.clear = function() {
            var me = this;
            me.data = [ h ];
            for( var i = 0; i < h; i++ ) {
                me.data[ i ] = preFillChar.repeat( w );
            }
            return me;
        };
        
        me.set = function( x, y, color ) {
            var me = this;
            if( x >= 0 && y >= 0 && x < me.w && y < me.h ) {
                me.data[ y ] = me.data[ y ].slice( 0, x ) + color[ 0 ] + me.data[ y ].slice( x+1 );
            }
        };
        
        me.get = function( x, y ) {
            var me = this;
            if( x >= 0 && y >= 0 && x < me.w && y < me.h ) {
                return me.data[ y ][ x ];
            }
            return null;
        };
        
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


