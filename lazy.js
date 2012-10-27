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
  if(query.charAt(0) == "#"){
    return $d.getElementById(query.substr(1));
  }
  else if(query.charAt(0) == "."){
    if(document.getElementsByClassName){
      return $d.getElementsByClassName(query.substr(1));
    }
    else{
      var a = [];
      var re = new RegExp('(^| )'+query.substr(1)+'( |$)');
      var els = $("*");
      for(var i=0,j=els.length; i<j; i++)
          if(re.test(els[i].className))a.push(els[i]);
      return a;
    }
  }
  else{
    return $d.getElementsByTagName(query);
  }
}

// DOM remover
function remove(element){
  element.parentNode.removeChild(element);
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
if (!window.getComputedStyle){
  window.getComputedStyle = function(el, pseudo){
    this.el = el;
    this.getPropertyValue = function(prop){
      var re = /(\-([a-z]){1})/g;
      if (prop == 'float'){
        prop = 'styleFloat';
      }
      if (re.test(prop)){
        prop = prop.replace(re, function (){
          return arguments[2].toUpperCase();
        });
      }
      return el.currentStyle[prop] ? el.currentStyle[prop] : null;
    }
    return this;
  }
}

function css(element, prop, value){
  if(value){
    element.style[prop] = value;
  }
  else{
    return $w.getComputedStyle(element).getPropertyValue(prop);
  }
}

// iterator
function isNodeList(nodes){
  var result = Object.prototype.toString.call(nodes);
  if(result === '[object HTMLCollection]' || result === '[object NodeList]'){
    return true;
  }
  if(typeof(nodes) != 'object'){
      return false;
  }
  if(!('length' in nodes) || !('item' in nodes)){
    return false;
  }
  try{
    if(nodes(0) === null || (nodes(0) && nodes(0).tagName)) return true;
  }
  catch(e){
    return false;
  }
  return false;
}

function each(array, func){
  if(isNodeList(array)){
    for(var i = 0; i < array.length; i++){
      func.call(array[i]);
    }
  }
  else{
    func.call(array);
  }
}