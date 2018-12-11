function getOffset( el ) {
  var offsetTop = 0, offsetLeft = 0;
  do {
    if ( !isNaN( el.offsetTop ) ) {
      offsetTop += el.offsetTop;
     }
     if ( !isNaN( el.offsetLeft ) ) {
       offsetLeft += el.offsetLeft;
    }
  } while( el = el.offsetParent ) 
  return {
    top : offsetTop,
    left : offsetLeft
  }
}

export default getOffset