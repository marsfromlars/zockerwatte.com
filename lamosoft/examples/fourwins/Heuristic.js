function Heuristic( fw, color ) {

    this.fw = fw;
    this.color = color;
    this.value = 0;
    var countLevelThrees = 0;
    var countLevelFours = 0;

    var lines = new Lines( fw, color ).getAll();

    for( var i = 0; i < lines.length; i++ ) {

        var line = lines[ i ];
        if( line.getLevel() == Level.ONE ) {
            this.value = 1000000; // already won
            break;
        }
        else if( line.getLevel() == Level.TWO ) {
            this.value = 900000; // won in one move
            break;
        }
        else if( line.getLevel() == Level.THREE ) {
            countLevelThrees++;
            if( countLevelThrees >= 2 ) {
                // TODO: should not overlap
                this.value = 900000; // won in one move
                break;
            }
        }
        else if( line.getLevel() == Level.FOUR ) {
            countLevelFours++;
            if( countLevelFours >= 2 ) {
                // TODO: should not overlap
                this.value = 900000; // won in one move
                break;
            }
        }
        else {
           this.value += line.getValue();
        }

    }

}

Heuristic.prototype.getValue = function() {
    return this.value;
}

Heuristic.prototype.debugHTML = function() {
    var s = "";
    var lines = new Lines( this.fw, this.color );

    for( var i = 0; i < lines.horizontal.length; i++ ) {
        s += "<br>" + lines.horizontal[ i ].debug();
    }
    for( var i = 0; i < lines.vertical.length; i++ ) {
        s += "<br>" + lines.vertical[ i ].debug();
    }
    for( var i = 0; i < lines.forward.length; i++ ) {
        s += "<br>" + lines.forward[ i ].debug();
    }
    for( var i = 0; i < lines.backward.length; i++ ) {
        s += "<br>" + lines.backward[ i ].debug();
    }
    return s;
}

