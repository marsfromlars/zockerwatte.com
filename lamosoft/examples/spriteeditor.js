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
        me.doclick( me.sprite.x2col( event.offsetX ), me.sprite.y2row( event.offsetY ) );
    });
    document.body.addEventListener( 'mousedown', function( event ) {
        me.pendown = true;
    });
    document.body.addEventListener( 'mouseup', function( event ) {
        me.pendown = false;
    });
    this.el.addEventListener( 'mousemove', function( event ) {
        if( me.pendown ) {
            me.doclick( me.sprite.x2col( event.offsetX ), me.sprite.y2row( event.offsetY ) );
        }
    });
}

SpriteEditor.prototype.doclick = function( x, y ) {
    this.sprite.set( x, y, this.color );
    this.sprite.repaint();
}



