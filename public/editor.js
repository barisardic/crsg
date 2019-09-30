var originalDom = document.querySelector('.marketing-content-hidden');
var listInner = document.querySelector('.marketing-content-list').innerHTML;
levelChosen = localStorage.getItem('selected');
//window.localStorage.removeItem('selected');
var Range = ace.require("ace/range").Range;
if(levelChosen==1){
  document.getElementById("editor").style.display = "block";
  var editor = ace.edit("editor");
  var code = document.querySelector("editor");
  editor.setTheme("ace/theme/cobalt");
  editor.session.setMode("ace/mode/java");
  editor.setReadOnly(true);

  
}
else if(levelChosen ==2){
  document.getElementById("editor2").style.display = "block";
  var editor = ace.edit("editor2");
  var code = document.querySelector("editor2");
  editor.setTheme("ace/theme/cobalt");
  editor.session.setMode("ace/mode/java");
  editor.setReadOnly(true);
}
else if(levelChosen==3){
  document.getElementById("editor3").style.display = "block";
  var editor = ace.edit("editor3");
  var code = document.querySelector("editor3");
  editor.setTheme("ace/theme/cobalt");
  editor.session.setMode("ace/mode/java");
  editor.setReadOnly(true);  
}
else if(levelChosen==4){
  document.getElementById("editor4").style.display = "block";
  var editor = ace.edit("editor4");
  var code = document.querySelector("editor4");
  editor.setTheme("ace/theme/cobalt");
  editor.session.setMode("ace/mode/java");
  editor.setReadOnly(true);  
}
else if(levelChosen==5){
  document.getElementById("editor5").style.display = "block";
  var editor = ace.edit("editor5");
  var code = document.querySelector("editor5");
  editor.setTheme("ace/theme/cobalt");
  editor.session.setMode("ace/mode/java");
  editor.setReadOnly(true);  
}
else if(levelChosen==6){
  document.getElementById("editor6").style.display = "block";
  var editor = ace.edit("editor6");
  var code = document.querySelector("editor6");
  editor.setTheme("ace/theme/cobalt");
  editor.session.setMode("ace/mode/java");
  editor.setReadOnly(true);  
}
editor.setFontSize(14);
// Initialize library and start tracking time
TimeMe.initialize({
	currentPageName: "play", // current page
	idleTimeoutInSeconds: 600 // seconds
    });

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
if(levelChosen == 1){
  var answers = [];
  var answer1 = new Err(4,4);
  answer1.reason = "Comments";
  answers[0] =answer1;

  var answer2 = new Err(8,11);
  answer2.reason = "Duplication";
  answers[1] =answer2;

  var answer3 = new Err(18,19);
  answer3.reason = "Parameter";
  answers[2] =answer3;

  var hints = ["Your first hint","Your second hint","Are you ok ?"];
}
else if(levelChosen == 2){
  var answers = [];
  var answer1 = new Err(32,36);
  answer1.reason = "Duplication";
  answers[0] =answer1;

  var answer2 = new Err(44,48);
  answer2.reason = "Indentation";
  answers[1] =answer2;

  var answer3 = new Err(56,56);
  answer3.reason = "Long line";
  answers[2] =answer3;

  var answer4 = new Err(50,50);
  answer4.reason = "Compare";
  answers[3] =answer4;

  var hints = ["Focus on the styling aspects of the code","Consider looking for string equality violations","Copy pasting is harmful"];
}
var ListofErrors = [];

document.addEventListener('DOMContentLoaded', lines, false);
function lines(){
  function getLines () {
    selectionRange = editor.getSelectionRange();
    startLine = selectionRange.start.row;
    endLine = selectionRange.end.row;
    //alert("starts at : "+startLine+ "ends at : "+ endLine );
    content = editor.session.getTextRange(selectionRange);
    var selection = new Err(startLine,endLine);
    ListofErrors.push(selection);
    //alert(ListofErrors.length);
    addComponent(ListofErrors);
  
  }
  document.getElementById('hover').addEventListener('click', getLines, false);
  
};
function submitSelection () {
  var timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();
  //alert(answer1.toString()+"**"+ListofErrors[0].toString());
  var scoreCalc =calculateScore(answers,ListofErrors);
  //alert("total score : "+ scoreCalc[0]);
  var user = firebase.auth().currentUser;
     var userId = user.uid;
    //todo finsd out boolean returning checkbox value
    var database = firebase.database();
    var newPostRef = database.ref('games/' + userId).push();
    newPostRef.set({
      user: userId,
      level: levelChosen,
      submission: ListofErrors,
      score: scoreCalc[0],
      timeSpend: timeSpentOnPage

    });
  noOfanswers = answers.length;
  var data = {
    message: "There were " +noOfanswers  +" mistakes. You got "+scoreCalc[1]+"  exactly right!",
    timeout: 10000,
    actionHandler: handler,
    actionText: ' '
  };
  snackbarContainer.MaterialSnackbar.showSnackbar(data);
  // open answers button
  var answersButton = document.getElementById("answersBtn");
  answersButton.style.opacity= 1;
  answersButton.style.cursor = "auto";
}


function calculateScore(answers,submission){
  var grandTruth = answers.slice();
  var score = 0;
  var exact = 0;
  for (var i = 0; i<submission.length;i++) {
    
    for(var j=0;j<grandTruth.length;j++){
      
      if(submission[i].start == grandTruth[j].start){

        if(submission[i].end == grandTruth[j].end){
          score++;
          
          if(submission[i].reason == grandTruth[j].reason){
            score = score+2;
            exact++;
            //delete found element , give points only once
            grandTruth.splice(j,1);
          }
        }
        
      }
      
    }
  }
var scoreAndExact = [score, exact]; 
return scoreAndExact; 
}
var hintCount = 0 ;
var snackbarContainer = document.querySelector('#demo-snackbar-example');
var showSnackbarButton = document.getElementById('hintBtn');
var handler = function(event) {
    //showSnackbarButton.style.backgroundColor = '';
  };
