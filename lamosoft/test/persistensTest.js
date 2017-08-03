var test = require('tape');
var persistence = require('../examples/persistence.js');

var LocalStorage = require('node-localstorage').LocalStorage;
var nodeLocalStorage = new LocalStorage('./scratch');

var model = {}
var model1 = {}

test( 'persistence', function (t) {
    
    var p = new persistence.Persistence({
        localStorage: nodeLocalStorage,
        persistenceId: 'test',
        getModel: function() { return model; },
        setModel: function( m ) { model = m }
    });
    
    model.name = 'C64';
    model.age = 35;
    p.save();
    
    var p1 = new persistence.Persistence({
        localStorage: nodeLocalStorage,
        persistenceId: 'test',
        getModel: function() { return model1; },
        setModel: function( m ) { model1 = m }
    });

    p.load();
    t.equal( 'C64', model1.name );
    t.equal( 35, model1.age );

    model.name = 'Amiga';
    model.age = 33;

    t.equal( 'C64', model1.name );
    t.equal( 35, model1.age );
    
    p.save();
    p1.load();

    t.equal( 'Amiga', model1.name );
    t.equal( 33, model1.age );

    t.end();

});


test( 'undo history', function (t) {
    
    model.name = 'Amiga';
    model.age = 33;

    var p = new persistence.Persistence({
        localStorage: nodeLocalStorage,
        persistenceId: 'test',
        getModel: function() { return model; },
        setModel: function( m ) { model = m }
    });

    model.name = 'Atari ST';
    p.change();

    t.equal( model.name, 'Atari ST' );
    p.undo();
    t.equal( model.name, 'Amiga' );

    t.end();

});


