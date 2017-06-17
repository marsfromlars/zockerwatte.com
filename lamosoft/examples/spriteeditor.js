/**
 * A sprite editor lets you click on pixels to modify them
 * 
 * @param {*} config 
 */
function SpriteEditor( config ) {

    this.sprite = config.sprite;
    this.el = this.sprite.el;
    this.color = 'red';
    this.pendown = false;
    this.persistenceId = config.persistenceId;

    var me = this;

    me.load();
    
    this.el.addEventListener( 'click', function( event ) {
        let x = me.sprite.x2col( event.offsetX );
        let y = me.sprite.y2row( event.offsetY );
        me.doclick( x, y );
    });
    document.body.addEventListener( 'mousedown', function( event ) {
        me.pendown = true;
    });
    document.body.addEventListener( 'mouseup', function( event ) {
        me.pendown = false;
    });
    this.el.addEventListener( 'mousemove', function( event ) {
        if( me.pendown ) {
            let x = me.sprite.x2col( event.offsetX );
            let y = me.sprite.y2row( event.offsetY );
            me.doclick( x, y );
        }
    });

}

SpriteEditor.prototype.doclick = function( x, y ) {
    this.sprite.set( x, y, this.color );
    this.sprite.repaint();
    this.save();
}

SpriteEditor.prototype.shift = function( x, y ) {
    this.sprite.shift( x, y );
    this.sprite.repaint();
    this.save();
}

SpriteEditor.prototype.save = function() {
    let me = this;
    if( me.persistenceId ) {
        let data = {
            color: this.color,
            pixels: this.sprite.pixels
        };
        let serialized = JSON.stringify( data );
        window.localStorage.setItem( me.persistenceId, serialized );
    }
}

SpriteEditor.prototype.load = function() {
    let me = this;
    if( me.persistenceId ) {
        try {
            let stored = window.localStorage.getItem( me.persistenceId );
            if( stored ) {
                let loaded = JSON.parse( stored );
                if( loaded ) {
                    this.color = loaded.color ? loaded.color : 'red';
                    this.sprite.pixels = loaded.pixels ? loaded.pixels : this.sprite.pixels;
                    this.sprite.repaint();
                }
            }
        }
        catch( e ) {
            console.log( e );
        }
    }    
}

