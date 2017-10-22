function arrayToString( array ) {
    var s = "";
    for( var i = 0; i < array.length; i++ ) {
        var element = array[ i ];
        if( element ) {
            s += element;
        }
        else {
            s += " ";
        }
    }
    return s;
}

