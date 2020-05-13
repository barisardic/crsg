var originalDom = document.querySelector('.marketing-content-hidden');
var listInner = document.querySelector('.marketing-content-list').innerHTML;
levelChosen = localStorage.getItem('selected');
console.log(""+levelChosen);
//window.localStorage.removeItem('selected');
var Range = ace.require("ace/range").Range;

if (levelChosen == 1) {
    document.getElementById("editor").style.display = "block";
    document.getElementById("narrativeText1").style.display = "block";
    var editor = ace.edit("editor");
    var code = document.querySelector("editor");
    editor.setTheme("ace/theme/dracula2");
    editor.session.setMode("ace/mode/java");
    editor.setReadOnly(true);
} else if (levelChosen == 2) {
    document.getElementById("editor2").style.display = "block";
    document.getElementById("narrativeText2").style.display = "block";
    var editor = ace.edit("editor2");
    var code = document.querySelector("editor2");
    editor.setTheme("ace/theme/dracula2");
    editor.session.setMode("ace/mode/java");
    editor.setReadOnly(true);
} else if (levelChosen == 3) {
    document.getElementById("editor3").style.display = "block";
    document.getElementById("narrativeText3").style.display = "block";
    var editor = ace.edit("editor3");
    var code = document.querySelector("editor3");
    editor.setTheme("ace/theme/dracula2");
    editor.session.setMode("ace/mode/java");
    editor.setReadOnly(true);
} else if (levelChosen == 4) {
    document.getElementById("editor4").style.display = "block";
    document.getElementById("narrativeText4").style.display = "block";
    var editor = ace.edit("editor4");
    var code = document.querySelector("editor4");
    editor.setTheme("ace/theme/dracula2");
    editor.session.setMode("ace/mode/java");
    editor.setReadOnly(true);
} else if (levelChosen == 5) {
    document.getElementById("editor5").style.display = "block";
    document.getElementById("narrativeText5").style.display = "block";
    var editor = ace.edit("editor5");
    var code = document.querySelector("editor5");
    editor.setTheme("ace/theme/dracula2");
    editor.session.setMode("ace/mode/java");
    editor.setReadOnly(true);
} else if (levelChosen == 6) {
    document.getElementById("editor6").style.display = "block";
    document.getElementById("narrativeText5").style.display = "block";
    var editor = ace.edit("editor6");
    var code = document.querySelector("editor6");
    editor.setTheme("ace/theme/dracula2");
    editor.session.setMode("ace/mode/java");
    ğ
    editor.setReadOnly(true);
}
editor.setFontSize(18);
// if user saw answers to a level disable the submit button
// first check if the asnwers to the level are seen or not in submission button listener

// open Stella when the level DOM is finished loading:
window.onload = openGuruModal();

// Initialize library and start tracking time
TimeMe.initialize({
    currentPageName: "play", // current page
    idleTimeoutInSeconds: 3600 // seconds
});
// Executes the first 5 times a user leaves the page
TimeMe.callWhenUserLeaves(function () {
    console.log("The user is not currently viewing the page!");
    console.time("inactive");
    start = new Date().getTime();
}, 5);

