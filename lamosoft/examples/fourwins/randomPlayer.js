function randomPlayer () {
    
    
    
}
randomPlayer.prototype.makeMove = function (fw) {
    
    var c = Math.floor((Math.random() * 7) );
    while (true) {
        if ( !fw.getColor(c, 5)) {
            fw.drop(c); 
            break;
        }
        c = Math.floor((Math.random() * 7) );
    }
    
}