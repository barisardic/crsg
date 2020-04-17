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

////// tutorial 9
var editor9 = ace.edit("editor9");
editor9.session.setMode("ace/mode/java");
editor9.setReadOnly(true);
editor9.setTheme("ace/theme/dracula2");

////// tutorial 10
var editor10 = ace.edit("editor10");
editor10.session.setMode("ace/mode/java");
editor10.setReadOnly(true);
editor10.setTheme("ace/theme/dracula2");
//
//button listeners
var editorBtnPressedList = [0,0,0,0,0,0,0,0,0,0];

// 1
document.getElementById("editorBtn").addEventListener("click", editorBtnPressed, false);

function editorBtnPressed() {
if(editorBtnPressedList[0] == 0){
  var rng = new Range(3, 0, 4, 0);
  markerID = editor.session.addMarker(rng, "ace_step", "screen", false);
  var newText = "        return n2;\n";
  editor.session.replace(rng, newText);
  document.getElementById("editorBtnText").innerText = "SHOW THE DEFECT";
  editorBtnPressedList[0] = 1;
}
else{
    editor.undo();
    editor.session.removeMarker(markerID);
    document.getElementById("editorBtnText").innerText = "SHOW THE SOLUTION";
    editorBtnPressedList[0] = 0;
}
  
}
// 2
document.getElementById("editorBtn2").addEventListener("click", editorBtnPressed2, false);

function editorBtnPressed2() {
    if(editorBtnPressedList[1] == 0){
        var rng = new Range(5, 0, 6, 0);
        markerID= editor2.session.addMarker(rng, "ace_step", "screen", false);
        //alert("if"+markerID);
        var newText = "";
        editor2.session.replace(rng, newText);
        document.getElementById("editorBtnText2").innerText = "SHOW THE DEFECT";
        editorBtnPressedList[1] = 1;
    }
    else{
        //alert("else"+markerID);
        editor2.undo();
        editor2.session.removeMarker(markerID);
        document.getElementById("editorBtnText2").innerText = "SHOW THE SOLUTION";
        editorBtnPressedList[1] = 0;
    }
  
}
// 3
document.getElementById("editorBtn3").addEventListener("click", editorBtnPressed3, false);

function editorBtnPressed3() {
    if(editorBtnPressedList[2] == 0){
        var rng = new Range(4, 0, 6, 0);
        markerID = editor3.session.addMarker(rng, "ace_step", "screen", false);

        var newText = "\n \n";
        editor3.session.replace(rng, newText);
        document.getElementById("editorBtnText3").innerText = "SHOW THE DEFECT";
        editorBtnPressedList[2] = 1;
    }
    else{
        editor3.undo();
        editor3.session.removeMarker(markerID);
        document.getElementById("editorBtnText3").innerText = "SHOW THE SOLUTION";
        editorBtnPressedList[2] = 0;
    }
  
}
// 4
document.getElementById("editorBtn4").addEventListener("click", editorBtnPressed4, false);

function editorBtnPressed4() {
    if(editorBtnPressedList[3] == 0){
        var rng = new Range(2, 0, 3, 0);
        markerID = editor4.session.addMarker(new Range(3, 0, 4, 0), "ace_step", "screen", false);

        var newText = "    if (n.length() > MAX_PASSWORD_SIZE)\n";
        editor4.session.replace(rng, newText);

        var rng2 = new Range(1, 0, 2, 0);
        markerID2 = editor4.session.addMarker(rng2, "ace_step", "screen", false);

        var newText2 = "public static final int MAX_PASSWORD_SIZE = 7;\npublic static boolean checkPasswordLength(string n){)\n";
        editor4.session.replace(rng2, newText2);
        document.getElementById("editorBtnText4").innerText = "SHOW THE DEFECT";
        editorBtnPressedList[3] = 1;
    }else{
        editor4.undo();
        editor4.session.removeMarker(markerID);
        editor4.undo();
        editor4.session.removeMarker(markerID2);
        document.getElementById("editorBtnText4").innerText = "SHOW THE SOLUTION";
        editorBtnPressedList[3] = 0;
    }
  
}
// 5
document.getElementById("editorBtn5").addEventListener("click", editorBtnPressed5, false);

