/**
 * author: Baris
 * functionality: 
 *  1. updates the functionality of the main page- the editor. 
 *  2. gets the lines selected, created an error, allows you to change the reason
 *  3. check the good answers, the hints, and your score
 */
// INITIAL SETUP
var originalDom = document.querySelector('.marketing-content-hidden');
var listInner = document.querySelector('.marketing-content-list').innerHTML;
var levelChosen = localStorage.getItem('selected'); // get which level was chose

//window.localStorage.removeItem('selected');
var Range = ace.require("ace/range").Range;
// variables for later usage
var ListofErrors = []; // errors submitted by the user
var answers = [];
var editor = 0; 
var hints = [];

//--------------------------------------------------------------------------------------------
/**
 * ERROR CLASS (central to the game)
 * !! check if moving it before makes a difference.
 * custom error object for user to select/save the errors in the code.
 */
class Err {
    constructor(start, end) {
        this.start = start;
        this.end = end;
        this.reason = "reason1";
    }
    get start() {
        return this._start;
    }
    get end() {
        return this._end;
    }
    get reason() {
        return this._reason;
    }
    set start(value) {
        this._start = value;
    }
    set end(value) {
        this._end = value;
    }
    set reason(value) {
        this._reason = value;
    }
    toString() {
        return "" + this.start + "-" + this.end + "-" + this.reason;
    }
}


//--------------------------------------------------------------------------------------------
/**
 * INITIALIZE FROM DATABASE
 * get data from firebase, 
 * update editor text, narrative text( description)
 * update exercises from db
 */
// connect to database, get exercises
var ref = firebase.database().ref('exercise');

// connect to editor.html
var l_exerc_html = document.getElementsByClassName("exercises_html");
var l_narrative_html = document.getElementsByClassName("narrative_html");
// take the data once from firebase in the first call
ref.once("value", gotData, errData)
   // function to show what to do with the data when the data has been taken
  function gotData( data){

    // get all exercise information from database
    var exercises = data.val();
    // level chosen from the user once in the program
    var i = levelChosen -1; 
    // update the text in the fields by calling the "id" element
    document.getElementById( l_exerc_html[ i][ 'id']).innerHTML = exercises[i].code;
    // css for the editor
    editor = ace.edit( l_exerc_html[i]['id']);
    document.getElementById( l_exerc_html[i]['id']).style.display = "block"; 
    editor.session.setMode("ace/mode/java");
    editor.setTheme("ace/theme/cobalt");
    editor.setReadOnly(true);
    editor.setFontSize(14);
    // change the narrative of the editor
    var narrative_i = document.getElementById( l_narrative_html[ i][ 'id']);
    narrative_i.innerHTML = exercises[i].narrative;
    narrative_i.style.display = "block";
    //document.getElementById("narrativeText"+l_exerc_html[i]['id'].slice(6) ).style.display = "block";
    // errors
    var db_errors = exercises[i].errors;
    hints = exercises[i].hints;
    // get all errors
    for(var i_error =0; i_error< db_errors.length; i_error ++){
        // create the errors and the lines
        err = new Err( db_errors[ i_error]['lines'][0], db_errors[ i_error]['lines'][1]);
        err.reason = db_errors[ i_error]['reason'];
        // add error to the groundtruth that you are trying to compare the results with
        answers.push(err);
    }
  }
  // when there is an error from reading from the database
  function errData( err){
    console.log("Error");
    console.log(err)
}

// create Checklist
function tableCreate() {

    var ref_checklist = firebase.database().ref('checklist');
    ref_checklist.once("value", gotDataCheckList, errDataCheckList)
        // function to show what to do with the data when the data has been taken
        function gotDataCheckList( data){
            // get all exercise information from database
            var checklist = data.val();
            // create table and body of table
            var tbl = document.createElement('table');
            var tbdy = document.createElement('tbody');
            // add the elements to each
            for (var i = 0; i < checklist.length; i++) {
                var tr = document.createElement('tr');
                var td = document.createElement('td');
                td.appendChild(document.createTextNode(checklist[i]));
                tr.appendChild(td);
                tbdy.appendChild(tr);
            }
            tbl.appendChild(tbdy);
            // get panel
            $('#checklist-panel').append(tbl);
           //document.getElementById('checklist-panel').append(tbl);
        }
          // when there is an error from reading from the database
  function errDataCheckList( err){
    console.log("Error");
    console.log(err)
}
}
tableCreate();
       // tableCreate();


//--------------------------------------------------------------------------------------------
// TIMING
// Initialize library and start tracking time
// Important: after load from firebase.
TimeMe.initialize({
    currentPageName: "play", // current page
    idleTimeoutInSeconds: 600 // seconds
});

