// CRSG AUTHOR MODULE
// Author: Yusuf Avci

// Imports
import {ErrorPair} from '/codeError.js';
import levelDatas from '/author-level-texts.js';
var Range = ace.require('ace/range').Range;


// If not logged in, redirect to sign-up.
firebase.auth().onAuthStateChanged(user => {
    if(!user) {
        window.location.href = '/index.html';
    }
});

// Page load date, used for time scoring.
/**
 * Page load date.
 */
const startDate = new Date();

/**
 * Page load time. (First load)
 */
var startTime;

/**
 * Current date. Is updated when clicked submit.
 */
var dateNow;

/**
 * How many seconds have past since page loaded.
 */
var time_diff = 0;

// Get selected level's data.
/**
 * Holds data of the current level.
 */
var levelData = levelDatas[localStorage.getItem('selectedLevel')];

// Creating and setting up the editors.
/**
 * Editor that shows the reviewed code. Is read-only.
 */
const editor = setupEditor("editor_1", true, "ace/theme/monokai");

/**
 * Editor that shows the latest code.
 */
const editor2 = setupEditor("editor_2", false, "ace/theme/xcode");

/**
 * Becomes true while dragging the vertical resize bar.
 */
var vertical_dragging = false;

/**
 * Becomes true while dragging the horizontal resize bar.
 */
var horizontal_dragging = false;

/**
 * Player's total score.
 */
var score;

/**
 * Is the page reloaded.
 */
let isReloadedString = "isReloaded-" + localStorage.getItem('selectedLevel');
let isReloaded = localStorage.getItem(isReloadedString);

/**
 * Data that persists through reload.
 */
var persistData;

/**
 * Counts review rounds.
 */
var reviewCounter;

/**
 * Saves the data to local storage.
 * @param {Object} persist Data that should be saved.
 */
function savePageData(persist) {
    localStorage.setItem('persistData-' + localStorage.getItem('selectedLevel'), JSON.stringify(persist));
};

/**
 * Gets the saved data from local storage.
 */
function getPageData() {
    return JSON.parse(localStorage.getItem('persistData-' + localStorage.getItem('selectedLevel')));
};

// Automatically scroll to the bottom of the page.
var scrollingElement = (document.scrollingElement || document.body);
scrollingElement.scrollTop = scrollingElement.scrollHeight;

/**
 * Holds each review comment's visual and model data.
 */
let errors = [];

// Filling the errors array with review data.
levelData.errorDatas.forEach(data => {
    errors.push(new ErrorPair(data));
});

// If page is reloaded, get data from local storage.
if( isReloaded === 'true') {
    reloadInit();
}
// If page is new, create everything from scratch.
else {
    newInit();
}

/**
 * Used for creating and saving game metadata.
 */
function newInit( ) {
    // Create data to persist through reload.
    persistData = {};
    // Set score to zero.
    score = 0;
    // Set review counter to 2. (First review is made pre game.)
    reviewCounter = 2;
    // Start time is set to start date's time.
    startTime = startDate.getTime();

    // Save score, review counter, startTime, showSolutions and current code.
    persistData.score = score;
    persistData.reviewCounter = reviewCounter;
    persistData.startTime = startTime;
    persistData.showSolutions = false;
    persistData.code = editor2.getSession().getValue();
    persistData.levelCompleted = false;

    // Save each CodeError object.
    persistData.errorDatas = [];
    errors.forEach((i) => {
        persistData.errorDatas.push(i.errorData);
    });
    
    // Save data to localstorage.
    savePageData(persistData);
    localStorage.setItem(isReloadedString, 'true');
}

/**
 * Used to get page data from local storage.
 */