function editorBtnPressed5() {
    if(editorBtnPressedList[4] == 0){
        var rng = new Range(2, 0, 3, 0);
        markerID = editor5.session.addMarker(rng, "ace_step", "screen", false);
      
        var newText = "    Date dateOfBirth;\n";
        editor5.session.replace(rng, newText);
        document.getElementById("editorBtnText5").innerText = "SHOW THE DEFECT";
        editorBtnPressedList[4] = 1;
    }
    else{
        editor5.undo();
        editor5.session.removeMarker(markerID);
        document.getElementById("editorBtnText5").innerText = "SHOW THE SOLUTION";
        editorBtnPressedList[4] = 0;
    }
  
}
// 6
document.getElementById("editorBtn6").addEventListener("click", editorBtnPressed6, false);

function editorBtnPressed6() {
    if(editorBtnPressedList[5] == 0){
        var rng = new Range(1, 0, 19, 0);//the whole function maaaan
        markerID = editor6.session.addMarker(rng, "ace_step", "screen", false);
      
        var newText = "public String readFile(File f) throws IOException{\n    StringBuilder sb = new StringBuilder();\n    readFileHelper(f, sb);//a code segment that can throw an IO exception\n    return sb.toString();\n}\n";
        editor6.session.replace(rng, newText);
        document.getElementById("editorBtnText6").innerText = "SHOW THE DEFECT";
        editorBtnPressedList[5] = 1;
    }else{
        editor6.undo();
        editor6.session.removeMarker(markerID);
        document.getElementById("editorBtnText6").innerText = "SHOW THE SOLUTION";
        editorBtnPressedList[5] = 0;
    }
  
}
// 7
document.getElementById("editorBtn7").addEventListener("click", editorBtnPressed7, false);

function editorBtnPressed7() {
    if(editorBtnPressedList[6] == 0){
        var rng = new Range(1, 0, 2, 0);
        markerID = editor7.session.addMarker(rng, "ace_step", "screen", false);
      
        var newText = "void compute(int n1){\n";
        editor7.session.replace(rng, newText);
        document.getElementById("editorBtnText7").innerText = "SHOW THE DEFECT";
        editorBtnPressedList[6] = 1;
    }
    else{
        editor7.undo();
        editor7.session.removeMarker(markerID);
        document.getElementById("editorBtnText7").innerText = "SHOW THE SOLUTION";
        editorBtnPressedList[6] = 0;
    }
  
}
// 8
document.getElementById("editorBtn8").addEventListener("click", editorBtnPressed8, false);

function editorBtnPressed8() {
  var rng = new Range(1, 0, 2, 0);
  if(editorBtnPressedList[7] == 0){
    markerID = editor8.session.addMarker(rng, "ace_step", "screen", false);

    var newText = "public static boolean isFive(int n1){\n";
    editor8.session.replace(rng, newText);
    document.getElementById("editorBtnText8").innerText = "SHOW THE DEFECT";
    editorBtnPressedList[7] = 1;
  }
  else{
    editor8.undo();
    editor8.session.removeMarker(markerID);
    document.getElementById("editorBtnText8").innerText = "SHOW THE SOLUTION";
    editorBtnPressedList[7] = 0;
  }
  
}
// 9
document.getElementById("editorBtn9").addEventListener("click", editorBtnPressed9, false);

function editorBtnPressed9() {
    if(editorBtnPressedList[8] == 0){
        var rng = new Range(3, 0, 4, 0);
        markerID = editor9.session.addMarker(rng, "ace_step", "screen", false);
      
        var newText = "if (firstName != null && firstName.equals(lastName)) {\n";
        editor9.session.replace(rng, newText);
        document.getElementById("editorBtnText9").innerText = "SHOW THE DEFECT";
        editorBtnPressedList[8] = 1;
    }
    else{
    editor9.undo();
    editor9.session.removeMarker(markerID);
    document.getElementById("editorBtnText9").innerText = "SHOW THE SOLUTION";
    editorBtnPressedList[8] = 0;
    }
  
}
// 10
document.getElementById("editorBtn10").addEventListener("click", editorBtnPressed10, false);

function editorBtnPressed10() {
    if(editorBtnPressedList[9] == 0){
        var rng = new Range(0, 0, 1, 0);
        markerID = editor10.session.addMarker(rng, "ace_step", "screen", false);
        var newText = "for (i = 0; i < 10; i++, j++) {\n";

        var rng2 = new Range(2, 0, 3, 0);
        var newText2 = "\n";

        editor10.session.replace(rng, newText);
        editor10.session.replace(rng2, newText2);
        document.getElementById("editorBtnText10").innerText = "SHOW THE DEFECT";
        editorBtnPressedList[9] = 1;
    }
    else{
        editor10.undo();
        editor10.undo();
        editor10.session.removeMarker(markerID);
        document.getElementById("editorBtnText10").innerText = "SHOW THE SOLUTION";
        editorBtnPressedList[9] = 0;
    }
  
}