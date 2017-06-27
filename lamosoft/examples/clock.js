let clockSpan = document.getElementById( 'clock' );
let format = function( i ) {
    return i < 10 ? '0' + i : '' + i;
}
setInterval( () => {
    let d = new Date();
    clockSpan.innerHTML = format( d.getHours() ) + ":" + format( d.getMinutes() ) 
        + ":" + format( d.getSeconds() );
}, 1000);