function reloadInit( ) {
    console.log("Reloaded");

    persistData = getPageData();
    console.log(persistData);

    score = persistData.score;
    reviewCounter = persistData.reviewCounter;
    startTime = persistData.startTime;
    editor2.getSession().setValue( persistData.code);

    // Set review comment datas to previous.
    for(let i = 0; i < persistData.errorDatas.length; i++) {
        (errors[i]).errorData.setAgain(persistData.errorDatas[i]);
    }

    document.getElementById('scoreInfo').innerText = score.toFixed(2);
}

/**
 * Each comment's score value.
 */
const commentScore = 100 / errors.length;

/**
 * Number of minutes without time penalty.
 */
var scoreTimeTreshold = 2 * errors.length;

/**
 * HTML element in which review comments are displayed.
 */
var errors_tab = document.getElementById("errors-list");

/**
 * Counter for counting the errors in the discussions (Review comments).
 */
var errorCount = 0;

// Highlight reviews.
errors.forEach((curErrPair) => {
    let left = curErrPair.errorData.lines[0];
    let right = curErrPair.errorData.lines[1];
    editor.session.addMarker(
        new Range(left - 1, 0, right, 0), "ace_step", "text"
    );
});

createOverallComment();
// FUNCTIONS

/**
 * Creates an overall comment and adds it to the reviews tab.
 */
function createOverallComment() {

    let overallCommentWrapper = document.createElement('div');
    overallCommentWrapper.id = "overall";
    let overallCommentCaption = document.createElement('p');
    overallCommentCaption.innerText = "Overall Comment: ";
    let overallComment = document.createElement('p');
    overallComment.id = 'overallComment';
    overallComment.style.color = '#d4b935';
    overallComment.innerText = "Needs Work.";
    overallCommentWrapper.appendChild(overallCommentCaption);
    overallCommentWrapper.appendChild(overallComment);
    overallCommentWrapper.appendChild(document.createElement('hr'));
    errors_tab.appendChild(overallCommentWrapper);
}

/**
 * Create and setup an editor.
 * @param {string} editorName Id of the html element that will become the editor. 
 * @param {boolean} readOnly Should the editor be read-only.
 * @param {string} theme Preffered theme.
 * @returns Created editor.
 */
function setupEditor(editorName, readOnly, theme) {
    // Creating the editor.
    let newEditor = ace.edit(editorName);
    // Setting the editor's code to the chosen level's code.
    newEditor.getSession().setValue(levelData.code);
    newEditor.getSession().setMode({ path: "ace/mode/java", inline: true } );

    // Setting the theme.
    newEditor.setTheme(theme);
    // Setting the read-only property.
    newEditor.setReadOnly(readOnly);

    // Enable autocompletion and snippets.
    newEditor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets           : true,
        enableLiveAutocompletion : true
    } );
    return newEditor;
}

// Works while mouse is down on horizontal dragbar.
/**
 * Resizing Code
 * Used to resize the left-side editor vertically.
 */
$('#horizontal_dragbar' ).mousedown(function (e ) {
    e.preventDefault();
    vertical_dragging = true;

    var editor_1 = $('#editor_1' );
    
    // Top of the editor.
    var top_offset = editor_1.offset().top;

    // Handle mouse movement.
    $(document ).mousemove(function (e ) {

        // Setting the editor height.
        var eheight = e.pageY - top_offset;
        
        // Below panel cannot be smaller than 20%.
        eheight = Math.min(eheight, $(window).height() * 0.80);

        // Set wrapper height
        // Leaving 5px for the resize bar.
        $('#editor_1' ).css('height', eheight - 5);
        $('#editor_1_wrap' ).css('height', eheight);
        $('#console' ).css('height', $(window).height() - eheight - 20);

        // Lower dragbar opacity while dragging.
        $('#horizontal_dragbar' ).css('opacity', 0.15 );

    } );

} );

