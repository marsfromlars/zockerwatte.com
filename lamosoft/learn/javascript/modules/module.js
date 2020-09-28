function isEmpty( s ) {
  if( s == null || s == undefined ) {
    return true;
  }
  if( s.trim().length == 0 ) {
    return true;
  }
}

const EMPTY_STRING = "";

export { isEmpty, EMPTY_STRING };