showSnackbarButton.addEventListener('click', function() {
  'use strict';
  var data = {
    message: hints[hintCount%hints.length],
    timeout: 2500,
    actionHandler: handler,
    actionText: ' '
  };
  hintCount++;
  snackbarContainer.MaterialSnackbar.showSnackbar(data);
});

document.getElementById('submitBtn').addEventListener('click',submitSelection,false);
document.addEventListener('click', function(e){
  if(e.target.className=="dropdown-item" || e.target.className==""){
    e.preventDefault();
    /* var selText = $(this).text; */
    var selText = $(event.target).text();
    var parentofButton = closestByClass(event.target,"dropdown left");
    var parentId = parentofButton.querySelector(".btn-secondary").id;
    //alert(""+parentId);
    $("#"+parentId).text(selText);
    //alert('BUTTON CLICKED'); 
    var ind = parentId.charAt(1);
    //alert(selText);
    //alert(e.target.innerHTML);
    ListofErrors[ind-1].reason= selText;
  }
});
document.getElementById('answersBtn').addEventListener('click',answersPressed,false);
function answersPressed(){
  var Domlist = document.querySelector('.marketing-content-list');
  Domlist.innerHTML = listInner;
  //alert("child count :"+Domlist.childNodes.length);
  addListAsComponentForAnswers(answers);
  for(var i =0; i< answers.length;i++){
    startingLine = answers[i].start;
    endLine = answers[i].end + 1;

    var rng = new Range(startingLine,0,endLine,0);
    editor.session.addMarker(rng,"ace_active-line","screen",false);
  }
}


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

              //list.insertBefore(newNode, mc.nextSibling);
              list.appendChild(newNode);
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
    if(startingLine==endLine){
      endLine++;
    }
    var rng = new Range(startingLine,0,endLine,0);
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
  //alert(ListofErrors.length);
  var removed =  ListofErrors.splice((index-1),1);
  //alert(ListofErrors.length);
  var Domlist = document.querySelector('.marketing-content-list');
  var lastChild = Domlist.lastChild;
  //alert("child count :"+Domlist.childNodes.length);
  //alert("innerHTML :"+Domlist.innerHTML);
  Domlist.innerHTML = listInner;
  //alert("child count :"+Domlist.childNodes.length);
  ListofErrors.reverse();
  addListAsComponentForErrors(ListofErrors);
      //cloneList.pop;
  }

function addListAsComponentForAnswers (ListofErrors)
            {
              var list = document.querySelector('.marketing-content-list');
              var mc = document.querySelector('.marketing-content-hidden');
              for (index = ListofErrors.length;index>0;index--){
                var newNode = mc.cloneNode(true);
                var e = ListofErrors[index-1];
                newNode.childNodes[1].innerHTML = "Error Lines : "+e.start+"&"+e.end; 
                newNode.style.display = "flex";
                var buttons = newNode.querySelector(".marketing-content-buttons");
                
               /*  reasons = buttons.querySelector(".select2-field").querySelector(".select2");
                reasons.setAttribute("id",index);
                reasons.addEventListener("change", reasonChanged); */
                
                reasons2 = buttons.querySelector(".btn-secondary");
                reasons2.disabled = true;
                reasons2.setAttribute("id","c"+index);
                reasons2.innerHTML = answers[index-1].reason;

                visibility = buttons.getElementsByTagName("button")[1];
                visibility.setAttribute("id","v"+index);
                visibility.addEventListener("click",visibilityPressed);
                
                /* remover = buttons.getElementsByTagName("button")[2];
                remover.setAttribute("id","r"+index);
                remover.addEventListener("click",removePressed); */

                document.addEventListener('click', function(e){
                  if(e.target.className=="dropdown-item"){
                   //alert('BUTTON CLICKED');
                  }
                })

                //list.insertBefore(newNode, mc.nextSibling);
                list.appendChild(newNode);
              }
              componentHandler.upgradeDom();
              //alert(visibility.innerHTML);
              
            }
            function addListAsComponentForErrors (ListofErrors)
            {
              var list = document.querySelector('.marketing-content-list');
              var mc = document.querySelector('.marketing-content-hidden');
              for (index = ListofErrors.length;index>0;index--){
                var newNode = mc.cloneNode(true);
                var e = ListofErrors[index-1];
                newNode.childNodes[1].innerHTML = "Error Lines : "+e.start+"&"+e.end; 
                newNode.style.display = "flex";
                var buttons = newNode.querySelector(".marketing-content-buttons");
                
               /*  reasons = buttons.querySelector(".select2-field").querySelector(".select2");
                reasons.setAttribute("id",index);
                reasons.addEventListener("change", reasonChanged); */
                
                reasons2 = buttons.querySelector(".btn-secondary");
                reasons2.setAttribute("id","c"+index);
                reasons2.innerHTML = ListofErrors[index-1].reason;
 
                visibility = buttons.getElementsByTagName("button")[1];
                visibility.setAttribute("id","v"+index);
                visibility.addEventListener("click",visibilityPressed);
                
                remover = buttons.getElementsByTagName("button")[2];
                remover.setAttribute("id","r"+index);
                remover.addEventListener("click",removePressed);

                document.addEventListener('click', function(e){
                  if(e.target.className=="dropdown-item"){
                   //alert('BUTTON CLICKED');
                  }
                })

                //list.insertBefore(newNode, mc.nextSibling);
                list.appendChild(newNode);
              }
              componentHandler.upgradeDom();
              //alert(visibility.innerHTML);
              
            }
