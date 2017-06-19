/**
 * A sprite editor lets you click on pixels to modify them
 * 
 * @param {*} config 
 */
function SpriteEditor( config ) {

    var me = this;
    
    me.sprite = config.sprite;
    me.el = me.sprite.el;
    me.color = config.color || 'red';
    me.pendown = false;
    me.afterSave = config.afterSave;

    me.persistence = new Persistence({
        persistenceId: config.persistenceId,
        getModel: function() {
            return me.getModel();
        },
        setModel: function( model ) {
            me.setModel( model )
        }
    });

    me.persistence.load();
    
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
    this.changed();
}

SpriteEditor.prototype.shift = function( x, y ) {
    this.sprite.shift( x, y );
    this.sprite.repaint();
    this.changed();
}

SpriteEditor.prototype.setColor = function( color ) {
    this.color = color;
    this.changed();
}

/**
 * Clear all pixels
 * 
 */
SpriteEditor.prototype.clear = function() {
    this.sprite.clear();
    this.sprite.repaint();
    this.changed();
}

SpriteEditor.prototype.changed = function() {
    this.persistence.change();
    this.persistence.save();
}

/**
 * Set callback for afterSave event
 * 
 */
SpriteEditor.prototype.setAfterSave = function( afterSave ) {
    this.afterSave = afterSave;
}

/**
 * Create json from data model
 * 
 */
SpriteEditor.prototype.getModel = function() {
    return data = {
        color: this.color,
        pixels: this.sprite.pixels
    };
}

/**
 * Create json from data model
 * 
 */
SpriteEditor.prototype.setModel = function( model ) {
    this.color = model.color || 'red';
    this.sprite.pixels = model.pixels ? model.pixels : this.sprite.pixels;
    this.sprite.repaint();
}


SpriteEditor.prototype.undo = function( model ) {
    this.persistence.undo();
    this.persistence.save();
}

SpriteEditor.prototype.redo = function( model ) {
    this.persistence.redo();
    this.persistence.save();
}
