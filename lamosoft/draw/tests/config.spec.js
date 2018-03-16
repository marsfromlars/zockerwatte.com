const Config = require('../config');

test( 'only in data', () => {
    expect( new Config( { w: 10 }, {} ).w ).toBe( 10 );
});

test( 'only in defaults', () => {
    expect( new Config( {}, { w: 10 } ).w ).toBe( 10 );
});

test( 'data overrides defaults', () => {
    expect( new Config( { w:10 }, { w: 12 } ).w ).toBe( 10 );
});

test( 'nowhere defined', () => {
    expect( new Config( {}, {} ).w ).toBe( undefined );
});

test( 'no defaults object', () => {
    expect( new Config( { w: 10 } ).w ).toBe( 10 );
});

test( 'no data object', () => {
    expect( new Config( null, { w: 10 } ).w ).toBe( 10 );
});



