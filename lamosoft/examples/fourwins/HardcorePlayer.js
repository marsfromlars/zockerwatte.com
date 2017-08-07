function HardcorePlayer ( color, level ) {
    
   this.level = level;
    this.color = color;
    if(this.color == "X") {
        this.gegnerColor = "O";
    }
    else {
        this.gegnerColor = "X";
    }
    
}
HardcorePlayer.prototype.makeMove = function (fw) {

//    var result = this.calculateDeep( fw, 2, this.color, this.color );
//    fw.drop( result.column );

    var move = this.calculateBestMove( fw );
    fw.drop( move );

}


HardcorePlayer.prototype.calculateBestMove = function( fw ) {

    var bestDiff;
    var bestColumn;

    var counterColor = this.negateColor( this.color );

    for( var i = 0; i < 7; i++ ) {

        var nextFw = new FourWins({ original: fw });
        nextFw.drop( i );

        if( nextFw.getWinner() == this.color ) {
            return i; // instant win
        }
        else if( nextFw.getWinner() && nextFw.getWinner() != this.color ) {
            // do nothing - opponent would instantly win here
        }
        else {

            var allMoves = [];
            this.findAllMoves( nextFw, 2, allMoves );

            // calculate all possible counter moves
            var bestCounterHeuristic = null;

            for( var j = 0; j < allMoves.length; j++ ) {

                var counterFw = allMoves[ j ];
                var counterHeuristic = this.calculateHeuristic( counterFw, counterColor );

                if( !bestCounterHeuristic || counterHeuristic > bestCounterHeuristic ) {
                    bestCounterHeuristic = counterHeuristic;
                }
                
            }

            var myHeuristic = this.calculateHeuristic( nextFw, this.color );
            var diff = myHeuristic - bestCounterHeuristic;

            if( !bestDiff || diff > bestDiff ) {
                bestDiff = diff;
                bestColumn = i;
            }

        }

    }

    return bestColumn;

}

HardcorePlayer.prototype.findAllMoves = function( fw, depth, allMoves ) {

    for( var i = 0; i < 7; i++ ) {

        var fwi = new FourWins({ original: fw });
        fwi.drop( i );

        if( depth == 0 ) {
            allMoves.push( fwi );
        }
        else {
            this.findAllMoves( fwi, depth - 1, allMoves );
        }

    }


}

HardcorePlayer.prototype.calculateDeep = function( fw, depth, myColor, dropColor ) {

    if( depth == 0 ) {

        dropColor = this.negateColor( dropColor );

        var myHeuristic = this.calculateHeuristic( fw, myColor );
        var counterHeuristic = this.calculateHeuristic( fw, this.negateColor( myColor ) );
        var heuristic = myHeuristic - counterHeuristic;

        return {
            heuristic: heuristic,
            column: 0 // not important here
        };

    }
    else {

        var maxHeuristic = null;
        var maxColumn = null;

        for( var i = 0; i < 7; i++ ) {

            var fwx = new FourWins({original: fw});
            fwx.drop( i );
            
            var result = this.calculateDeep( fwx, depth - 1, myColor, this.negateColor( dropColor ) );

            var heuristic = result.heuristic;

            if( dropColor == myColor ) {
                heuristic = -heuristic;
            }

            if( maxHeuristic == null || heuristic > maxHeuristic ) {
                maxHeuristic = heuristic;
                maxColumn = i;
            }

        }

        return {
            heuristic: maxHeuristic,
            column: maxColumn
        };

    }

}

HardcorePlayer.prototype.negateColor = function( color ) {

    return color == "O" ? "X" : "O";

}


HardcorePlayer.prototype.calculateHeuristic = function (fwx, color) {

    var heuristic = 0;
    if (this.level == 0) {

        if( fwx.getWinner() == color ) {
            return 1000;
        }
       
         for (var c = 0; c < 7; c ++) {
             for (var r = 0; r < 6; r ++) {
                 if (fwx.getColor ( c, r) == color) {

                     if( this.sameColor(fwx, color, c-1, r-1)) {
                         heuristic ++;
                     }
                     if( this.sameColor(fwx, color, c-1, r)) {
                         heuristic ++;
                     }
                     if( this.sameColor(fwx, color, c-1, r+1)) {
                         heuristic ++;
                     }
                     if( this.sameColor(fwx, color, c, r-1)) {
                         heuristic ++;
                     }
                     if( this.sameColor(fwx, color, c, r)) {
                         heuristic ++;
                     }
                     if( this.sameColor(fwx, color, c, r+1)) {
                         heuristic ++;
                     }
                     if( this.sameColor(fwx, color, c+1, r-1)) {
                         heuristic ++;
                     }
                     if( this.sameColor(fwx, color, c+1, r)) {
                         heuristic ++;
                     }
                     if( this.sameColor(fwx, color, c+1, r+1)) {
                         heuristic ++;
                     }

                 }

             }
         }  
        
    }

    return heuristic;

        
}

    


HardcorePlayer.prototype.sameColor = function (fwx, color, c, r) {

     if(fwx.isChipAtPosition( c, r) ) {
        
        if (fwx.getColor(c ,r) == color) {
            return true;    
        }
     }
    
    return  false;
    
}
