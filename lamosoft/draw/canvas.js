var Canvas = function( ref ) {

    var me = this;
    me.el = typeof ref == 'string' ? document.getElementById( ref ) : ref;
    me.ctx = me.el.getContext( '2d' );
    me.callbacks = {};
    me.config = {
        clear: false,
        color: 'black',
        width: 1
    }

    me.setMode = function( config ) {
        var me = this;
        var c = me.config;
        c.clear = config.clear != undefined ? config.clear : c.clear;
        c.color = config.color || c.color;
        c.width = config.width || c.width;
    }

    me.setClear = function( clear ) {
        me.setMode( { clear: clear } );
    }

    me.setColor = function( color ) {
        me.setMode( { color: color } );
    }

    me.setWidth = function( width ) {
        me.setMode( { width: width } );
    }

    me.line = function( x1, y1, x2, y2 ) {
        var me = this;
        me.ctx.moveTo( x1, y1 );
        me.ctx.lineTo( x2, y2 );
        me.ctx.stroke();
    }

    me.rect = function( x, y, w, h ) {
        var me = this;
        me.ctx.fillStyle = me.config.color;
        me.ctx.fillRect( x, y, w, h );
    }

    me.clear = function( x, y, w, h ) {
        var me = this;
        x = x || 0;
        y = y || 0;
        w = w || me.el.width;
        h = h || me.el.height;
        me.ctx.clearRect( x, y, w, h );
    }

    me.circle = function( x, y, r ) {
        var me = this;
        me.ctx.save();
        me.ctx.strokeStyle = me.config.color;
        me.ctx.lineWidth = me.config.width;
        me.ctx.beginPath();
        me.ctx.arc( x, y, r, 0, 2 * Math.PI );
        me.ctx.stroke();
        me.ctx.restore();
    }

    me.pie = function( x, y, r, start, end ) {
        var me = this;

        me.ctx.save();

        if( me.config.clear ) {
            me.ctx.globalCompositeOperation = 'destination-out';
        }

        me.ctx.fillStyle = me.config.color;

        start = start ? ( start / 360 ) * 2 * Math.PI : 0;
        end = end ? ( end / 360 ) * 2 * Math.PI : 2 * Math.PI;
        me.ctx.beginPath();
        me.ctx.moveTo( x, y );
        me.ctx.arc( x, y, r, start, end );
        me.ctx.closePath();
        me.ctx.fill();
        
        me.ctx.restore();

    }

    me.callback = function( eventName, callback ) {

        var me = this;
        me.callbacks[ eventName ] = callback;
        
        me.el.addEventListener( eventName, function( event ) {
            let x = event.offsetX;
            let y = event.offsetY;
            me.callbacks[ eventName ]( x, y );
        });

    }

}

