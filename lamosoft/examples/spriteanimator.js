/**
 * A sprite animator allows to select from a list of sprites
 * 
 * @param {*} config 
 */
function SpriteAnimator( config ) {
    this.el = typeof config.el == 'string' ? document.getElementById( config.el ) : config.el;
    this.count = config.count ? config.count : 32;
    this.rows = config.rows || 16;
    this.cols = config.cols || 16;
    this.pixelWidth = config.pixelWidth ? config.pixelWidth : 2;
    this.pixelHeight = config.pixelHeight ? config.pixelHeight : 2;

    while( this.el.firstChild ) {
        this.el.removeChild( this.el.firstChild );
    }

    for( var i = 0; i < this.count; i++ ) {
        let canvas = document.createElement( 'canvas' );
        canvas.setAttribute( 'width', '' + ( this.pixelWidth * this.cols ) );
        canvas.setAttribute( 'height', '' + ( this.pixelHeight * this.rows ) );
        this.el.appendChild( canvas );
    }

}

SpriteEditor.prototype.doclick = function( x, y ) {
}




