/** Objects **/
var
$w = window,
$n = navigator,
$d = document,
$r = $d.documentElement,
$h = $("head")[0],
$b = $("body")[0];

/** Functions **/

// DOM selector
function $(query){
  if(query[0] == "#"){
    return $d.getElementById(query.substr(1));
  }
  else if(query[0] == "."){
    return $d.getElementsByClassName(query.substr(1));
  }
  else{
    return $d.getElementsByTagName(query);
  }
}

// event handlers
function on(element, event, func){
  if(element.addEventListener){
    element.addEventListener(event, func, false);
  }
  else{
    element.attachEvent("on" + event, func);
  }
}

function off(element, event, func){
  if(element.removeEventListener){
    element.removeEventListener(event, func);
  }
  else{
    element.detachEvent("on" + event, func);
  }
}

// CSS getter and setter
function css(element, prop, value){
  if(value){
    element.style[prop] = value;
  }
  else{
    return $w.getComputedStyle(element).getPropertyValue(prop);
  }
}