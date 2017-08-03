function FourWins( config ) {
    
    if (!config) {
        config = {};
    }
            
    this.field = [ [] , [] , [] , [] , [] , [] , [] ];
    
    this.red = true;
    
    this.bluePlayer = config.bluePlayer;
    this.redPlayer = config.redPlayer;
    
    if(this.redPlayer) {
        this.redPlayer.makeMove(this);
        
    }
    
}

FourWins.prototype.isRed = function () {
    return this.red;
}

FourWins.prototype.drop = function ( c ) {
    
    if (c < 0 || c > 6 ) {
        throw "IDIOT!";
    }
    
    var column = this.field[c];
    if (column.lenth > 6) {
        throw "... WTF";
    }
    var chip = 'O';
    if ( !this.red ) {
        chip = 'X';
    }
    column.push( chip );
    this.red = !this.red;

    if (this.red) {
        if (this.redPlayer) {
            this.redPlayer.makeMove(this);
        }
    }
    else {
        if (this.bluePlayer) {
            this.bluePlayer.makeMove(this);
        }
    }
    this.calcWinner();

}
/** 
returns 'R' if red has won, returns 'B' if blue has won, returns null if no one has one
*/

FourWins.prototype.calcWinner= function () {
    
    for (var c = 0; c < 7; c ++) {
        
        for (var r = 0; r < 6; r ++) {
            
            if ( this.isChipAtPosition (c, r)) {
                var color = this.getColor(c , r);
                
                if (this.goldenLine = this.testLine (c, r, c+3, r, color )) {
                    
                    this.winner = color;
                    return;
                    
                } 
                if (this.goldenLine = this.testLine (c, r, c-3, r, color )) {
                    
                    this.winner = color; 
                    return;
                    
                }
                if (this.goldenLine = this.testLine (c, r, c, r+3, color )) {
                    
                    this.winner = color; 
                    return;
                    
                }
                if (this.goldenLine = this.testLine (c, r, c, r-3, color )) {
                    
                    this.winner = color; 
                    return;
                    
                }
                if (this.goldenLine = this.testLine (c, r, c+3, r+3, color )) {
                    
                    this.winner = color; 
                    return;
                    
                }
                if (this.goldenLine = this.testLine (c, r, c+3, r-3, color )) {
                    
                    this.winner = color; 
                    return;
                    
                }
                if (this.goldenLine = this.testLine (c, r, c-3, r+3, color )) {
                    
                    this.winner = color;  
                    return;
                    
                }
                if (this.goldenLine = this.testLine (c, r, c-3, r-3, color )) {
                    
                    this.winner = color; 
                    return;
                    
                }
                
            }        
            
        }
        
    }
    
}
FourWins.prototype.getWinner = function () {
    
    return this.winner;
    
}

FourWins.prototype.isChipAtPosition = function (c, r) {
    if (c < 0 || c > 6) {
        return false;
    }
    var column = this.field[c];
    if( r >= column.length) {
        return false;        
    }
    return true;
    
}

FourWins.prototype.getColor = function (c, r) {
    
    var column = this.field[c];
    return column[r];
    
}

FourWins.prototype.testLine = function (c, r, c1, r1, color) {
    
    var goldenLine = [];
    
    var cStep = 0;
    if ( c > c1) {
        cStep = -1;
    }
    else if(c < c1) {
        cStep = 1;
    }
    var rStep = 0;
    if ( r > r1) {
        rStep = -1;
    }
    else if(r < r1) {
        rStep = 1;
    }
    
    for (var i = 0; i <4; i++) {
        
        var ci = c + (cStep * i);
        var ri = r + (rStep * i);
        
        if (!this.isChipAtPosition(ci, ri)) {
            return null;
        }
        
        if (this.getColor(ci, ri) != color) {
        
            return null;        
        
        }
        
        goldenLine.push( [ ci, ri ] )
        
    }
    return goldenLine;
    
    
}

FourWins.prototype.debug = function () {
    
    for (var r = 6; r >= 0; r --) {
        
        var line = r + ": ";
        
        for (var c = 0; c < 7; c ++) {
            
            if ( this.isChipAtPosition(c, r)) {
                
                var chip = this.getColor(c, r);
                line = line + " " + chip;
                
            }
            else {
                line = line + " _";
            }
            
                
            
        } 
        console.log( line );
        
    }
    
}

FourWins.prototype.test = function () {
    
    var fw = new FourWins;
    for (var i = 0; i < 42; i++) {
        var c = Math.floor((Math.random() * 7) );
        fw.drop(c);
        console.log("random : " + c);
        fw.debug();
        if ( fw.getWinner()) {
            console.log("Se Winna iZZ: " + fw.getWinner()); 
            break;
        }
        
    }
    
}
FourWins.prototype.random = function (count) {
    
    
    for (var i = 0; i < count; i++) {
        var c = Math.floor((Math.random() * 7) );
        this.drop(c);
        
        if ( this.getWinner()) {
            
            break;
        }
        
    }
    
}
FourWins.prototype.getGoldenLine = function () {
    
    return this.goldenLine;
    
}