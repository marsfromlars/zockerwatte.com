function Lines( fourWins, color ) {

    this.fourWins = fourWins;
    this.color = color;

    if( fourWins ) {
        this.calulate();
    }

}

Lines.prototype.calulate = function() {

    this.all = [];
    this.horizontal = [];
    this.vertical = [];
    this.forward = [];
    this.backward = [];

    // horizontal
    for( var i = 0; i < 6; i++ ) {
        var array = this.getArray( 0, i, 1, 0 );
        var lines = this.getLines( "H" + i, array );
        this.addAll( lines, this.horizontal );
    }

    // vertical
    for( var i = 0; i < 7; i++ ) {
        var array = this.getArray( i, 0, 0, 1 );
        var lines = this.getLines(  "V" + i, array );
        this.addAll( lines, this.vertical );
    }

    /*

    5 o o o o o o o
    4 o o o o o o o
    3 o o o o o o o
    2 o o o o o o o
    1 o o o o o o o
    0 o o o o o o o
    + 0 1 2 3 4 5 6

    */

    // forward
    this.addAll( this.getLines( "F0", this.getArray( 0, 2, 1, 1 ) ), this.forward );
    this.addAll( this.getLines( "F1", this.getArray( 0, 1, 1, 1 ) ), this.forward );
    this.addAll( this.getLines( "F2", this.getArray( 0, 0, 1, 1 ) ), this.forward );
    this.addAll( this.getLines( "F3", this.getArray( 1, 0, 1, 1 ) ), this.forward );
    this.addAll( this.getLines( "F4", this.getArray( 2, 0, 1, 1 ) ), this.forward );
    this.addAll( this.getLines( "F5", this.getArray( 3, 0, 1, 1 ) ), this.forward );

    // backward
    this.addAll( this.getLines( "B0", this.getArray( 0, 2, -1, 1 ) ), this.backward );
    this.addAll( this.getLines( "B1", this.getArray( 0, 1, -1, 1 ) ), this.backward );
    this.addAll( this.getLines( "B2", this.getArray( 0, 0, -1, 1 ) ), this.backward );
    this.addAll( this.getLines( "B3", this.getArray( 1, 0, -1, 1 ) ), this.backward );
    this.addAll( this.getLines( "B4", this.getArray( 2, 0, -1, 1 ) ), this.backward );
    this.addAll( this.getLines( "B5", this.getArray( 3, 0, -1, 1 ) ), this.backward );

    this.addAll( this.horizontal, this.all );
    this.addAll( this.vertical, this.all );
    this.addAll( this.forward, this.all );
    this.addAll( this.backward, this.all );
    
}

Lines.prototype.getAll = function() {
    return this.all;
}

/**
 * Transform a herizontal, vertical or diagonal path accross the playfield into an array
 * 
 * @param c Start column
 * @param r Start row
 * @param cStep Step in c-direction
 * @param rStep Step in r-direction
 * @return Array of elements in path
 *  
 */
Lines.prototype.getArray = function( c, r, cStep, rStep ) {
    var array = [];
    while( this.fourWins.isInside( c, r ) ) {
        var chip = this.fourWins.getColor( c, r );
        if( !chip ) {
            // test if below this position there is a filled stone
            if( r > 0 && !this.fourWins.isChipAtPosition( c, r - 1 ) ) {
                chip = "?"; // means flying in the air
            }
        }
        array.push( chip );
        c += cStep;
        r += rStep;
    }
    return array;
}

/**
 * From an array created by getArray generate a list of same colored lines on the path
 * 
 * @param prefix Prefix for id string
 * @param array Array of chips or empty position
 * @return Array of lines on the path
 *  
 */
Lines.prototype.getLines = function( prefix, array ) {
    var lines = [];
    var mode = "before";
    var freedomLeft = 0;
    var freedomRight = 0;
    var length = 0;

    for( var i = 0; i < array.length; i++ ) {
        var chip = array[ i ];
        if( mode == "before" ) {
            if( !chip ) {
                freedomLeft++;
            }
            else if( chip == this.color ) {
                length++;
                mode = "inside";
            }
            else {
                freedomLeft = 0;
            }
        }
        else if( mode == "inside" ) {
            if( !chip ) {
                mode = "after";
                freedomRight = 1;
            }
            else if( chip == this.color ) {
                length++;
            }
            else {
                var line = new Line( prefix + "_" + (lines.length), length, freedomLeft, freedomRight );
                lines.push( line );
                mode = "before";
                freedomLeft = freedomRight;
                length = 0;
                freedomRight = 0;
            }
        }
        else { // mode = "after"
            if( !chip ) {
                freedomRight++;
            }
            else if( chip == this.color ) {
                freedomRight++;
                /*
                var line = new Line( prefix + "_" + (lines.length), length, freedomLeft, freedomRight );
                lines.push( line );
                mode = "before";
                freedomLeft = freedomRight;
                length = 1;
                freedomRight = 0;                
                */
            }
            else { // other color
                var line = new Line( prefix + "_" + (lines.length), length, freedomLeft, freedomRight );
                lines.push( line );
                mode = "before";
                freedomLeft = 0;
                length = 0;
                freedomRight = 0;                
            }
        }
    }

    if( mode == "inside" ) {
        var line = new Line( prefix + "_" + (lines.length), length, freedomLeft, 0 );
        lines.push( line );
    }
    else if( mode == "after" ) {
        var line = new Line( prefix + "_" + (lines.length), length, freedomLeft, freedomRight );
        lines.push( line );
    }

    return lines;
}

Lines.prototype.addAll = function( source, target ) {
    for( var i = 0; i < source.length; i++ ) {
        target.push( source[ i ] );
    }
}