// Used to resize the editors horizontally.
$('#vertical_dragbar' ).mousedown(function (e ) {
    e.preventDefault();
    horizontal_dragging = true;

    var editor_1 = $('#editor_1' );
    var left_offset = editor_1.offset().left;

    // handle mouse movement
    $(document ).mousemove(function (e ) {

        // Editor width.
        var ewidth = e.pageX - left_offset;

        // Limit resize.
        ewidth = Math.max(200, ewidth);
        ewidth = Math.min($(window).width() - 160, ewidth);

        // Resizing.
        $('#editor_bars_wrapper' ).css('width', ewidth);
        $('#editor_1_wrap').css('width', ewidth - 5);
        $('#editor_2').css('width', $('#multiple_editor_wrapper').width() - ewidth);
        $('#right_editor_wrap').css('width', $('#multiple_editor_wrapper').width() - ewidth);

        // Lower dragbar opacity while dragging.
        $('#vertical_dragbar' ).css('opacity', 0.15 );

    } );

} );

//$('#editor_1_wrap').css('width', $("#editor_bars_wrapper").width() - 5);

// Make second editor grow when resizing the browser.
window.onresize = () => {
    
    $('#right_editor_wrap').css('width', $('#multiple_editor_wrapper').width() - $("#editor_bars_wrapper").width());
    $('#editor_2').css('width', $("#multiple_editor_wrapper").width() - $("#editor_bars_wrapper").width());
    $('#editor_1_wrap').css('width', $("#editor_bars_wrapper").width() - 5);
    
}

//YUSUF's DEBUGGING AUXILIARY (Shows X and Y coordinates on the screen as a tooltip.)
// document.onmousemove = function(e){
//     var x = e.pageX;
//     var y = e.pageY;
//     e.target.title = "X is "+x+" and Y is "+y;
// };

// Finish resizing when mouse is up.
$(document ).mouseup(function (e ) {

    if (vertical_dragging || horizontal_dragging) {
        var editor_1 = $('#editor_1' );
        $('#horizontal_dragbar' ).css('opacity', 1 );
        $('#vertical_dragbar' ).css('opacity', 1 );
        $(document ).unbind('mousemove' );

        // Editors don't adjust itself without these functions.
        editor.resize();
        editor2.resize();
    }

} );

/**
 * Adds a review comment to the page by using the review comment data.
 * @param {ErrorPair} errorPair contains review comment data and review comment HTML element.
 * errorPair's HTML part is given empty and is filled by this function.
 */
function addDiscussion(errorPair) {

    // Data part of the error pair.
    let errorData = errorPair.errorData;

    // Creating a discussion (review comment HTML element).
    let discussion = document.createElement("div");

    // Set classname.
    discussion.className = "to-fix-error";
    // Set id.
    discussion.id = "error-" + errorCount;
    let curId = errorCount;

    // Review comment.
    let errorReason = document.createElement("p");
    errorReason.innerText = errorData.toString();
    discussion.appendChild(errorReason);
    
    /**
     * Reject review comment button.
     */
    let rejectButton = document.createElement("button");
    rejectButton.className ="mdl-button mdl-js-button mdl-button--raised mdl-button--colored";

    if(errorData.guess) {
        rejectButton.innerText = "Reject";   
    }
    else {
        rejectButton.innerText = "Accept";
        // Strike text to indicate rejection.
        errorReason.className = "striked";
    }

    /**
     * Show hint button.
     */
    let hintButton = document.createElement("button");
    hintButton.className ="mdl-button mdl-js-button mdl-button--raised mdl-button--colored";
    hintButton.innerText = "Show Hint";

    /**
     * Wraps reject and show hint buttons.
     */
    let buttonWrapper = document.createElement("div");
    buttonWrapper.className = "buttonduo";
    
    // If reject button is clicked.
    rejectButton.onclick = () => {
        
        // Toggle text reject or accept.
        if(rejectButton.innerText === "REJECT") {
            rejectButton.innerText = "Accept";

            // Strike text to indicate rejection.
            errorReason.className = "striked";
            // ToDO better naming.
            errorData.guess = false;
        }
        else {
            rejectButton.innerText = "Reject";
            errorReason.className = "";
            errorData.guess = true;
        }

        persistData.errorDatas[curId] = errorData;
        savePageData(persistData);
    };

    // Add reject button to the wrapper.
    buttonWrapper.appendChild(rejectButton);

    // If hint button is clicked.
    hintButton.onclick = () => {

        // Show a confirmation popup.
        $("#hintModal").modal('show');

        document.getElementById("hintConfirm").onclick = () => {

            // Remove the show hint button.
            buttonWrapper.removeChild(hintButton);
            // Show the hint.
            errorData.showHint = true;
            errorReason.innerText = errorData.toString();

            persistData.errorDatas[curId] = errorData;
            savePageData(persistData);
        };
    };

    if(!errorData.showHint) {
        // Add show hint button to the wrapper.
        buttonWrapper.appendChild(hintButton);
    }
    
    // Add the button wrapper to the review comment.
    discussion.appendChild(buttonWrapper);

    // Add a page brake.
    discussion.appendChild(document.createElement("hr"));
   
    // Add the review comment to the review comments tab.
    errors_tab.appendChild(discussion);

    // Set errorpair's HTML element to the created discussion.
    errorPair.errorElement = discussion;

    if(errorData.resolved) {
        errorReason.style.color = '#34eb77';
        errorReason.className = '';
        buttonWrapper.style.display = 'none';
    }
    errorCount++;
}

