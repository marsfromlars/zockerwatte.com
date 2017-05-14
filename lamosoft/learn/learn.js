// - HELLO WORLD -----------------------------------------------------------
learnJavascript = function() {
    console.log( "Hello World." );
}
learnJavascript();

// - ARROW FUNCTION -----------------------------------------------------------
learnArrowFunction = function() {
    return double = (a) => { 
        return 2 * a 
    }
    // will be used later in this module
}

// - ITERATE ARRAY -----------------------------------------------------------
learnIterateArray = function( arr ) {
    console.log( 'learnIterateArray' )
    for( i in arr ) {
        console.log( i + ': ' + arr[ i ] )
    }
}
learnIterateArray( [ 'A', 'B', 'C' ] );

learnIterateArray2 = function( arr ) {
    console.log( 'learnIterateArray2' )
    for( let i = 0; i < arr.length; i++ ) {
        console.log( i + ': ' + arr[ i ] )
    }
}
learnIterateArray2( [ 'A', 'B', 'C' ] );

learnIterateArray3 = function() {
    console.log( 'learnIterateArray3' )
    let map = function( arr, fun ) {
        let r = []
        for( i in arr ) {
            r.push( fun( arr[i] ) )
        }
        return r
    }
    var doubling = learnArrowFunction()
    var a = [ 2, 4, 6, 8 ];
    console.log( a + ' > ' + map( a, doubling ) );
}
learnIterateArray3();

// - ITERATE OBJECT -----------------------------------------------------------
leaernIterateObject = function() {
    console.log( 'leaernIterateObject' )
    let o = { 'a': 1, 'b': 2, 'c': 3 };
    for( key in o ) {
        console.log( key + ' = ' + o[ key ] )
    }
}
leaernIterateObject();

// - MAP REDUCE FILTER -----------------------------------------------------------
learnMap = function() {
    console.log( 'learnMap' )
    let pow2 = (elem,index,array) => { return Math.pow( elem, 2 ) }
    let arr = [ 1, 2, 3, 4 ]
    console.log( arr )
    console.log( 'pow2 ' + arr.map( pow2 ) )
}
learnMap();

learnReduce = function() {
    console.log( 'learnReduce' )
    let sum = ( accumulated, elem ) => { return accumulated + elem }
    let arr = [ 1, 2, 3, 4, 5, 6, 7 ] 
    console.log( arr )
    console.log( 'sum ' + arr.reduce( sum ) )
}
learnReduce();

learnFilter = function() {
    console.log( 'learnFilter' )
    let even = ( elem, index, array ) => { return elem % 2 == 0 }
    let arr = [ 1, 2, 3, 4, 5, 6, 7 ] 
    console.log( arr )
    console.log( 'even ' + arr.filter( even ) )
}
learnFilter();

