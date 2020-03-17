var originalDom = document.querySelector('.marketing-content-hidden');
var listInner = document.querySelector('.marketing-content-list').innerHTML;
levelChosen = localStorage.getItem('selected');
//window.localStorage.removeItem('selected');
var Range = ace.require("ace/range").Range;

if(levelChosen==1){
  document.getElementById("editor").style.display = "block";
  document.getElementById("narrativeText").style.display = "block";
  var editor = ace.edit("editor");
  var code = document.querySelector("editor");
  editor.setTheme("ace/theme/eclipse");
  editor.session.setMode("ace/mode/java");
  editor.setReadOnly(true);
}
else if(levelChosen ==2){
  document.getElementById("editor2").style.display = "block";
  document.getElementById("narrativeText2").style.display = "block";
  var editor = ace.edit("editor2");
  var code = document.querySelector("editor2");
  editor.setTheme("ace/eclipse/cobalt");
  editor.session.setMode("ace/mode/java");
  editor.setReadOnly(true);
}
else if(levelChosen==3){
  document.getElementById("editor3").style.display = "block";
  document.getElementById("narrativeText3").style.display = "block";
  var editor = ace.edit("editor3");
  var code = document.querySelector("editor3");
  editor.setTheme("ace/theme/eclipse");
  editor.session.setMode("ace/mode/java");
  editor.setReadOnly(true);  
}
else if(levelChosen==4){
  document.getElementById("editor4").style.display = "block";
  document.getElementById("narrativeText4").style.display = "block";
  var editor = ace.edit("editor4");
  var code = document.querySelector("editor4");
  editor.setTheme("ace/theme/eclipse");
  editor.session.setMode("ace/mode/java");
  editor.setReadOnly(true);  
}
else if(levelChosen==5){
  document.getElementById("editor5").style.display = "block";
  document.getElementById("narrativeText5").style.display = "block";
  var editor = ace.edit("editor5");
  var code = document.querySelector("editor5");
  editor.setTheme("ace/theme/eclipse");
  editor.session.setMode("ace/mode/java");
  editor.setReadOnly(true);  
}
else if(levelChosen==6){
  document.getElementById("editor6").style.display = "block";
  document.getElementById("narrativeText5").style.display = "block";
  var editor = ace.edit("editor6");
  var code = document.querySelector("editor6");
  editor.setTheme("ace/theme/cobalt");
  editor.session.setMode("ace/mode/java");
  editor.setReadOnly(true);  
}
editor.setFontSize(18);
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
    this.reason = ["empty"];
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
  answer1.reason.push("Comments");
  answers[0] =answer1;

  var answer2 = new Err(8,10);
  answer2.reason.push("Duplication");
  answer2.reason.push("Consistency");
  answers[1] =answer2;

  var answer3 = new Err(17,18);
  answer3.reason.push("Parameter");
  answers[2] =answer3;

  var hints = ["There are "+ answers.length+" defects in the code","Duplication error at lines 9-12","Parameter error at lines 19-20","Comments error at line 5"];
}
else if(levelChosen == 2){
  var answers = [];
  var answer1 = new Err(25,26);
  answer1.reason.push("Duplication");
  answers[0] =answer1;

  var answer2 = new Err(3,34);
  answer2.reason.push("Indentation");
  answers[1] =answer2;

  var answer3 = new Err(42,42);
  answer3.reason.push("Long line");
  answers[2] =answer3;

  var answer4 = new Err(38,38);
  answer4.reason.push("Compare");
  answers[3] =answer4;

  var hints = ["There are "+ answers.length+" defects in the code","Focus on the styling aspects of the code","Consider looking for string equality violations","Copy pasting is harmful"];
}
else if(levelChosen == 3){
  var answers = [];
  var answer1 = new Err(20,20);
  answer1.reason.push("Data and resource manipulation");
  answers[0] =answer1;

  var answer2 = new Err(21,21);
  answer2.reason.push("Data and resource manipulation");
  answers[1] =answer2;

  var answer3 = new Err(33,33);
  answer3.reason.push("Compare");
  answers[2] =answer3;
  var hints = ["There are "+ answers.length+" defects in the code","Pay close attention to comparisons","Sadly, mistakes can be repeted ","There are some things in OO languages that are always more dangerous"];  
}
else if(levelChosen == 4){
  var answers = [];
  var answer1 = new Err(12,12);
  answer1.reason.push("Data and resource manipulation");
  answers[0] =answer1;

  var answer2 = new Err(21,21);
  answer2.reason.push("Algorithm/Performance");
  answers[1] =answer2;

  var answer3 = new Err(28,28);
  answer3.reason.push("Data and resource manipulation");
  answers[2] =answer3;

  var hints = ["There are "+ answers.length+" defects in the code","Pay close attention to indexes","How does java handle 2D arrays?"];  
}
else if(levelChosen == 5){
  var answers = [];
  var answer1 = new Err(5,5);
  answer1.reason.push("Element Type");
  answers[0] =answer1;

  var answer2 = new Err(7,7);
  answer2.reason.push("Immutable");
  answers[1] =answer2;

  var answer3 = new Err(9,9);
  answer3.reason.push("Compare");
  answers[2] = answer3;

  var answer4 = new Err(16,22);
  answer4.reason.push("Data and resource manipulation");
  answers[3] =answer4;

  var hints = ["There are "+ answers.length+" defects in the code","If a line of code is missing you should select the nearest encapsulating object structure","Is java dynamically typed?"];  
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
var previousHighScore = 0;
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
    previousHighScoreLevelToRead = "level"+String(levelChosen);
    var highScoreRef = database.ref('users/' + userId + "/scores/"+previousHighScoreLevelToRead);
    highScoreRef.once('value', function(snapshot) {
      previousHighScore= snapshot.val();
      
    });
  //update the high score if new score is higher
  
  if(scoreCalc[0]>previousHighScore){
    var userScoreRef = database.ref('users/' + userId+ "/scores");
    userScoreRef.child(previousHighScoreLevelToRead).set(scoreCalc[0]);
    
    userScoreRef.once('value', function(snapshot) {
      var newHighScoreSumLocal = 0;
      snapshot.forEach(function(childSnapshot) {
        var levelNo = childSnapshot.key;
        var levelScore = childSnapshot.val();
        newHighScoreSumLocal = newHighScoreSumLocal + levelScore;
        //alert(levelNo+"-"+levelScore);

        // ...
      });
    var updateSum = database.ref('users/' + userId);
    updateSum.child("highScore").set(newHighScoreSumLocal);
    });
    
  }

  noOfanswers = answers.length;
  maxScore = 3*noOfanswers;
  var gameMetaData = {
    message: "There were " +noOfanswers  +" mistakes. You got "+scoreCalc[1]+"  exactly right! Score : "+scoreCalc[0]+"/"+maxScore,
    timeout: 12000,
    actionHandler: handler,
    actionText: ' '
  };
  snackbarContainer.MaterialSnackbar.showSnackbar(gameMetaData);
  // open answers button
  var answersButton = document.getElementById("answersBtn");
  answersButton.style.opacity= 1;
  answersButton.style.cursor = "auto";
  answersButton.style.pointerEvents ="all";
}