// Run add disscussion function for each review comment.
errors.forEach(err => {
    addDiscussion(err);
});

document.getElementById("submit-btn").onclick = () => {
    let runSource = editor2.getSession().getValue();
    
    if(runSource.includes("System")) {
        alert("Please don't use System");
        return;
    }

    dateNow = new Date ();
    runCode(insertMain(runSource));

};

document.getElementById("show-solutions").onclick = () => {
    document.getElementById("solutionScore").innerHTML = "<b>" + score.toFixed(2) + "<b>";
    $("#solutionModal").modal('show');
};

document.getElementById("solutionConfirm").onclick = () => {

    // Set editor 2 to solved.
    editor2.getSession().setValue(levelData.solution);
    editor2.setReadOnly(true);

    errors.forEach(err => {

        // Change feedback
        err.errorElement.firstChild.innerText = err.errorData.getExplanation();

        err.errorElement.removeChild(err.errorElement.firstChild.nextSibling); 
        let subButton = document.getElementById("submit-btn");
        subButton.innerText = "Go Back";
        subButton.onclick = () => {
            window.location.href = "/main.html";
        };
    });

    // Highlight solutions.
    levelData.solutionHighlights.forEach((rangex) => {
        editor2.session.addMarker(
            new Range(rangex[0] - 1, 0, rangex[1], 0), "ace_step", "text"
        );
    });
    

    document.getElementById("feedbacks").click();
    // Make show solutions non-clickable.
    document.getElementById("show-solutions").onclick = null;

    persistData.showSolutions = true;
    savePageData(persistData);
};

/**
 * If level was completed before reload, complete game.
 */
if (persistData.levelCompleted) {
    completeGame();
}
if (persistData.showSolutions) {
    document.getElementById("solutionConfirm").click();
}


/**
 * Template of the JSON object to post to judge0 API.
 */
const APIPostSettings = {
    //DON'T TOUCH HERE
	"async": true,
	"crossDomain": true,
	"url": "https://judge0.p.rapidapi.com/submissions",
	"method": "POST",
	"headers": {
		"x-rapidapi-host": "judge0.p.rapidapi.com",
		"x-rapidapi-key": j0Key,
		"content-type": "application/json",
		"accept": "application/json"
	},
	"processData": false,
};

/**
 * Template of the JSON object to send get to judge0 API.
 */
const APIGetSettings = {
    "async": true,
    "crossDomain": true,
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "judge0.p.rapidapi.com",
        "x-rapidapi-key": j0Key
    }
    // "data" will be inserted
};

