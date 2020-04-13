//import range
var Range = ace.require("ace/range").Range;

var $item = $('.carousel-item');
var $wHeight = $(window).height();
$item.eq(0).addClass('active');
$item.height($wHeight);
$item.addClass('full-screen');

$('.carousel img').each(function () {
  var $src = $(this).attr('src');
  var $color = $(this).attr('data-color');
  $(this).parent().css({
    'background-image': 'url(' + $src + ')',
    'background-color': $color
  });
  $(this).remove();
});

$(window).on('resize', function () {
  $wHeight = $(window).height();
  $item.height($wHeight);
});

$('.carousel').carousel({
  interval: false,
  pause: "false"
});
// back button as a single listener
//document.getElementById("backBtn").addEventListener("click", goBack, false);
// since we have many back buttons lets do it via "event bubling"
$("button").on("click", function(event) {
  if($(this).hasClass('backBtn')){
    goBack();
  }
});

function goBack() {
  window.location.href = "/main.html";
}

//
///// tutorial 1
var editor = ace.edit("editor");
editor.session.setMode("ace/mode/java");
editor.setReadOnly(true);
editor.setTheme("ace/theme/dracula2");
//line marker functionality

//////// tutorial 2
var editor2 = ace.edit("editor2");
editor2.session.setMode("ace/mode/java");
editor2.setReadOnly(true);
editor2.setTheme("ace/theme/dracula2");

////// tutorial 3
var editor3 = ace.edit("editor3");
editor3.session.setMode("ace/mode/java");
editor3.setReadOnly(true);
editor3.setTheme("ace/theme/dracula2");

////// tutorial 4
var editor4 = ace.edit("editor4");
editor4.session.setMode("ace/mode/java");
editor4.setReadOnly(true);
editor4.setTheme("ace/theme/dracula2");

////// tutorial 5
var editor5 = ace.edit("editor5");
editor5.session.setMode("ace/mode/java");
editor5.setReadOnly(true);
editor5.setTheme("ace/theme/dracula2");

////// tutorial 6
var editor6 = ace.edit("editor6");
editor6.session.setMode("ace/mode/java");
editor6.setReadOnly(true);
editor6.setTheme("ace/theme/dracula2");

////// tutorial 7
var editor7 = ace.edit("editor7");
editor7.session.setMode("ace/mode/java");
editor7.setReadOnly(true);
editor7.setTheme("ace/theme/dracula2");

////// tutorial 8
var editor8 = ace.edit("editor8");
editor8.session.setMode("ace/mode/java");
editor8.setReadOnly(true);
editor8.setTheme("ace/theme/dracula2");
//
//button listeners
// 1
document.getElementById("editorBtn").addEventListener("click", editorBtnPressed, false);

function editorBtnPressed() {
  var rng = new Range(3, 0, 4, 0);
  editor.session.addMarker(rng, "ace_step", "screen", false);

  var newText = "        return n2;\n";
  editor.session.replace(rng, newText);
  document.getElementById("editorBtn").disabled = true;
}
// 2
document.getElementById("editorBtn2").addEventListener("click", editorBtnPressed2, false);

function editorBtnPressed2() {
  var rng = new Range(5, 0, 6, 0);
  editor2.session.addMarker(rng, "ace_step", "screen", false);

  var newText = "";
  editor2.session.replace(rng, newText);
  document.getElementById("editorBtn2").disabled = true;
}
// 3
document.getElementById("editorBtn3").addEventListener("click", editorBtnPressed3, false);

function editorBtnPressed3() {
  var rng = new Range(4, 0, 6, 0);
  editor3.session.addMarker(rng, "ace_step", "screen", false);

  var newText = "";
  editor3.session.replace(rng, newText);
  document.getElementById("editorBtn3").disabled = true;
}
// 4
document.getElementById("editorBtn4").addEventListener("click", editorBtnPressed4, false);

function editorBtnPressed4() {
  var rng = new Range(2, 0, 3, 0);
  editor4.session.addMarker(new Range(3, 0, 4, 0), "ace_step", "screen", false);

  var newText = "    if (n.length() > MAX_PASSWORD_SIZE)\n";
  editor4.session.replace(rng, newText);

  var rng2 = new Range(1, 0, 2, 0);
  editor4.session.addMarker(rng2, "ace_step", "screen", false);

  var newText2 = "public static final int MAX_PASSWORD_SIZE = 7;\npublic static boolean checkPasswordLength(string n){)\n";
  editor4.session.replace(rng2, newText2);
  document.getElementById("editorBtn4").disabled = true;
}
// 5
document.getElementById("editorBtn5").addEventListener("click", editorBtnPressed5, false);

function editorBtnPressed5() {
  var rng = new Range(2, 0, 3, 0);
  editor5.session.addMarker(rng, "ace_step", "screen", false);

  var newText = "    Date dateOfBirth;\n";
  editor5.session.replace(rng, newText);
  document.getElementById("editorBtn5").disabled = true;
}
// 6
document.getElementById("editorBtn6").addEventListener("click", editorBtnPressed6, false);

function editorBtnPressed6() {
  var rng = new Range(1, 0, 19, 0);//the whole function maaaan
  editor6.session.addMarker(rng, "ace_step", "screen", false);

  var newText = "public String readFile(File f) throws IOException{\n    StringBuilder sb = new StringBuilder();\n    readFileHelper(f, sb);//a code segment that can throw an IO exception\n    return sb.toString();\n}\n";
  editor6.session.replace(rng, newText);
  document.getElementById("editorBtn6").disabled = true;
}
// 7
document.getElementById("editorBtn7").addEventListener("click", editorBtnPressed7, false);

function editorBtnPressed7() {
  var rng = new Range(1, 0, 2, 0);
  editor7.session.addMarker(rng, "ace_step", "screen", false);

  var newText = "void compute(int n1){\n";
  editor7.session.replace(rng, newText);
  document.getElementById("editorBtn7").disabled = true;
}
// 8
document.getElementById("editorBtn8").addEventListener("click", editorBtnPressed8, false);

function editorBtnPressed8() {
  var rng = new Range(1, 0, 2, 0);
  editor8.session.addMarker(rng, "ace_step", "screen", false);

  var newText = "public static boolean isFive(int n1){\n";
  editor8.session.replace(rng, newText);
  document.getElementById("editorBtn8").disabled = true;
}