/**
 * Minisprite is all about formatting and parsing sprite data from and to
 * the smallest possible string representation.
 * 
 */
class Minisprite {
    
    static METHOD = {
        UNPACKED: 1
    }
    
    static format( sprite, method ) {
        if( method == Minisprite.METHOD.UNPACKED ) {
            formatUnpacked( sprite );
        }
    }
    static formatUnpacked( sprite ) {
        return JSON.stringify( sprite.pixels );
    }

    static parse( sprite, method ) {
        if( method == Minisprite.METHOD.UNPACKED ) {
            parseUnpacked( sprite );
        }
    }
    static parseUnpacked( text ) {
        return JSON.parse( text );
    }

}