//--------------------------------------------------------------------------------------------
/**
 * ADD ERROR SELECTED
 * 1. Take the lines the user submitted
 * 2. Check on error reason change or deleted. 
 * 3. Submit selected values, take score. 
 * 4. Show hints.
 */
document.addEventListener('DOMContentLoaded', lines, false);
function lines() {
    function getLines() {
        // get the information for the lines selected
        selectionRange = editor.getSelectionRange();
        // creeate an error based on the lines submitted
        // content = editor.session.getTextRange(selectionRange);
        var selection = new Err( selectionRange.start.row +1, selectionRange.end.row+1);
        // add error to list of errors
        ListofErrors.push(selection);
        // add the following function after the loaded content
        addComponent(selection, ListofErrors.length);
    }
    document.getElementById('hover').addEventListener('click', getLines, false);
};

// take the lines the user submitted.
function getSelectionRange() {
    var sel;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            return sel.getRangeAt(0);
        }
    } else if (document.selection) {
        return document.selection.createRange();
    }
    return null;
}

//--------------------------------------------------------------------------------------------
/**
 * ADD ERROR COMPONENT ON THE RIGHT SIDE OF THE SCREEN
 */
// adds the visual component for the addition of error
// it makes visible the previously stored components.
function addComponent(e, index){
    // list of components
    var list = document.querySelector('.marketing-content-list');
    // get the hidden content 
    var mc = document.querySelector('.marketing-content-hidden');
    var newNode = mc.cloneNode(true); // deep clone
    // data to show
    newNode.childNodes[1].innerHTML = "Error Lines : " + e.start + "&" + e.end ;
    newNode.style.display = "flex";
    // make visible the buttons of the element 
    var buttons = newNode.getElementsByTagName("button");
    reasons = buttons[0];
    reasons.setAttribute("id",index);
    reasons.addEventListener("change", reasonChanged); 
    visibility = buttons[1];
    visibility.setAttribute("id", "v" + index);
    visibility.addEventListener("click", visibilityPressed);
    remover = buttons[2];
    remover.setAttribute("id", "r" + index);
    remover.addEventListener("click", removePressed);
    newNode.setAttribute("id", "n" + index);
    // add button to the errors.
    list.appendChild(newNode);
    componentHandler.upgradeDom();
    // if list of errors has been updated, remove the title 
    if (ListofErrors.length != 0) {
        document.getElementById("titleMsg").innerHTML = "";
    }
}
// There is a problem in update
function reasonChanged() {
    // get the index of the reason (I guess), and update the last of errors
    index = this.id;
    console.log(this);
    console.log(ListofErrors[index-1].reason);
    //ListofErrors[index - 1].reason = this.options[this.selectedIndex].text;
}

function visibilityPressed() {
    // ids are in v+index form thus take the 2nd character of the id and id use it as index.
    index = this.id.charAt(1);
    // get the lines of the error
    startingLine = ListofErrors[index - 1].start;
    endLine = ListofErrors[index - 1].end;
    // if it is one-line error, add a new line
    if (startingLine == endLine) {
        endLine++;
    }
    // add the range for visibility
    var rng = new Range(startingLine, 0, endLine, 0);
    // make visible
    editor.session.addMarker(rng, "ace_active-line", "fullLine");
}

// DOES THIS DO ITS FUNCTIONALITY??
function removePressed() {
    // ids are in rr+index form thus take the 2nd character of the id and id use it as index.
    index = this.id.charAt(1);
    var totalSelection = ListofErrors.length;
    //alert(ListofErrors.length);
    var removed = ListofErrors.splice((index - 1), 1);
    //alert(ListofErrors.length);
    var Domlist = document.querySelector('.marketing-content-list');
    var lastChild = Domlist.lastChild;
    //alert("child count :"+Domlist.childNodes.length);
    //alert("innerHTML :"+Domlist.innerHTML);
    Domlist.innerHTML = listInner;
    //alert("child count :"+Domlist.childNodes.length);
    ListofErrors.reverse();
    //addListAsComponentForErrors(ListofErrors);
    //cloneList.pop;
}

// CHANGE THE VALUE OF DROPDOWN MENU
document.addEventListener('click', function(e) {
    if (e.target.className == "dropdown-item" || e.target.className == "") {
        e.preventDefault();
        // the reason's text 
        var selText = $(event.target).text();
        // find where it is
        var parentofButton = closestByClass(event.target, "dropdown left");
        var parentId = parentofButton.querySelector(".btn-secondary").id;
        //alert(""+parentId);
        $("#" + parentId).text(selText);
        // previous value: charAt(1) ??
        var ind = parentId.charAt(0);
        ListofErrors[ind - 1].reason = selText;
    }
});
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

