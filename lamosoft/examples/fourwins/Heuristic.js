function Heuristic( fw, color ) {

    this.value = 0;
    var countLevelThrees = 0;

    var lines = new Lines( fw, color );

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
        else {
            value += line.getValue();
        }

    }

}

Heuristic.prototype.getValue = function() {
    return this.value;
}

