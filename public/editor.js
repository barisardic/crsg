
levelChosen = 2;
if(levelChosen==1){
  document.getElementById("editor").style.display = "block";
  var editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/java");
  editor.setReadOnly(true); 
}
else if(levelChosen ==2){
  document.getElementById("editor2").style.display = "block";
  var code = document.querySelector("editor2");

  var editor = ace.edit("editor2");
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/javascript");
  editor.setReadOnly(true); 
  
}
// custom error object for user to select/save the errors in the code.
class Err {
  constructor(start, end) {
    this.start = start;
    this.end = end;
    this.reason = "reason1";
  }
  get start(){
    return this._start;
  }
  get end(){
    return this._end;
  }
  get reason(){
    return this._reason;
  }
  set start(value){
    this._start = value;
  }
  set end(value){
    this._end = value;
  }
  set reason(value){
    this._reason = value;
  } 
}
var ListofErrors = [];
document.addEventListener('DOMContentLoaded', lines, false);
function lines(){
  function getLines () {
    selectionRange = editor.getSelectionRange();
    startLine = selectionRange.start.row;
    endLine = selectionRange.end.row;
    alert("starts at : "+startLine+ "ends at : "+ endLine );
    content = editor.session.getTextRange(selectionRange);
    var selection = new Err(startLine,endLine);
    ListofErrors.push(selection);
    alert(ListofErrors.length);
    addComponent(ListofErrors);

  }
  document.getElementById('hover').addEventListener('click', getLines, false);
};

/* function getLines(){
  /* selectionRange = editor.getSelectionRange();

  startLine = selectionRange.start.row;
  endLine = selectionRange.end.row;

  content = editor.session.getTextRange(selectionRange); */

//editor.setValue(code,-1); 


/*  var codeRef = firebase.database().ref('/code1');
codeRef.on('value', function(snapshot) {
  var code = snapshot.val();
}); 
alert("nana"+code); */
function addComponent (ListofErrors)
            {
              var list = document.querySelector('.marketing-content-list');
              var mc = document.querySelector('.marketing-content-hidden');
              var newNode = mc.cloneNode(true);
              var index = ListofErrors.length;
              var e = ListofErrors[index-1];
              newNode.childNodes[1].innerHTML = "Error "+index+": between"+e.start+"-"+e.end; 
              newNode.style.display = "flex";

              reasons = newNode.querySelector(".marketing-content-buttons").querySelector(".select2-field").querySelector(".select2");
              reasons.setAttribute("id",index);
              reasons.addEventListener("change", reasonChanged);
              list.insertBefore(newNode, mc);
              componentHandler.upgradeDom();
              alert();
              
            }
function reasonChanged(){
 // e.reason = this.options[this.selectedIndex].text;
  alert(this.id+" "+this.options[this.selectedIndex].text);
//this.id
  index = this.id;
  ListofErrors[index-1].reason= this.options[this.selectedIndex].text; 
  //alert(ListofErrors[index-1].reason);
  alert("The selection reason is now:"+ListofErrors[index-1].reason);
}