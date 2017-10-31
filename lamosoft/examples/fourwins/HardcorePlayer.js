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

    var move = this.calculateBestMove( fw );
    fw.drop( move );

}


HardcorePlayer.prototype.calculateBestMove = function( fw ) {

    var bestDiff;
    var bestColumn;

    var counterColor = this.negateColor( this.color );

    var myOriginalHeuristic = new Heuristic( fw, this.color ).getValue();
    var opponentOriginalHeuristic = new Heuristic( fw, counterColor ).getValue();

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

            for( var j = 0; j < 7; j++ ) {

                var nextNextFw = new FourWins({ original: nextFw });
                nextNextFw.drop( j );

                if( nextNextFw.getWinner() == this.color ) {
                    return i; // instant win
                }
                else if( nextNextFw.getWinner() && nextNextFw.getWinner() != this.color ) {
                    // do nothing - opponent would instantly win here
                }
                else {

                    var myHeuristic = new Heuristic( nextNextFw, this.color ).getValue();
                    var opponentHeuristic = new Heuristic( nextNextFw, counterColor ).getValue();

                    var myDiff = myHeuristic - myOriginalHeuristic;
                    var opponentDiff = opponentHeuristic - opponentOriginalHeuristic;

                    var diff = myDiff - opponentDiff;

                    if( !bestDiff || diff > bestDiff ) {
                        bestDiff = diff;
                        bestColumn = i;
                    }

                }

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


HardcorePlayer.prototype.negateColor = function( color ) {

    return color == "O" ? "X" : "O";

}


HardcorePlayer.prototype.calculateHeuristic = function (fwx, color) {

    return new Heuristic( fwx, color ).getValue();

    /*
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
    */
        
}

    


HardcorePlayer.prototype.sameColor = function (fwx, color, c, r) {

     if(fwx.isChipAtPosition( c, r) ) {
        
        if (fwx.getColor(c ,r) == color) {
            return true;    
        }
     }
    
    return  false;
    
}
