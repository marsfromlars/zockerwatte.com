function FourWins( config ) {
    
    if (!config) {
        config = {};
        
    }
    if (config.original) {
        
        this.field = [ [] , [] , [] , [] , [] , [] , [] ];
        for (var i = 0; i < 7; i ++) {
        this.field[ i ] = this.copyArray(config.original.field[i]);    
        }
        
        this.red = config.original.red;
        this.bluePlayer = config.original.bluePlayer;
        this.redPlayer = config.original.redPlayer;
        
    }
    else {
        this.field = [ [] , [] , [] , [] , [] , [] , [] ];
    
        this.red = true;
    
        this.bluePlayer = config.bluePlayer;
        this.redPlayer = config.redPlayer;
    }        
    
    
}

FourWins.prototype.copyArray = function ( originalArray ) {

    var newArray = [];
    for (var i = 0; i < originalArray.length; i ++) {
        newArray.push  (originalArray [i]);
    }
    return newArray;
    
}

FourWins.prototype.isRed = function () {
    return this.red;
}

FourWins.prototype.drop = function ( c ) {
    
    if (c < 0 || c > 6 ) {
        return "daneben!";
    }
    
    var column = this.field[c];
    if (column.length >= 6) {
        return "voll!";
    }
    var chip = 'O';
    if ( !this.red ) {
        chip = 'X';
    }
    column.push( chip );
    this.red = !this.red;

    this.calcWinner();

}

/**
 * Test if position is inside playing field
 * 
 * @param c Column
 * @param r Row
 * @return True if position is valid for playing field
 * 
 */
FourWins.prototype.isInside = function( c, r ) {
    return c >= 0 && c <= 6 && r >= 0 && r <= 5;
}


FourWins.prototype.autoClick = function() {
    if( this.getWinner() || this.isDraw()) {
        return false;
    }
    if (this.red) {
        if (this.redPlayer) {
            this.redPlayer.makeMove(this);
            return true;            
        }
    }
    else {
        if (this.bluePlayer) {
            this.bluePlayer.makeMove(this);
            return true;            
        }
    }
    return false;
}

FourWins.prototype.isDraw = function () {
    for (i = 0; i < 7; i ++) {
        if (!this.getColor (i,5)) {
            return false;
        }
    }
    return true;
    
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