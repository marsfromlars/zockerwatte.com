/**
 * Handle persistence and undo for a set of data
 * 
 * @param {*} config 
 */
function Persistence( config ) {

    let me = this;

    if( !config.persistenceId ) throw "Need persistenceId";

    me.persistenceId = config.persistenceId;
    me.getModel = config.getModel;
    me.setModel = config.setModel;
    me.maxHistory = config.maxHistory || 1000;
    me.localStorage = config.localStorage || window.localStorage;

    me.history = [];
    me.index = -1;

    me.load();

}

Persistence.prototype.save = function() {
    let me = this;
    let model = me.getModel();
    let serialized = JSON.stringify( model );
    me.localStorage.setItem( me.persistenceId, serialized );
}

Persistence.prototype.download = function() {
    let me = this;
    let model = me.getModel();
    let serialized = JSON.stringify( model );
    
}

Persistence.prototype.load = function() {
    let me = this;
    try {
        let loaded = me.localStorage.getItem( me.persistenceId );
        if( loaded ) {
            me.setModel( JSON.parse( loaded ) );
        }
    }
    catch( ex ) {
        console.log( ex );
    }
}

Persistence.prototype.change = function() {
    let me = this;
    let serialized = JSON.stringify( me.getModel() );
    let last = me.history[ me.history.length - 1 ];
    if( last != serialized ) {
        me.history.push( serialized );
        me.index = me.history.length - 1;
    }
}

Persistence.prototype.undo = function() {
    let me = this;
    if( me.history.length > 0 && me.index > 0 ) {
        me.index--;
        let json = JSON.parse( me.history[ me.index ] );
        me.setModel( json );
    }
}

Persistence.prototype.redo = function() {
    let me = this;
    if( me.history.length > 0 && me.index < me.history.length -1 ) {
        me.index++;
        let json = JSON.parse( me.history[ me.index ] );
        me.setModel( json );
    }
}

exports.Persistence = Persistence;

