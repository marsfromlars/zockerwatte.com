/**
 * A sprite animator allows to select from a list of sprites
 * 
 * @param {*} config 
 */
function SpriteAnimator( config ) {
    this.el = config.el;
    this.count = config.count ? config.count : 8;
    this.rows = config.rows || 8;
    this.cols = config.cols || 8;
    this.pixelWidth = config.pixelWidth ? config.pixelWidth : 1;
    this.pixelHeight = config.pixelHeight ? config.pixelHeight : 1;

    while( this.el.firstChild ) {
        this.el.removeChild( this.el.firstChild );
    }
}

SpriteEditor.prototype.doclick = function( x, y ) {
}




