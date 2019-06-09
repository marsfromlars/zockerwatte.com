const Matrix2 = require('../matrix2');
const BitSet = require('bitset');

test( 'prefill', () => {
    expect( new Matrix2( 2, 2 ).get( 0, 0 ) ).toBe( 0 );
    expect( new Matrix2( 2, 2 ).get( 0, 1 ) ).toBe( 0 );
    expect( new Matrix2( 2, 2 ).get( 1, 0 ) ).toBe( 0 );
    expect( new Matrix2( 2, 2 ).get( 1, 1 ) ).toBe( 0 );
});

test( 'set get', () => {
    var m = new Matrix2( 2, 2 );
    m.set( 0, 0, 1 );
    m.set( 0, 1, 2 );
    m.set( 1, 0, 3 );
    m.set( 1, 1, 4 );
    console.log( m.toString() );
    expect( m.get( 0, 0 ) ).toBe( 1 );
    expect( m.get( 0, 1 ) ).toBe( 2 );
    expect( m.get( 1, 0 ) ).toBe( 3 );
    expect( m.get( 1, 1 ) ).toBe( 4 );
});


test( 'clear', () => {
    var m = new Matrix2( 2, 2 );
    m.set( 0, 0, 9 );
    m.set( 0, 1, 9 );
    m.set( 1, 0, 9 );
    m.set( 1, 1, 9 );
    m.clear();
    expect( m.get( 0, 0 ) ).toBe( 0 );
    expect( m.get( 0, 1 ) ).toBe( 0 );
    expect( m.get( 1, 0 ) ).toBe( 0 );
    expect( m.get( 1, 1 ) ).toBe( 0 );
});


test( 'serializeAndParse', () => {
    var m = new Matrix2( 2, 2 );
    m.set( 0, 0, 1 );
    m.set( 1, 0, 2 );
    m.set( 0, 1, 3 );
    var s = m.serialize('1');
    expect( s ).toBe( '1:2:2:ABC_' );

    var m1 = Matrix2.parse( s );
    expect( m1.serialize( '1' ) ).toBe( '1:2:2:ABC_' );
    
});



