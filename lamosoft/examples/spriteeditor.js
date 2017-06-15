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

    var me = this;
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
}

SpriteEditor.prototype.shift = function( x, y ) {
    this.sprite.shift( x, y );
    this.sprite.repaint();
}

