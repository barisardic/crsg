/**
 * author: Baris
 * functionality: updates the functionality of the main page- the editor. 
 */

// INITIAL SETUP
var originalDom = document.querySelector('.marketing-content-hidden');
var listInner = document.querySelector('.marketing-content-list').innerHTML;
levelChosen = localStorage.getItem('selected');
//window.localStorage.removeItem('selected');
var Range = ace.require("ace/range").Range;
var l_groundtruth_errors = []; // list of errors in the code
var ListofErrors = []; // errors submitted by the user

/**
 * UPDATE:
 * get data from firebase, 
 * update editor text, narrative text( description)
 * update exercises from db
 */
// connect to database, get exercises
var ref = firebase.database().ref('exercise');
var l_exerc_html = document.getElementsByClassName("exercises_html");

// take the data once from firebase in the first call
ref.once("value", gotData, errData)

   // function to show what to do with the data when the data has been taken
  function gotData( data){

    // get all exercises from database
    var exercises = data.val();
    // level chosen from the user once in the program
    i = levelChosen -1; 
    // extract from exercises
    var db_code =  exercises[i].code;

    // update the text in the fields by calling the "id" element
    document.getElementById( l_exerc_html[ i][ 'id']).innerHTML = db_code;
    
    // css for the editor
    var editor = ace.edit( l_exerc_html[i]['id']);
    document.getElementById( l_exerc_html[i]['id']).style.display = "block"; 
    editor.session.setMode("ace/mode/java");
    editor.setTheme("ace/theme/cobalt");
    editor.setReadOnly(true);
    editor.setFontSize(14);

    // change the narrative of the editor
    document.getElementById("narrativeText"+l_exerc_html[i]['id'].slice(6) ).style.display = "block";

    // errors
    var db_errors = exercises[i].errors;
    var hints = exercises[i].hints;
    for(var i_error =0; i_error< db_errors.length; i_error ++){
        err = new Err( db_errors[ i_error]['lines'][0], db_errors[ i_error]['lines'][1]);
        err.reason = db_errors[ i_error]['reason'];
        l_groundtruth_errors.push(err);
    }
    
  }
  // when there is an error from reading from the database
  function errData( err){
    console.log("Error");
    console.log(err)
}

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

// Initialize library and start tracking time
TimeMe.initialize({
    currentPageName: "play", // current page
    idleTimeoutInSeconds: 600 // seconds
});

/**
 * FUNCTIONALITY
 * 1. Take the lines the user submitted
 * 2. Check on error reason change or deleted. 
 * 3. Submit selected values, take score. 
 */
document.addEventListener('DOMContentLoaded', lines, false);
function lines() {
    function getLines() {
        selectionRange = editor.getSelectionRange();
        startLine = selectionRange.start.row;
        endLine = selectionRange.end.row;
        //alert("starts at : "+startLine+ "ends at : "+ endLine );
        content = editor.session.getTextRange(selectionRange);
        var selection = new Err(startLine, endLine);
        ListofErrors.push(selection);
        //alert(ListofErrors.length);
        addComponent(ListofErrors);
    }
    document.getElementById('hover').addEventListener('click', getLines, false);
};

