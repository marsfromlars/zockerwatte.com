function Line( id, length, freedomLeft, freedomRight ) {

    this.id = id;
    this.length = length;
    this.freedomLeft = freedomLeft;
    this.freedomRight = freedomRight;

    this.freedom = this.freedomLeft + this.freedomRight;

    this.calulate();

}

Line.prototype.calulate = function() {
    
    this.level = Level.ZERO;
    this.value = 0;

    if( this.length >= 4 ) {
        // already won
        this.level = Level.ONE;
        this.value = 1000;
    }
    else if( this.freedom + this.length < 4 ) {
        // no chance to get 4
        this.level = Level.ZERO;
        this.value = 0;
    }
    else if( this.length == 3 && this.freedomLeft >= 1 && this.freedomRight >= 1 ) {
        // .OOO.
        this.level = Level.TWO;
        this.value = 900;
    }
    else if( this.length == 3 ) {
        // .OOO or OOO.
        this.level = Level.THREE;
        this.value = 700;
    }
    else if( this.length == 2 
        && this.freedomLeft >= 1 && this.freedomRight >= 1 && this.freedom >= 3) {
        // .OO.. or ..OO.
        this.level = Level.FOUR;
        this.value = 600 + this.freedom;
    }
    else if( this.length == 2 ) {
        this.level = Level.FIVE;
        this.value = 200;
        if( this.freedomLeft >= 1 && this.freedomRight >= 1 ) {
            // .OO.
            this.value += 2;
        }
        else {
            // OO..
            this.value += 1;
        }
    }
    else if( this.length == 1 ) {
        this.level = Level.SIX;
        this.value = 100;
        if( this.freedomLeft >= 3 && this.freedomRight >= 3 ) {
            // ...O...
            this.value += 4;
        }
        else if( this.freedom >= 5 && ( this.freedomLeft >= 3 || this.freedomRight >= 3 ) ) {
            // ...O.. or ..O...
            this.value += 3;
        }
        else if( this.freedom >= 4 && ( this.freedomLeft >= 3 || this.freedomRight >= 3 ) ) {
            // ...O. or .O...
            this.value += 2;
        }
        else {
            // O...
            this.value += 1;
        }
    }

}

Line.prototype.getLevel = function() {
    return this.level;
}

Line.prototype.getValue = function() {
    return this.value;
}

Line.prototype.debug = function() {
    return this.id + " LVL:" + this.level + " VAL:" + this.value 
        + " " + this.freedomLeft + "[" + this.length + "]" + this.freedomRight;
}

