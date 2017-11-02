function Sprite( w, h ) {
    var me = this;
    me.w = w;
    me.h = h;
    me.rows = [];
}

Sprite.prototype.set = function( x, y, colorIndex ) {
    var me = this;
    while( me.rows.length < y + 1 ) {
        me.rows.push( "" );
    }
    var row = me.rows[ y ];
    while( row.length < x + 1 ) {
        row = row + " ";
    }
    colorIndex = colorIndex.length == 0 ? " " : colorIndex[ 0 ];
    row = row.substring( 0, x - 1 ) + colorIndex + row.substring( x + 1, row.length );
    me.rows[ y ] = row;
}

Sprite.prototype.get = function( x, y ) {
    var me = this;
    if( me.rows.length < y + 1 ) {
        return " ";
    }
    var row = me.rows[ y ];
    if( row.length < x + 1 ) {
        return " ";
    }
    return row[ x ];
}

Sprite.prototype.setRow = function( y, row ) {
    var me = this;
    while( me.rows.length < y + 1 ) {
        me.rows.push( "" );
    }
    if( row && row.length >= me.w ) {
        row = row.substring( 0, me.w );
    }
    me.rows[ y ] = row;
}

Sprite.prototype.debug = function() {
    var me = this;
    var result = "<table border=1>";
    for( var i = 0; i < me.h; i++ ) {
        result += "<tr>";
        for( var j = 0; j < me.w; j++ ) {
            result += "<td>"
            result += me.get( j, i );
            result += "</td>"
        }
        result += "</tr>";
    }
    return result;
}

