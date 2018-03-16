var Palette = function() {

    var me = this;
    me.colors = {};

    me.set = function( code, color ) {
        var me = this;
        code = me.checkCode( code );
        me.colors[ code ] = color;
    };
    
    me.get = function( code ) {
        var me = this;
        code = me.checkCode( code );
        var color = me.colors[ code ];
        return color || null;
    };

    me.checkCode = function( code ) {
        var me = this;
        code = code[ 0 ];
        if( ( code >= 'A' && code <= 'Z' ) || ( code >= 'a' && code <= 'z' ) ) {
                return code;
        }
        throw "Invalid color index code. Allowed are A-Z,a-z";
    };

};