function calculateScore(answers,submission){
  var grandTruth = answers.slice();
  var score = 0;
  var exact = 0;
  
  for (var i = 0; i<submission.length;i++) {
    var containerIndex = i+1;
    var reasonContainerId = "n"+containerIndex;
    var domElementToBeColored = document.getElementById(reasonContainerId);
    domElementToBeColored.style.border = "5px solid red";
    for(var j=0;j<grandTruth.length;j++){
      
      if(submission[i].start == grandTruth[j].start){
        if(submission[i].end == grandTruth[j].end){
          score++;
          var containerIndex = i+1;
          var reasonContainerId = "n"+containerIndex;
          var domElementToBeColored = document.getElementById(reasonContainerId);
          //alert(domElementToBeColored.innerHTML);
          domElementToBeColored.style.border = "5px solid yellow";
          //alert(""+grandTruth[j].reason.length);
          for(t =0;t<grandTruth[j].reason.length;t++){
            
            if(submission[i].reason == grandTruth[j].reason[t]){
              score = score+2;
              exact++;
              var reasonContainerId = "n"+containerIndex;
              var domElementToBeColored = document.getElementById(reasonContainerId);
              domElementToBeColored.style.border = "5px solid green";
              //delete found element , give points only once
              grandTruth.splice(j,1);
            }
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
    timeout: 4000,
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
              var DisplayStart = e.start+1;
              var DisplayEnd = e.end+1;
              newNode.childNodes[1].innerHTML = "Error Lines : "+DisplayStart+"-"+DisplayEnd;
              newNode.style.display = "flex";
              newNode.childNodes[1].style.fontSize = "xx-large";
              
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
              
              newNode.setAttribute("id","n"+index);
              //list.insertBefore(newNode, mc.nextSibling);
              list.appendChild(newNode);
              componentHandler.upgradeDom();
              //alert(visibility.innerHTML);
              
              if(ListofErrors.length !=0){
                document.getElementById("titleMsg").innerHTML="";
              }

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
var isGuideBig = false;
document.getElementById('arrow_resizer').addEventListener('click',resizeGuideSection,false);
function resizeGuideSection(){
  toResize = document.getElementById('leftBottom')
  toShrink = document.getElementById('leftTop')
  
  if(isGuideBig){//then we will shrink it
    toResize.style.height = "50%";
    toShrink.style.height = "50%";
    isGuideBig = false;
    document.getElementById('arrow_resizer').innerHTML ="keyboard_arrow_up"
  }
  else{// it small so button press should enlarge it
    toResize.style.height = "96%";
    toShrink.style.height = "3%";
    //alert("trying hard here")
    isGuideBig = true;
   document.getElementById('arrow_resizer').innerHTML ="keyboard_arrow_down"
  }
  componentHandler.upgradeDom();
}
function addListAsComponentForAnswers (ListofErrors)
            {
              var list = document.querySelector('.marketing-content-list');
              var mc = document.querySelector('.marketing-content-hidden');
              for (index = ListofErrors.length;index>0;index--){
                var newNode = mc.cloneNode(true);
                var e = ListofErrors[index-1];
                var DisplayStart = e.start+1;
                var DisplayEnd = e.end+1;
                newNode.childNodes[1].innerText = "Error Lines : "+DisplayStart+"-"+DisplayEnd; 
                newNode.style.display = "flex";
                newNode.childNodes[1].style.setFontSize = "20px";
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
                newNode.setAttribute("id","n"+index);
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
                var DisplayStart = e.start+1;
                var DisplayEnd = e.end+1;
                newNode.childNodes[1].innerText = "Error Lines : "+DisplayStart+"-"+DisplayEnd; 
                newNode.style.display = "flex";
                newNode.childNodes[1].style.setFontSize = "20px";
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
                newNode.setAttribute("id","n"+index);
                document.addEventListener('click', function(e){
                  if(e.target.className=="dropdown-item"){
                   //alert('BUTTON CLICKED');
                  }
                })

                //list.insertBefore(newNode, mc.nextSibling);
                list.appendChild(newNode);
              }
              if(ListofErrors.length ==0){
                document.getElementById("titleMsg").innerHTML='<h3 id="titleMsg">Defects you find will go here!</h3>';
              }
              componentHandler.upgradeDom();
              //alert(visibility.innerHTML);
              
            }
