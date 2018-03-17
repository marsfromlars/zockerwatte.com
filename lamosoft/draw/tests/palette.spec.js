const Palette = require('../palette');

test( 'empty constructor', () => {
    expect( new Palette().get('A') ).toBe( null );
});

test( 'array constructor', () => {
    expect( new Palette(['red','blue']).get('A') ).toBe( 'red' );
});

test( 'object constructor', () => {
    expect( new Palette({'A':'red','B':'blue'}).get('A') ).toBe( 'red' );
});

test( 'broken object constructor', () => {
    expect( () => { new Palette({'*':'red'}) } ).toThrow();
});
