var Sprite = function( config ) {

    var me = this;
    me.config = new Config( config, {
        width: 16,
        height: 16
    });

    me.matrix = me.config.matrix || new Matrix( me.config.width, me.config.height );

    me.clear = function() {
        var me = this;
        me.matrix.clear();
    };

    me.get = function( x, y ) {
        var me = this;
        return me.matrix.get( x, y );
    };

    me.set = function( x, y, c ) {
        var me = this;
        me.matrix.set( x, y, c );
    };

    me.width = function() {
        var me = this;
        return me.matrix.w;
    };

    me.height = function() {
        var me = this;
        return me.matrix.h;
    };

    me.toString = function() {
        var me = this;
        return me.matrix.toString();
    };   

};