/**
 * Template of the source code that will be sended to the Judge0 API.
 */
const sendData = { 
    "language_id": 62,
    // "source_code" will be inserted.
};

/**
 * Runs a Java source code, then evaluates the results and gives feedback.
 * @param {string} source Java source code. 
 */
function runCode(source) {

    // Set send data's source and add to the post settings.
    sendData.source_code = source;
    APIPostSettings.data =  JSON.stringify(sendData);

    // Post the sourec code to the API. API returns a token which is used to get the run status.
    $.ajax(APIPostSettings).done(function (response) {
        console.log(response);
        
        // Waits 3 seconds to get the result. (If token is used too early, the code will not be run.)
        setTimeout(getResult, 3000);
        
        function getResult() {
            
            // Use the response token to adjust the get request JSON.
            APIGetSettings.url =  "https://judge0.p.rapidapi.com/submissions/" + response.token;
    
            // Do a get request.
            $.ajax(APIGetSettings).done(function (finalResponse) {
                console.log(finalResponse);
                
                // If the code isn't run yet, GET again after 1 second.
                if(finalResponse.status.id == 1 || finalResponse.status.id == 2) {
                    console.log("TRYING AGAIN");
                    setTimeout(getResult, 1000);
                }
                else {

                    // Turn the page back to normal.
                    document.getElementById('multiple_editor_wrapper').style.pointerEvents = 'auto';
                    document.getElementById('multiple_editor_wrapper').style.opacity = '1';
                    showLoader(false);

                    // Use results to infer & check

                    // Holds the run status. Used to be able to change the API easily in the future.
                    let runAdapter = {
                        'compileStatus': "OK",
                        'runError': "",
                        'output': "",
                    };

                    // If runned succesfully, set the output.
                    if(finalResponse.status.id == 3) {
                        runAdapter.output = finalResponse.stdout;
                    }

                    // If there was a compilation error, set the compile status.
                    else if(finalResponse.status.id == 6) {
                        runAdapter.compileStatus = finalResponse.compile_output;
                    }
                    // If there's a runtime error, set the run error.
                    else {
                        //alert("DEBUG ONLY, CODE STATUS ID: " + finalResponse.status.id);
                        runAdapter.runError = finalResponse.stderr;
                    }

                    let runEvaluation = findCorrects(runAdapter);

                    // If code compiled do a review
                    doReview(runEvaluation);
                }
            }).fail(error => {
                alert("GET FAILED");
                console.log(error);

                document.getElementById('multiple_editor_wrapper').style.pointerEvents = 'auto';
                document.getElementById('multiple_editor_wrapper').style.opacity = '1';
                showLoader(false);
            });
        }
    }).fail(error => {
        alert("POST FAILED");
        console.log(error);

        document.getElementById('multiple_editor_wrapper').style.pointerEvents = 'auto';
        document.getElementById('multiple_editor_wrapper').style.opacity = '1';
        showLoader(false);
    });

    document.getElementById('multiple_editor_wrapper').style.pointerEvents = 'none';
    document.getElementById('multiple_editor_wrapper').style.opacity = '0.4';
    showLoader(true);

}

/**
 * Infers which review comments are solved according to run result.
 * @param {Object} runAdapter Run data from API (Reformatted).
 */
