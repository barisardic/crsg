//import range
var Range = ace.require("ace/range").Range;

var $item = $('.carousel-item'); 
var $wHeight = $(window).height();
$item.eq(0).addClass('active');
$item.height($wHeight); 
$item.addClass('full-screen');

$('.carousel img').each(function() {
  var $src = $(this).attr('src');
  var $color = $(this).attr('data-color');
  $(this).parent().css({
    'background-image' : 'url(' + $src + ')',
    'background-color' : $color
  });
  $(this).remove();
});

$(window).on('resize', function (){
  $wHeight = $(window).height();
  $item.height($wHeight);
});

$('.carousel').carousel({
  interval: false,
  pause: "false"
});
var editor = ace.edit("editor");
editor.session.setMode("ace/mode/java");
editor.setReadOnly(true);
editor.setTheme("ace/theme/dracula2");
//line marker functionality
var rng = new Range(3,0,4,0);
editor.session.addMarker(rng,"ace_step","screen",false);
////////
var editor2 = ace.edit("editor2");
editor2.session.setMode("ace/mode/java");
editor2.setReadOnly(true);
editor2.setTheme("ace/theme/dracula2");
//line marker functionality
var rng = new Range(3,0,4,0);
editor2.session.addMarker(rng,"ace_step","screen",false);
//////
var editor3 = ace.edit("editor3");
editor3.session.setMode("ace/mode/java");
editor3.setReadOnly(true);
editor3.setTheme("ace/theme/dracula2");
//line marker functionality
var rng = new Range(3,0,4,0);
editor3.session.addMarker(rng,"ace_step","screen",false);

//button listener
document.getElementById("editorBtn").addEventListener("click",editorBtnPressed,false);
function editorBtnPressed(){
  alert("im here!");
}
document.getElementById("editorBtn2").addEventListener("click",editorBtnPressed2,false);
function editorBtnPressed2(){
  alert("im here too!");
}