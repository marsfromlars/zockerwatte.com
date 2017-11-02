var assertion = function( condition, errorMessage ) {
    var testResults = getTestResults();
    if( !condition ) {
        var p = document.createElement( 'p' );
        p.innerHTML = errorMessage;
        document.body.appendChild( p );
        testResults.errors++;
    }
    testResults.tests++;
}

var assertEquals = function( expected, found ) {
    assertion( expected == found, "Expected: " + expected + " Found: " + found );
}

var printTestResults = function() {
    var testResults = getTestResults();
    var p = document.createElement( 'p' );
    p.innerHTML = 'Tests performed: ' + testResults.tests + '<br>'
        + 'Errors: ' + testResults.errors;
    document.body.appendChild( p );
}

var getTestResults = function() {
    if( !document.testResults ) {
        document.testResults = {
            tests: 0,
            errors: 0
        }
    }
    return document.testResults;
}