function findCorrects(runAdapter) {
    
    console.log("Find Correct Starts");
    console.log(runAdapter);
    
    let runEvaluation = {};

    if (runAdapter.compileStatus === "OK") {
        if (runAdapter.runError === "") {

            document.getElementById("consoleText").innerText = "Compiled Successfully.";

            runEvaluation.compiled = true;
            let correctness = [];
            runEvaluation.correctness = correctness;

            // Slit run output to lines.
            let output = runAdapter.output.split("\n");
            output.pop();
            console.log(output);

            let currentCorrect = true;
            output.forEach(outputLine => {
                console.log('current correct: ' + currentCorrect);

                if (isNaN(outputLine)) {
                    if(outputLine === 'false') {
                        currentCorrect = false;
                    }
                }
                else {
                    correctness[parseInt(outputLine)] = currentCorrect;
                    currentCorrect = true;
                }
            });
        }
        else {
            // If there is an uncaught runtime error, show error in error console.
            document.getElementById("consoleText").innerText = runAdapter.runError;
            runEvaluation.compiled = false;
            console.log(runAdapter.compileStatus);
        }
    }
    else {
        // If there is a compile time error, show error in error console.
        document.getElementById("consoleText").innerText = runAdapter.compileStatus;
        runEvaluation.compiled = false;
        console.log(runAdapter.compileStatus);
    }

    console.log(runEvaluation);
    return runEvaluation;
}

/**
 * Uses runEvaluation to create feedbacks.
 * @param {Object} runEvaluation Used to create feedbacks.
 */
function doReview(runEvaluation) {
    let dangerWarn = false;

    // If there is an error, show on the error console.
    if (!runEvaluation.compiled) {
        alert("Runtime or Compilation Error");
        document.getElementById("errorOutput").click();
        return;
    }

    let correctness = runEvaluation.correctness;
    let time_now = dateNow.getTime ();
    time_diff = time_now - startTime;

    for(let i = 0; i < errors.length; i++) {
        let err = errors[i];

        let previouslyUnsolved = !err.errorData.resolved;
        console.log(err);

        if (err.errorData.isTrueError) {
            if (!err.errorData.guess) {
                err.errorData.checkAnswer(false, reviewCounter, time_diff, scoreTimeTreshold, commentScore);
            }
            else {
                err.errorData.checkAnswer(correctness[i], reviewCounter, time_diff, scoreTimeTreshold, commentScore);
            }
        }
        else {
            err.errorData.checkAnswer(!err.errorData.guess, reviewCounter, time_diff, scoreTimeTreshold, commentScore);
        }

        if(err.errorData.updatedResolved && previouslyUnsolved) {
            err.action = 'hide';            
        }
        else if(!err.errorData.updatedResolved && !previouslyUnsolved) {
            err.action = 'show';
            dangerWarn = true;
        }
        else {
            err.action = null;
        }
    }

    if (dangerWarn) {
        $("#submitModal").modal('show');   
    }
    else {
        acceptChanges();
    }
}

document.getElementById("submitConfirm").onclick = () => {
    acceptChanges();
}

/**
 * Complete the commit. Update the score, feedbacks.
 */
function acceptChanges() {

    // Set score to zero before recalculation.
    score = 0;
    // Save latest code for reload.
    persistData.code = editor2.getSession().getValue();

    // If level completed stays true, game will be completed.
    let levelCompleted = true;
    let resolvedStore = [];
    let hintStore = [];

    for(let i = 0; i < errors.length; i++) {
        let err = errors[i];

        err.errorData.updateFeedback();

        resolvedStore.push( err.errorData.resolved);
        hintStore.push( err.errorData.showHint);

        // If one of the errors is not resolved, levelCompleted becomes false.
        if (!err.errorData.resolved) {
            levelCompleted = false;
        }

        // Recalculate score.
        score += err.errorData.currentScore;

        // Update the feedback text.
        err.errorElement.firstChild.innerText = err.errorData.toString();

        // Update score text.
        document.getElementById('scoreInfo').innerText = score.toFixed(2);

        // Hide show hint and reject buttons.
        if (err.action === 'hide') {
            err.errorElement.firstChild.style.color = '#34eb77';
            err.errorElement.firstChild.className = '';
            err.errorElement.firstChild.nextSibling.style.display = 'none';
        }
        // Show show hint and reject buttons.
        else if (err.action === 'show') {
            err.errorElement.firstChild.nextSibling.style.display = 'block';
        }
    
        // Save review comment data.
        persistData.errorDatas[i] = err.errorData;
    }

    if (levelCompleted) {
        completeGame();

        persistData.levelCompleted = levelCompleted;
    }

    // Change focus to reviews.
    document.getElementById("feedbacks").click();

    // Increment review counter.
    reviewCounter++;

    // Save page datas. (for reload)
    persistData.reviewCounter = reviewCounter;
    persistData.score = score;
    savePageData(persistData);

    // Save to database.
    let user = firebase.auth().currentUser;
    let userId = user.uid;
    let database = firebase.database();
    let newPostRef = database.ref('author-game/' + userId).push();
    newPostRef.set({
        level: localStorage.getItem('selectedLevel'),
        round: reviewCounter - 2,
        score: score,
        timeSpend: time_diff / 1000,
        hintUses: hintStore,
        resolved: resolvedStore,
        levelCompleted: levelCompleted,
        shownSolution: persistData.showSolutions,
    });
}

