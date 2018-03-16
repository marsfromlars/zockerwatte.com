(function() {

    var Config = function( config, defaults ) {

        var me = this;

        defaults = defaults || {};

        if( config ) {
            for( var parameter in config ) {
                me[ parameter ] = config[ parameter ] || defaults[ parameter ];
            }
        }

        if( defaults ) {
            for( var defaultParameter in defaults ) {
                if( !me[ defaultParameter ] ) {
                    me[ defaultParameter ] = defaults[ defaultParameter ];
                }
            }
        }

    };

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
        module.exports = Config;
    else
        window.Config = Config;

})();
