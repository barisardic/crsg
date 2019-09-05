var originalDom = document.querySelector('.marketing-content-hidden');
var listInner = document.querySelector('.marketing-content-list').innerHTML;
levelChosen = localStorage.getItem('selected');
var Range = ace.require("ace/range").Range;

if(levelChosen==1){
  document.getElementById("editor").style.display = "block";
  var editor = ace.edit("editor");
  var code = document.querySelector("editor");
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/java");
  editor.setReadOnly(true);  
}
else if(levelChosen ==2){
  document.getElementById("editor2").style.display = "block";
  var editor = ace.edit("editor2");
  var code = document.querySelector("editor2");
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/java");
  editor.setReadOnly(true);  
}
else if(levelChosen==3){
  document.getElementById("editor3").style.display = "block";
  var editor = ace.edit("editor3");
  var code = document.querySelector("editor3");
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/java");
  editor.setReadOnly(true);  
}
else if(levelChosen==4){
  document.getElementById("editor4").style.display = "block";
  var editor = ace.edit("editor4");
  var code = document.querySelector("editor4");
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/java");
  editor.setReadOnly(true);  
}
else if(levelChosen==5){
  document.getElementById("editor5").style.display = "block";
  var editor = ace.edit("editor5");
  var code = document.querySelector("editor5");
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/java");
  editor.setReadOnly(true);  
}
else if(levelChosen==6){
  document.getElementById("editor6").style.display = "block";
  var editor = ace.edit("editor6");
  var code = document.querySelector("editor6");
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/java");
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
  toString(){
    return "" + this.start+ "-" + this.end +"-" + this.reason;
  } 
}
var answer1 = new Err(4,4);
answer1.reason = "Comments";

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
function submitSelection () {
  alert(answer1.toString()+"**"+ListofErrors[0].toString());
}
document.getElementById('submitBtn').addEventListener('click',submitSelection,false);
document.addEventListener('click', function(e){
  if(e.target.className=="dropdown-item"){
    e.preventDefault();
    /* var selText = $(this).text; */
    var selText = $(event.target).text();
    var parentofButton = closestByClass(event.target,"dropdown left");
    var parentId = parentofButton.querySelector(".btn-secondary").id;
    //alert(""+parentId);
    $("#"+parentId).text(selText);
    //alert('BUTTON CLICKED'); 
    var ind = parentId.charAt(1);
    alert(selText);
    ListofErrors[ind-1].reason= selText;
  }
});
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
              newNode.childNodes[1].innerHTML = "Error Lines : "+e.start+"&"+e.end;
              newNode.style.display = "flex";
              var buttons = newNode.querySelector(".marketing-content-buttons");
              
              /* reasons = buttons.querySelector(".select2-field").querySelector(".select2");
              reasons.setAttribute("id",index);
              reasons.addEventListener("change", reasonChanged); */

              reasons2 = buttons.querySelector(".btn-secondary");
              reasons2.setAttribute("id","c"+index);

              visibility = buttons.getElementsByTagName("button")[1];
              visibility.setAttribute("id","v"+index);
              visibility.addEventListener("click",visibilityPressed);
              
              remover = buttons.getElementsByTagName("button")[2];
              remover.setAttribute("id","r"+index);
              remover.addEventListener("click",removePressed);

              list.insertBefore(newNode, mc);
              componentHandler.upgradeDom();
              //alert(visibility.innerHTML);
              
            }
var closestByClass = function(el, clazz) {
  // Traverse the DOM up with a while loop
  while (el.className != clazz) {
      //alert(el.className);
      // Increment the loop to the parent node
      el = el.parentNode;
      if (!el) {
          return null;
      }
  }
  // At this point, the while loop has stopped and `el` represents the element that has
  // the class you specified in the second parameter of the function `clazz`

  // Then return the matched element
  return el;
}
function reasonChanged(){
 // e.reason = this.options[this.selectedIndex].text;
  //alert(this.id+" "+this.options[this.selectedIndex].text);
//this.id
  index = this.id;
  ListofErrors[index-1].reason= this.options[this.selectedIndex].text; 
  //alert(ListofErrors[index-1].reason);
  //alert("The selection reason is now:"+ListofErrors[index-1].reason);
}
function visibilityPressed(){

  var visBtn = document.getElementById(this.id);
  // ids are in v+index form thus take the 2nd character of the id and ıd use it as index.
    index = this.id.charAt(1);
    startingLine = ListofErrors[index-1].start;
    endLine = ListofErrors[index-1].end;
    var rng = new Range(startLine,0,endLine,0);
    //var rng = clipNodes(startLine,endLine);
    //var rng = new range(startLine,0,endLine,0);
    //alert(startingLine+"**"+endLine);
    //editor.addSelectionMarker(rng);
    //editor.updateSelectionMarkers();
    editor.session.addMarker(rng,"ace_active-line","fullLine");
}
  
function removePressed(){
  // ids are in rr+index form thus take the 2nd character of the id and ıd use it as index.
  index = this.id.charAt(1);
  var totalSelection  = ListofErrors.length;
  alert(ListofErrors.length);
  var removed =  ListofErrors.splice((index-1),1);
  alert(ListofErrors.length);
  var Domlist = document.querySelector('.marketing-content-list');
  var lastChild = Domlist.lastChild;
  alert("child count :"+Domlist.childNodes.length);
  alert("innerHTML :"+Domlist.innerHTML);
  Domlist.innerHTML = listInner;
  alert("child count :"+Domlist.childNodes.length);
  addListAsComponent(ListofErrors);
      //cloneList.pop;
  }

function addListAsComponent (ListofErrors)
            {
              var list = document.querySelector('.marketing-content-list');
              var mc = document.querySelector('.marketing-content-hidden');
              for (index = ListofErrors.length;index>0;index--){
                var newNode = mc.cloneNode(true);
                var e = ListofErrors[index-1];
                newNode.childNodes[1].innerHTML = "Error Lines : "+e.start+"&"+e.end; 
                newNode.style.display = "flex";
                var buttons = newNode.querySelector(".marketing-content-buttons");
                
                reasons = buttons.querySelector(".select2-field").querySelector(".select2");
                reasons.setAttribute("id",index);
                reasons.addEventListener("change", reasonChanged);
                
                visibility = buttons.getElementsByTagName("button")[1];
                visibility.setAttribute("id","v"+index);
                visibility.addEventListener("click",visibilityPressed);
                
                remover = buttons.getElementsByTagName("button")[2];
                remover.setAttribute("id","r"+index);
                remover.addEventListener("click",removePressed);

                document.addEventListener('click', function(e){
                  if(e.target.className=="dropdown-item"){
                   alert('BUTTON CLICKED');
                  }
                })

                list.insertBefore(newNode, mc);
                //
              }
              componentHandler.upgradeDom();
              //alert(visibility.innerHTML);
              
            }
  