/**
 * Inserts a main function that tests the code to the source code.
 * @param {string} code Source code.
 * @returns Resulting code. 
 */
function insertMain (code) {
    // var insertHere = code.lastIndexOf("}");

    // return code.slice(0, insertHere) + levelData.test + "}";

    return levelData.test + code;
}

/**
 * Updates the above timer bar once per second.
 * @function
 */
var timeUpdate = () => {

    // Get current time.
    let date_now = new Date ();
    let time_now = date_now.getTime ();
    let time_diff2 = time_now - startTime;

    // Calculate remaining time (or penalized).
    let passedSeconds = Math.floor(time_diff2 / 1000 );
    let remainingTime = scoreTimeTreshold * 60 - passedSeconds;

    // Update Time Display.
    let msg = "Remaining Time: ";
    if (remainingTime <= 0 ) {
        remainingTime *= -1;
        msg = "Penalized Time: ";
    }
    let m = Math.floor (remainingTime / 60);
    let s = remainingTime % 60;

    let mx = checkTime(m);
    s = checkTime(s);
    document.getElementById('timeInfo').innerHTML = msg +
    mx + ":" + s;

    // Calculate Penalty.
    let penalty = (reviewCounter - 2) * 20;
    if(msg[0] != 'R') {
        penalty += m + 1;
    }
    // Update penalty display. 
    document.getElementById('penaltyInfo').innerText = Math.min(100, penalty);
    
    setTimeout(timeUpdate, 1000);

}
// Start time update immediately.
timeUpdate();

/**
 * Adds zero in front of numbers less than 10.
 * @param {number} i Input number.
 * @returns Resulting number as a string. 
 */
function checkTime(i) {
    if (i < 10) {i = "0" + i};
    return i;
}

/**
 * Enables/disables a spinning loader animation.
 * @param {boolean} show Should the spinner be visible. 
 */
function showLoader(show) {

    // Create and show loader.
    if (document.getElementById("loader") === null && show) {
        let loader = document.createElement("div");
        loader.id = "loader";
        document.body.appendChild(loader);
    }
    // Remove Loader
    else if(!show) {
        let loader = document.getElementById("loader");
        loader.parentNode.removeChild(loader);
    }
}

/**
 * Runned when all reviews are resolved.
 * Disables edit, disables commit, stops timer, shows a congratulations popup.
 */
function completeGame() {

    // Change overall comment.
    let overallComment = document.getElementById('overallComment');
    overallComment.innerText = "Looks good.";
    overallComment.style.color = "#6fd435";

    // Disable commit.
    let subButton = document.getElementById("submit-btn");
    subButton.innerText = "Go Back";
    subButton.onclick = () => {
        window.location.href = "/main.html";
    };

    // Disable edit.
    editor2.setReadOnly(true);

    // Stop timer.
    timeUpdate = () => {};

    // Congratulate.
    $("#congratModal").modal('show');
}