// Executes every time a user returns
TimeMe.callWhenUserReturns(function () {
    console.log("The user has come back!");
    console.timeEnd("inactive");
    elapsed = (new Date().getTime() - start) / 1000;
    //alert("You have been away for :"+ elapsed+" seconds!");
    if(elapsed>60){
        var userAwayData = {
            message: "You have been away for : " + elapsed + " seconds!",
            timeout: 10000,
            actionHandler: handler,
            actionText: ' '
        };
        snackbarContainer.MaterialSnackbar.showSnackbar(userAwayData); 
    }
    
}, 5);
// custom error object for user to select/save the errors in the code.
class Err {
    constructor(start, end) {
        this.start = start;
        this.end = end;
        this.reason = [];
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

if (levelChosen == 1) {
    var answers = [];
    var answer1 = new Err(4, 4);
    answer1.reason.push("Comments");
    answers[0] = answer1;

    var answer2 = new Err(8, 11);
    answer2.reason.push("Duplication");
    answer2.reason.push("Consistency");
    answers[1] = answer2;

    var answer3 = new Err(18, 19);
    answer3.reason.push("Parameter");
    answers[2] = answer3;
    
    var hints = ["There are " + answers.length + " defects in the code", "Duplication error at lines 9-12", "Parameter error at lines 19-20", "Comments error at line 5"];
    var GurusWords = ["Better Pull Requests lead to better reviews. Make sure commit messages and PR descriptions are informative.",
        "Prior to the code review, use a static-code analyzer tool to eliminate errors detectable by machines. Automate to save time.",
        "Accept that many programming decisions are opinions. Discuss tradeoffs, which you prefer, and reach a resolution quickly.",
        "Ask good questions; don't make demands. ('What do you think about naming this :user_id?')",
        "Good questions avoid judgment and avoid assumptions about the author's perspective.",
        "----------- >>END OF TRANSMISSION!<<----------- Click out of the log to return to the editor!"
    ];
    answersExplnatation = ["Once you press <strong>SEE ANSWERS</strong>, explanations for the defects’ reasons will be written here, so do not forget to check this tab when you are confused about the nature of the answers!"];
    
} else if (levelChosen == 2) {
    var answers = [];
    var answer1 = new Err(25, 27);
    answer1.reason.push("Duplication");
    answers[0] = answer1;

    var answer2 = new Err(33, 35);
    answer2.reason.push("Indentation");
    answers[1] = answer2;

    var answer3 = new Err(44, 44);
    answer3.reason.push("Long line");
    answers[2] = answer3;

    var answer4 = new Err(39, 39);
    answer4.reason.push("Compare");
    answer4.reason.push("Data and resource manipulation");
    answers[3] = answer4;

    var hints = ["There are " + answers.length + " defects in the code", "Focus on the styling aspects of the code", "Consider looking for string equality violations", "Copy pasting is harmful"];
    var GurusWords = ["As a reviewer, you are there to review code not to update the author’s code.",
        "No matter how senior the developer is, everyone needs to review and be reviewed. Include everyone in the code review process.",
        "Ask for clarification. ('I didn't understand. Can you clarify?')",
        "Avoid selective ownership of code. ('mine', 'not mine', 'yours')",
        "Avoid using terms that could be seen as referring to personal traits. ('dumb', 'stupid'). Assume everyone is intelligent and well-meaning.",
        "----------- >>END OF TRANSMISSION!<<----------- Click out of the log to return to the editor!"
    ];
    answersExplnatation = ["<strong>Line 26-28</strong><br> The same function already exists above.", 
                            "<strong>Line 34-36</strong><br> The indentation of the getColor() method is wrong with an extra tab.",
                            "<strong>Line 40-40</strong><br> You should not use '==' (equality operator) to compare these strings as they compare the reference of the string, i.e. whether they are the same object or not.",
                            "<strong>Line 45-45</strong><br> This line is too long. It can be easily made into a multi-line statement using line breaks.",
                            ];
} else if (levelChosen == 3) {
    var answers = [];
    var answer1 = new Err(17, 17);
    answer1.reason.push("Data and resource manipulation");
    answers[0] = answer1;

    var answer2 = new Err(18, 18);
    answer2.reason.push("Data and resource manipulation");
    answers[1] = answer2;

    var answer3 = new Err(30, 30);
    answer3.reason.push("Compare");
    answers[2] = answer3;

    var answer4 = new Err(13, 13);
    answer4.reason.push("Data and resource manipulation");
    answers[3] = answer4;

    var hints = ["There are " + answers.length + " defects in the code", "Pay close attention to comparisons", "Sadly, mistakes can be repeted ", "There are some things in OO languages that are always more dangerous"];
    var GurusWords = ["You should not merge code while the discussions are still taking place.",
        "Offer alternative implementations, but assume the author already considered them. ('What do you think about using a custom validator here?')",
        "Be explicit. Remember people don't always understand your intentions online.",
        "Be humble. ('I'm not sure - let's look it up.')",
        "Don't use hyperbole. ('always', 'never', 'endlessly', 'nothing')",
        "----------- >>END OF TRANSMISSION!<<----------- Click out of the log to return to the editor!"
    ];
    answersExplnatation = ["<strong>Line 14-14</strong><br> Collections.reverse() would permanently manipulate the parameter. Instead, parameters should be copied before performing such operations to avoid bad data manipulations.",
                            "<strong>Line 18-18</strong><br> In the case the if statement rejects, the integer is set to null. Assigning null to variables is a bad data manipulation practice and should be avoided in favour of more type-friendly alternatives.",
                            "<strong>Line 19-19</strong><br> Defect identical to that at line 18.",
                            "<strong>Line 31-31</strong><br> Carry cannot be equal to 0. The wrong comparison operator is being used."
                            ];
} else if (levelChosen == 4) {
    var answers = [];
    var answer1 = new Err(12, 12);
    answer1.reason.push("Data and resource manipulation");
    answer1.reason.push("Algorithm/Performance");
    answers[0] = answer1;

    var answer2 = new Err(21, 21);
    answer2.reason.push("Algorithm/Performance");
    answer2.reason.push("Data and resource manipulation");
    answers[1] = answer2;

    var answer3 = new Err(31, 31);
    answer3.reason.push("Data and resource manipulation");
    answer3.reason.push("Compute");
    answer3.reason.push("Variable initialisation");
    answers[2] = answer3;

    var hints = ["There are " + answers.length + " defects in the code", "Pay close attention to indexes", "How does java handle 2D arrays?"];
    var GurusWords = ["The best person to review the code should be the person in your team who is likely to find errors in that code.",
        "Seek to understand the author's perspective.",
        "Don't use sarcasm.",
        "Keep it real. If emoji, animated gifs, or humor aren't you, don't force them. If they are, use them with aplomb.",
        "Talk synchronously (e.g. chat, screensharing, in person) if there are too many 'I didn't understand' or 'Alternative solution:' comments. Post a follow-up comment summarizing the discussion.",
        "----------- >>END OF TRANSMISSION!<<----------- Click out of the log to return to the editor!"
    ];
    answersExplnatation = ["<strong>Line 13-13</strong><br> In the given parameter, i is the row index, j is the column index. They should be swapped in order to retrieve matrix values in the correct order and avoid bad data placement.",
                            "<strong>Line 22-22</strong><br> Defect identical to that at line 13.",
                            "<strong>Line 32-32</strong><br> Indexing is wrong, the column number should be determined by mat[0].length to avoid miscomputing the column.",
                            ];
} else if (levelChosen == 5) {
    var answers = [];
    var answer1 = new Err(5, 5);
    answer1.reason.push("Element Type");
    answer1.reason.push("Variable initialisation");
    answers[0] = answer1;

    var answer2 = new Err(7, 7);
    answer2.reason.push("Immutable");
    answers[1] = answer2;

    var answer3 = new Err(9, 9);
    answer3.reason.push("Compare");
    answers[2] = answer3;

    var answer4 = new Err(16, 22);
    answer4.reason.push("Data and resource manipulation");
    answers[3] = answer4;

    var answer5 = new Err(29, 29);
    answer5.reason.push("Algorithm/Performance");
    answers[4] = answer5;

    var answer6 = new Err(28, 35);
    answer6.reason.push("Compare");
    answers[5] = answer6;

    var hints = ["There are " + answers.length + " defects in the code", "If a line of code is missing you should select the nearest encapsulating object structure", "Is java dynamically typed?"];
    var GurusWords = ["If you don’t have time or expertise for the review, do let the author know, so that another reviewer could be assigned to the code review.",
        "Sign off on the pull request with a thumbs up or 'Ready to merge' comment.",
        "Communicate which ideas you feel strongly about and those you don't.",
        "Identify ways to simplify the code while still solving the problem.",
        "If discussions turn too philosophical or academic, move the discussion offline to a regular Friday afternoon technique discussion. In the meantime, let the author make the final decision on alternative implementations.",
        "----------- >>END OF TRANSMISSION!<<----------- Click out of the log to return to the editor!"
    ];
    answersExplnatation = ["<strong>Line 6-6</strong><br> listOfPrimes is not provided with an element type for its elements, therefore it would accept unintended types.",
                            "<strong>Line 8-8</strong><br> 'String' is an immutable type in Java, to perform a manipulation operation we need an assignment in the likes of 'a = a.upperCase();'.",
                            "<strong>Line 10-10</strong><br> ‘number’ overflows back to 0 when Integer.MAX_VALUE is reached, making the for loop begin again. This causes the for statement to loop indefinitely due to a broken comparison.",
                            "<strong>Line 17-23</strong><br> The first switch case misses a break, which causes the program to print ‘Largest prime integer is bigger than 2^30’ in addition to ‘Largest prime integer is not bigger than 2^30’ whenever just the latter is meant to be printed, which is a mismanagement of data flow.",
                            "<strong>Line 29-36</strong><br> ‘isPrime’ does not check ‘number’ below 2, and marks it as a prime, making this a bad comparison.",
                            "<strong>Line 30-30</strong><br> The loop counting all the way up to ‘number’ is a wasteful/suboptimal algorithm, since counting just up to the square root of ‘number’ is enough.",
                            ];
}
var ListofErrors = [];

//gurus code start here!
guruCount = 0;

document.getElementById('guru').addEventListener('click', openGuruModal, false);

function openGuruModal() {
    //alert("Here guru guru");
    editor.renderer.setShowGutter(false);
    document.getElementById("overlay").style.display = "block";
    document.getElementById('guru_modal').classList.add("visible");
}

/* $(".js-open-modal").click(function(){
  $(".guru_modal").addClass("visible");
}); */

//document.getElementById("guruSays").innerText = GurusWords[0]

document.getElementById('js-close-modal').addEventListener('click', closeGuruModal, false);

function closeGuruModal() {
    editor.renderer.setShowGutter(true);
    document.getElementById("overlay").style.display = "none";
    document.getElementById('guru_modal').classList.remove("visible");
}
/* $(".js-close-modal").click(function(){
  $(".guru_modal").classList.remove("visible");
}); */
var guruArray = ["astroAlertAnim.gif", "astroCuriousAnim.gif", "astroHappyAnim.gif"];

function displayGuruImage() {
    var num = Math.floor(Math.random() * 3); // 0...6
    document.guruPortrait.src = '../assets/' + guruArray[num];
}

var typeSound = document.getElementById("guruType");


document.getElementById('guru_modal').addEventListener('click', clickedOnGuru, false);

function clickedOnGuru() {
    displayGuruImage();

    document.getElementById('guru_modal').classList.add("toBlue");
    document.getElementById("guruSays").innerHTML = "";
    var str = GurusWords[guruCount % GurusWords.length];
    // this jquery snippet is for the typewriter effect, if you dont want it, dont reset innerhtml set it to GurusWords. 
    var spans = '<span >' + str.split('').join('</span ><span>') + '</span>';
    $(spans).hide().appendTo('.guruSays').each(function (i) {
        typeSound.play();
        typeSound.playbackRate=11;
        //typeSound.loop = true;
        $(this).addClass( "guruSaid" );
        $(this).delay(5 * i).css({
            display: 'inline',
            opacity: 0
        }).animate({
            opacity: 1
        }, 100);
    });

    guruCount = guruCount + 1;
}

/* $(".guru_modal").click(function(){
  guruCount = guruCount +1;
  $(".guru_modal").addClass("toBlue");
  document.getElementById("guruSays").innerText = words[guruCount%3];
}); */

$(document).click(function (event) {
    
    //if you click on anything except the modal itself or the "open modal" link, close the modal
    //console.log(event.target);
    if (!$(event.target).closest(".guru_modal,.js-open-modal,.guruSays,.guru,.guruSaid").length) {
        editor.renderer.setShowGutter(true);
        document.getElementById("overlay").style.display = "none";
        typeSound.pause();
        $("body").find(".guru_modal").removeClass("visible");
    }
});


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
var previousHighScore = 0;
function submitSelection() {
    var user = firebase.auth().currentUser;
    var userId = user.uid;
    var database = firebase.database();
    answersSeenLevelToRead = "level" + String(levelChosen);
     var seenRef = database.ref('users/' + userId + "/answersSeen/" + answersSeenLevelToRead);
        seenRef.once('value', function (snapshot) {
            answersSeenBefore = snapshot.val();
            evaluateSelection(answersSeenBefore);
    });
    
    
}
function evaluateSelection(seen){
    if(seen == 1){
        alert("You saw the answers therefore can not submit again");
    }
    else{
        var timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();
        //alert(answer1.toString()+"**"+ListofErrors[0].toString());
        var scoreCalc = calculateScore(answers, ListofErrors);
        //alert("total score : "+ scoreCalc[0]);
        var user = firebase.auth().currentUser;
        var userId = user.uid;
        var database = firebase.database();
        var newPostRef = database.ref('games/' + userId).push();
        newPostRef.set({
            user: userId,
            level: levelChosen,
            submission: ListofErrors,
            score: scoreCalc[0],
            timeSpend: timeSpentOnPage

        });
        previousHighScoreLevelToRead = "level" + String(levelChosen);
        var highScoreRef = database.ref('users/' + userId + "/scores/" + previousHighScoreLevelToRead);
        highScoreRef.once('value', function (snapshot) {
            previousHighScore = snapshot.val();

        });
        //update the high score if new score is higher

        if (scoreCalc[0] > previousHighScore) {
            var userScoreRef = database.ref('users/' + userId + "/scores");
            userScoreRef.child(previousHighScoreLevelToRead).set(scoreCalc[0]);

            userScoreRef.once('value', function (snapshot) {
                var newHighScoreSumLocal = 0;
                snapshot.forEach(function (childSnapshot) {
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
        maxScore = 3 * noOfanswers;
        var gameMetaData = {
            message: "There were " + noOfanswers + " mistakes. You got " + scoreCalc[1] + "  exactly right! Score : " + scoreCalc[0] + "/" + maxScore,
            timeout: 12000,
            actionHandler: handler,
            actionText: ' '
        };
        snackbarContainer.MaterialSnackbar.showSnackbar(gameMetaData);
        // open answers button
        var answersButton = document.getElementById("answersBtn");
        answersButton.style.opacity = 1;
        answersButton.style.cursor = "auto";
        answersButton.style.pointerEvents = "all";
    }
        //todo finsd out boolean returning checkbox value
}

function calculateScore(answers, submission) {
    var grandTruth = answers.slice();
    var score = 0;
    var exact = 0;

    for (var i = 0; i < submission.length; i++) {
        var containerIndex = i + 1;
        var reasonContainerId = "n" + containerIndex;
        var domElementToBeColored = document.getElementById(reasonContainerId);
        domElementToBeColored.style.background = "#ff000088";
        for (var j = 0; j < grandTruth.length; j++) {

            if (submission[i].start == grandTruth[j].start) {
                if (submission[i].end == grandTruth[j].end) {
                    score++;
                    var containerIndex = i + 1;
                    var reasonContainerId = "n" + containerIndex;
                    var domElementToBeColored = document.getElementById(reasonContainerId);
                    //alert(domElementToBeColored.innerHTML);
                    domElementToBeColored.style.background = "#fbff0088";
                    //alert(""+grandTruth[j].reason.length);
                    console.log("grandlen "+grandTruth.length+"-"+grandTruth);
                    console.log(""+grandTruth[j].reason+"len"+ grandTruth[j].reason.length);
                    for (t = 0; t < grandTruth[j].reason.length; t++) {
                    
                        if (submission[i].reason == grandTruth[j].reason[t]) {
                            score = score + 2;
                            exact++;
                            var reasonContainerId = "n" + containerIndex;
                            var domElementToBeColored = document.getElementById(reasonContainerId);
                            domElementToBeColored.style.background = "#00ff2a88";
                            //delete found element , give points only once
                            grandTruth.splice(j, 1);
                            
                        }
                        if(grandTruth.length==0 || grandTruth.length==j){
                            console.log("no more answers to eval");
                            break;
                        }
                        
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
var handler = function (event) {
    //showSnackbarButton.style.backgroundColor = '';
};
showSnackbarButton.addEventListener('click', function () {
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
document.addEventListener('click', function (e) {
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
        editor.session.addMarker(rng, "ace_step", "screen", false);
    }
    answersSeenLevelToRead = "level" + String(levelChosen);
    // Change level description with the answers explanations:
    document.getElementById("narrativeText"+levelChosen).innerHTML = "";
    createAnswerExpTable(answersExplnatation);
    // tell DB that the user has seen the answers to this level of the game.
    var database = firebase.database();
    var user = firebase.auth().currentUser;
    var userId = user.uid;
    var seenRef = database.ref('users/' + userId + "/answersSeen/" + answersSeenLevelToRead);
    seenRef.set("1");
}

function createAnswerExpTable(tableData) {
    var table = document.createElement('table');
    var row = {};

    for(i =0 ; i<tableData.length;i++){
        row = table.insertRow(i);
        cell = row.insertCell(0);
        cell.innerHTML= tableData[i];
    }
    document.getElementById("narrativeText"+levelChosen).appendChild(table);
  }
  
function addComponent(ListofErrors) {
    var list = document.querySelector('.marketing-content-list');
    var mc = document.querySelector('.marketing-content-hidden');
    var newNode = mc.cloneNode(true);
    var index = ListofErrors.length;
    var e = ListofErrors[index - 1];
    var DisplayStart = e.start + 1;
    var DisplayEnd = e.end + 1;
    newNode.childNodes[1].innerHTML = "Error Lines : " + DisplayStart + "-" + DisplayEnd;
    newNode.style.display = "flex";
    newNode.childNodes[1].style.fontSize = "large";

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

/*     if (ListofErrors.length != 0) {
        document.getElementById("titleMsg").innerHTML = "";
    } */

}
var closestByClass = function (el, clazz) {
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
    editor.session.addMarker(rng, "ace_step", "screen");
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
var isGuideBig = false;
document.getElementById('arrow_resizer').addEventListener('click', resizeGuideSection, false);

function resizeGuideSection() {
    toResize = document.getElementById('leftBottom')
    toShrink = document.getElementById('leftTop')

    if (isGuideBig) { //then we will shrink it
        toResize.style.height = "50%";
        toShrink.style.height = "50%";
        isGuideBig = false;
        document.getElementById('arrow_resizer').innerHTML = "keyboard_arrow_up"
    } else { // it small so button press should enlarge it
        toResize.style.height = "96%";
        toShrink.style.height = "3%";
        //alert("trying hard here")
        isGuideBig = true;
        document.getElementById('arrow_resizer').innerHTML = "keyboard_arrow_down"
    }
    componentHandler.upgradeDom();
}

function addListAsComponentForAnswers(ListofErrors) {
    var list = document.querySelector('.marketing-content-list');
    var mc = document.querySelector('.marketing-content-hidden');
    for (index = ListofErrors.length; index > 0; index--) {
        var newNode = mc.cloneNode(true);
        var e = ListofErrors[index - 1];
        var DisplayStart = e.start + 1;
        var DisplayEnd = e.end + 1;
        newNode.childNodes[1].innerText = "Error Lines : " + DisplayStart + "-" + DisplayEnd;
        newNode.style.display = "flex";
        newNode.childNodes[1].style.setFontSize = "12px";
        var buttons = newNode.querySelector(".marketing-content-buttons");

        /*  reasons = buttons.querySelector(".select2-field").querySelector(".select2");
         reasons.setAttribute("id",index);
         reasons.addEventListener("change", reasonChanged); */

        reasons2 = buttons.querySelector(".btn-secondary");
        reasons2.disabled = true;
        reasons2.setAttribute("id", "c" + index);
        //index-1 to start from the 0 index in answers[].
        reasons2.innerHTML = answers[index - 1].reason;

        visibility = buttons.getElementsByTagName("button")[1];
        visibility.setAttribute("id", "v" + index);
        visibility.addEventListener("click", visibilityPressed);
        newNode.setAttribute("id", "n" + index);
        /* remover = buttons.getElementsByTagName("button")[2];
        remover.setAttribute("id","r"+index);
        remover.addEventListener("click",removePressed); */

        document.addEventListener('click', function (e) {
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
        newNode.childNodes[1].innerText = "Error Lines : " + DisplayStart + "-" + DisplayEnd;
        newNode.style.display = "flex";
        newNode.childNodes[1].style.setFontSize = "12px";
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
        document.addEventListener('click', function (e) {
            if (e.target.className == "dropdown-item") {
                //alert('BUTTON CLICKED');
            }
        })

        //list.insertBefore(newNode, mc.nextSibling);
        list.appendChild(newNode);
    }
/*     if (ListofErrors.length == 0) {
        document.getElementById("titleMsg").innerHTML = '<h3 id="titleMsg">Defects you find will go here!</h3>';
    } */
    componentHandler.upgradeDom();
    //alert(visibility.innerHTML);

}