//--------------------------------------------------------------------------------------------
/**
 * HINTS
 */
var hintCount = 0; // variable for circling the hints
var snackbarContainer = document.querySelector('#demo-snackbar-example');
var showSnackbarButton = document.getElementById('hintBtn');
var handler = function(event) {
    //showSnackbarButton.style.backgroundColor = 'blue';
};
showSnackbarButton.addEventListener('click', function() {
    'use strict';
    var data = {
        message: hints[hintCount % hints.length],
        timeout: 4000,
        actionHandler: handler,
        actionText: ' '
    };
    hintCount++;
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
});

//--------------------------------------------------------------------------------------------
/**
 * SUBMISSION AND SCORE
 * 
 */ 
// submission button functionality
document.getElementById('submitBtn').addEventListener('click', submitSelection, false);
function submitSelection() {
    // authenticate user
    var user = firebase.auth().currentUser;
    var userId = user.uid;
    var noOfanswers = answers.length;
    // get data: time and date
    var timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();
    var scoreCalc = calculateScore( answers, ListofErrors);
    //alert("total score : "+ scoreCalc[0]);
    // add data to database
    var database = firebase.database();
    var newPostRef = database.ref('games/' + userId).push();
    newPostRef.set({
        user: userId,
        level: levelChosen,
        submission: ListofErrors,
        score: scoreCalc[0],
        timeSpend: timeSpentOnPage
    });
    console.log({
        user: userId,
        level: levelChosen,
        submission: ListofErrors,
        score: scoreCalc[0],
        timeSpend: timeSpentOnPage
    });
    maxScore = 3 * noOfanswers;
    var data = {
        message: "There were " + noOfanswers + " mistakes. You got " + scoreCalc[1] + "  exactly right! Score : " + scoreCalc[0] + "/" + maxScore,
        timeout: 12000,
        actionHandler: handler,
        actionText: ' '
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
    // open answers button
    var answersButton = document.getElementById("answersBtn");
    answersButton.style.opacity = 1;
    answersButton.style.cursor = "auto";
    answersButton.style.pointerEvents = "all";
}
// simple calculation of the score 
// 1 point for finding the place, 2 for exact reason
function calculateScore(answers_real, submission) {
    var score = 0;
    var exact = 0;
    var answers_copy = answers_real.slice();
    for (var i = 0; i < submission.length; i++) 
    {   // if it is not found in answers
        // mark it in the begining to skip the if statement
        var containerIndex = i + 1;
        var reasonContainerId = "n" + containerIndex;
        var domElementToBeColored = document.getElementById(reasonContainerId);
        domElementToBeColored.style.border = "5px solid red";
        // check for each of the answers if it is there
        for (var j = 0; j < answers_copy.length; j++) {
            // if you found the lines of code, then think of scoring it right
            if ((submission[i].start == answers_copy[j].start) & (submission[i].end == answers_copy[j].end)) {
                // found score +1 
                score++;
                // mark the container with yellow
                domElementToBeColored.style.border = "5px solid yellow";
                // if reason found too - score twice
                if (submission[i].reason == answers_copy[j].reason) {
                    // update score
                    exact++;
                    score = score + 2;
                    // update block
                    domElementToBeColored.style.border = "5px solid green";
                    //delete found element , give points only once
                    answers_copy.splice(j,1);
                }
            }
        }
    }
    return [score, exact];
}

//--------------------------------------------------------------------------------------------
/**
 * ANSWERS
 * Show answers functionality - related to answers button.
 */
// check the answers. 
document.getElementById('answersBtn').addEventListener('click', answersPressed, false);
function answersPressed() {
    // remove existing errors
    Domlist = document.querySelector('.marketing-content-list');
    Domlist.innerHTML = listInner;
    // mark
    for (var i = 0; i < answers.length; i++) {
        startingLine = answers[i].start;
        endLine = answers[i].end;
        var rng = new Range(startingLine-1, 0, endLine, 0);
        editor.session.addMarker(rng, "ace_active-line", "screen", false);
    }
    for (var i = 0; i < answers.length; i++){
        // print first one first
        var err = answers[i];
        // get the parent of this one
        //var parentofButton = closestByClass(err.reason, "dropdown left");
        //var parentId = parentofButton.querySelector(".btn-secondary").id;
        //alert(""+parentId);
        //$("#" + parentId).text(err.reason);
        addComponent(err,i+1);
    }

    // show the components
    calculateScore(answers, answers);

    // FINISH: make every button unclickable
    componentHandler.upgradeDom();
    //addListAsComponentForAnswers(answers);
}