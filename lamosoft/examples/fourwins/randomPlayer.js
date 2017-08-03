function randomPlayer () {
    
    
    
}
randomPlayer.prototype.makeMove = function (fw) {
    
    var c = Math.floor((Math.random() * 7) );
    fw.drop(c);
    
}