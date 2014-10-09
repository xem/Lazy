/** Objects **/

$w = window,
$n = navigator,
$d = document,
$r = $d.documentElement,
$h = $("head")[0],
$b = $("body")[0],

/** Tests **/

// mobile
$m = $n.userAgent.indexOf("mobile") >= 0,

// IE
$ie = $n.appVersion.match(/MSIE ([\d.]+)/);
$ie = $ie ? $ie[1] : 0;

/** Shims **/

// HTML5 elements on IE
'AbbrArticleAsideAudioCanvasDetailsFigureFooterHeaderHgroupMarkMenuMeterNavOutputProgressSectionTimeVideo'.replace(/.[a-z]+/g,function(n){document.createElement(n)})

// getComputedStyle() & getPropertieValue()
if (!$w.getComputedStyle){
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

/** Functions **/

// DOM selector
function $(query){
  if(query.charAt(0) == "#"){
    return $d.getElementById(query.substr(1));
  }
  else if(query.charAt(0) == "."){
    if($d.getElementsByClassName){
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
function css(element, prop, value){
  if(value){
    element.style[prop] = value;
  }
  else{
    return $w.getComputedStyle(element).getPropertyValue(prop);
  }
}

// Iterator
function each(array, func){
  var i, len = array.length;
  for(i = 0; i < len ; i++){
    func.call(array[i]);
  }
}