function submitSelection() {

    // authenticate user
    var user = firebase.auth().currentUser;
    var userId = user.uid;
    //todo finsd out boolean returning checkbox value
    var database = firebase.database();

    var timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();
    //alert(answer1.toString()+"**"+ListofErrors[0].toString());
    var scoreCalc = calculateScore(answers, ListofErrors);
    //alert("total score : "+ scoreCalc[0]);

    var newPostRef = database.ref('games/' + userId).push();
    newPostRef.set({
        user: userId,
        level: levelChosen,
        submission: ListofErrors,
        score: scoreCalc[0],
        timeSpend: timeSpentOnPage
    });
    noOfanswers = answers.length;
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


function calculateScore(answers, submission) {
    var grandTruth = answers.slice();
    var score = 0;
    var exact = 0;

    for (var i = 0; i < submission.length; i++) {
        var containerIndex = i + 1;
        var reasonContainerId = "n" + containerIndex;
        var domElementToBeColored = document.getElementById(reasonContainerId);
        domElementToBeColored.style.border = "5px solid red";
        for (var j = 0; j < grandTruth.length; j++) {

            if (submission[i].start == grandTruth[j].start) {
                if (submission[i].end == grandTruth[j].end) {
                    score++;
                    var containerIndex = i + 1;
                    var reasonContainerId = "n" + containerIndex;
                    var domElementToBeColored = document.getElementById(reasonContainerId);
                    //alert(domElementToBeColored.innerHTML);
                    domElementToBeColored.style.border = "5px solid yellow";
                    if (submission[i].reason == grandTruth[j].reason) {
                        score = score + 2;
                        exact++;
                        var reasonContainerId = "n" + containerIndex;
                        var domElementToBeColored = document.getElementById(reasonContainerId);
                        domElementToBeColored.style.border = "5px solid green";
                        //delete found element , give points only once
                        grandTruth.splice(j, 1);
                    }
                }

            }

        }
    }
    var scoreAndExact = [score, exact];
    return scoreAndExact;
}
var hintCount = 0;
var snackbarContainer = document.querySelector('#demo-snackbar-example');
var showSnackbarButton = document.getElementById('hintBtn');
var handler = function(event) {
    //showSnackbarButton.style.backgroundColor = '';
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

document.getElementById('submitBtn').addEventListener('click', submitSelection, false);
document.addEventListener('click', function(e) {
    if (e.target.className == "dropdown-item" || e.target.className == "") {
        e.preventDefault();
        /* var selText = $(this).text; */
        var selText = $(event.target).text();
        var parentofButton = closestByClass(event.target, "dropdown left");
        var parentId = parentofButton.querySelector(".btn-secondary").id;
        //alert(""+parentId);
        $("#" + parentId).text(selText);
        //alert('BUTTON CLICKED'); 
        var ind = parentId.charAt(1);
        //alert(selText);
        //alert(e.target.innerHTML);
        ListofErrors[ind - 1].reason = selText;
    }
});

document.getElementById('answersBtn').addEventListener('click', answersPressed, false);
function answersPressed() {
    var Domlist = document.querySelector('.marketing-content-list');
    Domlist.innerHTML = listInner;
    //alert("child count :"+Domlist.childNodes.length);
    addListAsComponentForAnswers(answers);
    for (var i = 0; i < answers.length; i++) {
        startingLine = answers[i].start;
        endLine = answers[i].end + 1;

        var rng = new Range(startingLine, 0, endLine, 0);
        editor.session.addMarker(rng, "ace_active-line", "screen", false);
    }
}


function addComponent(ListofErrors) {
    var list = document.querySelector('.marketing-content-list');
    var mc = document.querySelector('.marketing-content-hidden');
    var newNode = mc.cloneNode(true);
    var index = ListofErrors.length;
    var e = ListofErrors[index - 1];
    var DisplayStart = e.start + 1;
    var DisplayEnd = e.end + 1;
    newNode.childNodes[1].innerHTML = "Error Lines : " + DisplayStart + "&" + DisplayEnd;
    newNode.style.display = "flex";
    var buttons = newNode.querySelector(".marketing-content-buttons");

    /* reasons = buttons.querySelector(".select2-field").querySelector(".select2");
    reasons.setAttribute("id",index);
    reasons.addEventListener("change", reasonChanged); */

    reasons2 = buttons.querySelector(".btn-secondary");
    reasons2.setAttribute("id", "c" + index);

    visibility = buttons.getElementsByTagName("button")[1];
    visibility.setAttribute("id", "v" + index);
    visibility.addEventListener("click", visibilityPressed);

    remover = buttons.getElementsByTagName("button")[2];
    remover.setAttribute("id", "r" + index);
    remover.addEventListener("click", removePressed);

    newNode.setAttribute("id", "n" + index);
    //list.insertBefore(newNode, mc.nextSibling);
    list.appendChild(newNode);
    componentHandler.upgradeDom();
    //alert(visibility.innerHTML);

    if (ListofErrors.length != 0) {
        document.getElementById("titleMsg").innerHTML = "";
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

function reasonChanged() {
    // e.reason = this.options[this.selectedIndex].text;
    //alert(this.id+" "+this.options[this.selectedIndex].text);
    //this.id
    index = this.id;
    ListofErrors[index - 1].reason = this.options[this.selectedIndex].text;
    //alert(ListofErrors[index-1].reason);
    //alert("The selection reason is now:"+ListofErrors[index-1].reason);
}

function visibilityPressed() {

    var visBtn = document.getElementById(this.id);
    // ids are in v+index form thus take the 2nd character of the id and ıd use it as index.
    index = this.id.charAt(1);
    startingLine = ListofErrors[index - 1].start;
    endLine = ListofErrors[index - 1].end;
    if (startingLine == endLine) {
        endLine++;
    }
    var rng = new Range(startingLine, 0, endLine, 0);
    //var rng = clipNodes(startLine,endLine);
    //var rng = new range(startLine,0,endLine,0);
    //alert(startingLine+"**"+endLine);
    //editor.addSelectionMarker(rng);
    //editor.updateSelectionMarkers();
    editor.session.addMarker(rng, "ace_active-line", "fullLine");
}

function removePressed() {
    // ids are in rr+index form thus take the 2nd character of the id and ıd use it as index.
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
    addListAsComponentForErrors(ListofErrors);
    //cloneList.pop;
}

function addListAsComponentForAnswers(ListofErrors) {
    var list = document.querySelector('.marketing-content-list');
    var mc = document.querySelector('.marketing-content-hidden');
    for (index = ListofErrors.length; index > 0; index--) {
        var newNode = mc.cloneNode(true);
        var e = ListofErrors[index - 1];
        var DisplayStart = e.start + 1;
        var DisplayEnd = e.end + 1;
        newNode.childNodes[1].innerHTML = "Error Lines : " + DisplayStart + "&" + DisplayEnd;
        newNode.style.display = "flex";
        var buttons = newNode.querySelector(".marketing-content-buttons");

        /*  reasons = buttons.querySelector(".select2-field").querySelector(".select2");
         reasons.setAttribute("id",index);
         reasons.addEventListener("change", reasonChanged); */

        reasons2 = buttons.querySelector(".btn-secondary");
        reasons2.disabled = true;
        reasons2.setAttribute("id", "c" + index);
        reasons2.innerHTML = answers[index - 1].reason;

        visibility = buttons.getElementsByTagName("button")[1];
        visibility.setAttribute("id", "v" + index);
        visibility.addEventListener("click", visibilityPressed);
        newNode.setAttribute("id", "n" + index);
        /* remover = buttons.getElementsByTagName("button")[2];
        remover.setAttribute("id","r"+index);
        remover.addEventListener("click",removePressed); */

        document.addEventListener('click', function(e) {
            if (e.target.className == "dropdown-item") {
                //alert('BUTTON CLICKED');
            }
        })

        //list.insertBefore(newNode, mc.nextSibling);
        list.appendChild(newNode);
    }
    componentHandler.upgradeDom();
    //alert(visibility.innerHTML);

}

function addListAsComponentForErrors(ListofErrors) {
    var list = document.querySelector('.marketing-content-list');
    var mc = document.querySelector('.marketing-content-hidden');
    for (index = ListofErrors.length; index > 0; index--) {
        var newNode = mc.cloneNode(true);
        var e = ListofErrors[index - 1];
        var DisplayStart = e.start + 1;
        var DisplayEnd = e.end + 1;
        newNode.childNodes[1].innerHTML = "Error Lines : " + DisplayStart + "&" + DisplayEnd;
        newNode.style.display = "flex";
        var buttons = newNode.querySelector(".marketing-content-buttons");

        /*  reasons = buttons.querySelector(".select2-field").querySelector(".select2");
         reasons.setAttribute("id",index);
         reasons.addEventListener("change", reasonChanged); */

        reasons2 = buttons.querySelector(".btn-secondary");
        reasons2.setAttribute("id", "c" + index);
        reasons2.innerHTML = ListofErrors[index - 1].reason;

        visibility = buttons.getElementsByTagName("button")[1];
        visibility.setAttribute("id", "v" + index);
        visibility.addEventListener("click", visibilityPressed);

        remover = buttons.getElementsByTagName("button")[2];
        remover.setAttribute("id", "r" + index);
        remover.addEventListener("click", removePressed);
        newNode.setAttribute("id", "n" + index);
        document.addEventListener('click', function(e) {
            if (e.target.className == "dropdown-item") {
                //alert('BUTTON CLICKED');
            }
        })

        //list.insertBefore(newNode, mc.nextSibling);
        list.appendChild(newNode);
    }
    if (ListofErrors.length == 0) {
        document.getElementById("titleMsg").innerHTML = '<h3 id="titleMsg">Defects you find will go here!</h3>';
    }
    componentHandler.upgradeDom();
    //alert(visibility.innerHTML);

}