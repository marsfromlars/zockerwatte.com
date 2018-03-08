var Sprite = function( config ) {

    var me = this;
    config = config || {};

    if( config.matrix ) {
        me.matrix = config.matrix;
    }
    else {
        me.matrix = new Matrix( config.width || 16, config.height || 16 );
    }

    me.clear = function() {
        var me = this;
        me.matrix.clear();
    }

    me.get = function( x, y ) {
        var me = this;
        return me.matrix.get( x, y );
    }

    me.set = function( x, y, c ) {
        var me = this;
        me.matrix.set( x, y, c )
    }

    me.width = function() {
        var me = this;
        return me.matrix.w;
    }

    me.height = function() {
        var me = this;
        return me.matrix.h;
    }

    me.toString = function() {
        var me = this;
        return me.matrix.toString();
    }    

}