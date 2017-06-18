/**
 * A sprite editor lets you click on pixels to modify them
 * 
 * @param {*} config 
 */
function ColorPicker( config ) {

    let me = this;

    me.el = typeof config.el == 'string' ? document.getElementById( config.el ) : config.el;
    me.maxWidth = config.maxWidth || 200;
    me.maxHeight = config.maxHeight || 100;
    me.persistenceId = config.persistenceId;
    me.onSelect = config.onSelect;

    me.lastColors = [];
    me.lastColorSpans = [];

    let canvas = document.createElement( 'canvas' );
    canvas.setAttribute( 'id', 'pickerCanvas' );
    me.el.appendChild( canvas );

    me.el.appendChild( document.createElement( 'br' ) );

    me.colorField = document.createElement( 'input' );
    me.colorField.setAttribute( 'id', 'colorField' );
    me.el.appendChild( me.colorField );

    me.el.appendChild( document.createElement( 'br' ) );
    
    for( var i = 0; i < config.historySize; i++ ) {
        let span = document.createElement( 'span' );
        span.setAttribute( 'class', 'historyEntry' );
        span.setAttribute( 'x-index', i );
        span.addEventListener( 'click', function( event ) {
            me.clickHistory( me, event );
        });
        me.el.appendChild( span );
        me.lastColorSpans.push( span );
    }

    me.ctx = canvas.getContext( '2d' );

    canvas.addEventListener( 'click', function( event ) {
        me.doclick( event.offsetX, event.offsetY );
    });

    var imageObj = new Image();
    imageObj.onload = function() {
        me.ctx.drawImage( imageObj, 0, 0 );
    };

    imageObj.src = config.imageUrl;

    var imageObj = new Image();
    imageObj.onload = function() {
        let ctx = canvas.getContext( '2d' );
        canvas.setAttribute( 'width', '' + Math.min( me.maxWidth, imageObj.width ) );
        canvas.setAttribute( 'height', '' + Math.min( me.maxHeight, imageObj.height ) );
        ctx.drawImage( imageObj, 0, 0 );
    };

    imageObj.src = config.imageUrl;

    me.load();
    me.selectColor( me.lastColors[ 0 ] );
    me.paintColorHistory();

}

ColorPicker.prototype.clickHistory = function( me, event ) {
    let index = parseInt( event.srcElement.getAttribute( 'x-index' ) );
    me.selectColor( me.lastColors[ index ] );
}

ColorPicker.prototype.doclick = function( x, y ) {
    let me = this;
    var p = me.ctx.getImageData(x, y, 1, 1).data; 
    var hex = "#" + ( ("000000" + me.rgbToHex(p[0], p[1], p[2])).slice(-6) ).toUpperCase();
    me.selectColor( hex );
}

ColorPicker.prototype.selectColor = function( hex ) {
    let me = this;
    me.colorField.style = 'background-color: ' + hex;
    me.colorField.value = hex;
    if( me.lastColors.findIndex( function( c ) { 
        return c == hex;
    } ) == -1 ) {
        me.lastColors.unshift( hex );
        me.lastColors.pop;
        me.paintColorHistory();
        me.save();
    }
    if( me.onSelect ) {
        me.onSelect( hex );
    }
}

ColorPicker.prototype.rgbToHex = function(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

ColorPicker.prototype.paintColorHistory = function() {
    let me = this;
    for( var i = 0; i < me.lastColorSpans.length && i < me.lastColors.length; i++ ) {
        me.lastColorSpans[ i ].setAttribute( 'style', 'background-color: ' + me.lastColors[ i ] );
    }
}

/**
 * Save data to local storage
 * 
 */
ColorPicker.prototype.save = function() {
    let me = this;
    if( me.persistenceId ) {
        let data = {
            lastColors: me.lastColors
        };
        let serialized = JSON.stringify( data );
        window.localStorage.setItem( me.persistenceId, serialized );
    }
}

/**
 * Load data from local storage
 * 
 */
ColorPicker.prototype.load = function() {
    let me = this;
    if( me.persistenceId ) {
        try {
            let stored = window.localStorage.getItem( me.persistenceId );
            if( stored ) {
                let loaded = JSON.parse( stored );
                if( loaded ) {
                    me.lastColors = loaded.lastColors;
                }
            }
        }
        catch( e ) {
            console.log( e );
        }
    }    
}


