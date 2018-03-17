/**
 * Class stub
 * 
 */
(function() {

    var Stub = function( parameters, config ) {

        var me = this;
        me.config = new Config( config, { /* defaultParameters */ } );

        me.f = function() {
            var me = this;
            // ...
            return 0;
        };
        
        // late constructor code
        // ...

    };


    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
        module.exports = Stub;
    else
        window.Stub = Stub;

})();


