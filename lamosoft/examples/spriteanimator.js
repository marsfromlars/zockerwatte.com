/**
 * A sprite animator allows to select from a list of sprites
 * 
 * @param {*} config 
 */
function SpriteAnimator( config ) {

    let me = this;

    me.editor = config.editor;
    me.el = typeof config.el == 'string' ? document.getElementById( config.el ) : config.el;
    me.count = config.count ? config.count : 32;
    me.rows = config.rows || 16;
    me.cols = config.cols || 16;
    me.pixelWidth = config.pixelWidth ? config.pixelWidth : 2;
    me.pixelHeight = config.pixelHeight ? config.pixelHeight : 2;
    me.onSelect = config.onSelect;
    me.animatedSprites = config.animatedSprites;
    me.persistenceId = config.persistenceId;

    me.editor.setAfterSave( function( editor ) {
        me.save();
    });

    if( me.animatedSprites && me.animatedSprites.length > 0 ) {
        me.animationIndex = 0;
        setInterval( function() {
            let currentSprite = me.sprites[ me.animationIndex ];
            for( var i = 0; i < me.animatedSprites.length; i++ ) {
                me.animatedSprites[ i ].copyFrom( currentSprite );
            }
            me.animationIndex = ( me.animationIndex + 1 ) % me.count; 
        }, 100);
    }
    
    me.sprites = [];

    while( this.el.firstChild ) {
        this.el.removeChild( this.el.firstChild );
    }

    let spriteWidth = me.pixelWidth * me.cols;
    let spriteHeight = me.pixelHeight * me.rows;

    for( var i = 0; i < this.count; i++ ) {
        let canvas = document.createElement( 'canvas' );
        canvas.setAttribute( 'x-index', '' + i );
        canvas.setAttribute( 'width', spriteWidth );
        canvas.setAttribute( 'height', spriteHeight );
        canvas.setAttribute( 'class', 'unselectedSprite' );
        let sprite = new Sprite({
            el: canvas,
            rows: editor.sprite.rows,
            cols: editor.sprite.cols,
            pixelWidth: 2,
            pixelHeight: 2
        });
        me.sprites.push( sprite );
        canvas.addEventListener( 'click', function( event ) {
            let el = event.srcElement;
            let index = parseInt( el.getAttribute( 'x-index' ) );
            me.selectSprite( index );
        });
        me.el.appendChild( canvas );
    }

    me.selected = -1;

    me.load();

    me.selectSprite( 0 );

}

/**
 * Select sprite by index
 * 
 * @param index Index of sprite to become new selected sprite
 * 
 */
SpriteAnimator.prototype.selectSprite = function( index ) {
    let me = this;
    if( me.selected != -1 ) {
        me.sprites[ me.selected ].el.setAttribute( 'class', 'unselectedSprite' );
    }
    me.selected = index;
    me.sprites[ me.selected ].el.setAttribute( 'class', 'selectedSprite' );
    me.editor.sprite.clearMirrors();
    let overwrite = document.getElementById( 'overwrite' ).checked;
    let mirrorSprite = this.getSprite( index );
    if( !overwrite ) {
        me.editor.sprite.copyFrom( mirrorSprite );
    }
    me.editor.sprite.addMirror( mirrorSprite );
    if( me.onSelect ) {
        me.onSelect( index );
    }
}

/**
 * @return Some debug output
 * 
 */
SpriteAnimator.prototype.toString = function() {
    let s = '';
    for( var i = 0; i < this.sprites.length; i++ ) {
        s += this.sprites[ i ].pixels;
    }
    return s;
}

/**
 * Get sprite by index
 * 
 * @param index Index of sprite to return
 * 
 */
SpriteAnimator.prototype.getSprite = function( index ) {
    let me = this;
    return me.sprites[ index ];
}

/**
 * Save data to local storage
 * 
 */
SpriteAnimator.prototype.save = function() {
    let me = this;
    if( me.persistenceId ) {
        let spritesData = [];
        for( var i = 0; i < me.sprites.length; i++ ) {
            spritesData.push( me.sprites[ i ].pixels );
        }
        let data = {
            selected: me.selected,
            sprites: spritesData
        };
        let serialized = JSON.stringify( data );
        window.localStorage.setItem( me.persistenceId, serialized );
    }
}

/**
 * Load data from local storage
 * 
 */
SpriteAnimator.prototype.load = function() {
    let me = this;
    if( me.persistenceId ) {
        try {
            let stored = window.localStorage.getItem( me.persistenceId );
            if( stored ) {
                let loaded = JSON.parse( stored );
                if( loaded ) {
                    me.selected = loaded.selected;
                    for( var i = 0; i < me.sprites.length; i++ ) {
                        if( i < loaded.sprites.length ) {
                            me.sprites[ i ].pixels = loaded.sprites[ i ];
                        }
                        me.sprites[ i ].repaint();
                    }
                }
            }
        }
        catch( e ) {
            console.log( e );
        }
    }    
}

