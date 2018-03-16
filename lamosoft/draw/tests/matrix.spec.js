const Matrix = require('../matrix');

test( 'prefill', () => {
    expect( new Matrix( 2, 2 ).get( 0, 0 ) ).toBe( ' ' );
    expect( new Matrix( 2, 2 ).get( 0, 1 ) ).toBe( ' ' );
    expect( new Matrix( 2, 2 ).get( 1, 0 ) ).toBe( ' ' );
    expect( new Matrix( 2, 2 ).get( 1, 1 ) ).toBe( ' ' );

    expect( new Matrix( 2, 2, '.' ).get( 0, 0 ) ).toBe( '.' );
    expect( new Matrix( 2, 2, '.' ).get( 0, 1 ) ).toBe( '.' );
    expect( new Matrix( 2, 2, '.' ).get( 1, 0 ) ).toBe( '.' );
    expect( new Matrix( 2, 2, '.' ).get( 1, 1 ) ).toBe( '.' );
});

test( 'set get', () => {
    var m = new Matrix( 2, 2, '.' );
    m.set( 0, 0, 'A' );
    m.set( 0, 1, 'B' );
    m.set( 1, 0, 'C' );
    m.set( 1, 1, 'D' );
    expect( m.get( 0, 0 ) ).toBe( 'A' );
    expect( m.get( 0, 1 ) ).toBe( 'B' );
    expect( m.get( 1, 0 ) ).toBe( 'C' );
    expect( m.get( 1, 1 ) ).toBe( 'D' );
});


test( 'clear', () => {
    var m = new Matrix( 2, 2, '.' );
    m.set( 0, 0, '*' );
    m.set( 0, 1, '*' );
    m.set( 1, 0, '*' );
    m.set( 1, 1, '*' );
    m.clear();
    expect( m.get( 0, 0 ) ).toBe( '.' );
    expect( m.get( 0, 1 ) ).toBe( '.' );
    expect( m.get( 1, 0 ) ).toBe( '.' );
    expect( m.get( 1, 1 ) ).toBe( '.' );
});



