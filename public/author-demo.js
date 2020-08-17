// CRSG AUTHOR MODULE
// Author: Yusuf Avci

// GLOBALS
var levelData = levelDatas[localStorage.getItem('selectedLevel')];

// Creating the editors.
var editor = setupEditor( "editor_1", true, "ace/theme/monokai");
var editor2 = setupEditor( "editor_2", false, "ace/theme/xcode");
var Range = ace.require('ace/range').Range // get reference to ace/range
// Becomes true while dragging a bar.
var vertical_dragging = false;
var horizontal_dragging = false;

// Player's total score.
var score = 0;

// Page load date
var startDate = new Date();
var startTime = startDate.getTime();

// CODE INIT

//Scroll to the bottom
var scrollingElement = (document.scrollingElement || document.body);
scrollingElement.scrollTop = scrollingElement.scrollHeight;


let errors = [];
levelData.errorDatas.forEach( data => {
    errors.push(new ErrorPair(data));
});

// Each comment's worth.
var commentScore = 100 / errors.length;
// Time in which there is no penalty.
var scoreTimeTreshold = 2 * errors.length;

// Getting the tab to show the errors.
var errors_tab = document.getElementById("errors-list");
var errorCount = 0;

// FUNCTIONS

// Editor setup.
function setupEditor( editorName, readOnly, theme) {
    // Setting the editor text to initial text.
    let newEditor = ace.edit( editorName);
    newEditor.getSession().setValue(levelData.code);
    newEditor.getSession().setMode( { path: "ace/mode/java", inline: true } );

    newEditor.setTheme(theme);
    newEditor.setReadOnly( readOnly);

    // enable autocompletion and snippets
    newEditor.setOptions( {
        enableBasicAutocompletion: true,
        enableSnippets           : true,
        enableLiveAutocompletion : true
    } );
    return newEditor;
}

// Resizing code.
// Horizontal dragbar movement.
$( '#horizontal_dragbar' ).mousedown( function ( e ) {
    e.preventDefault();
    window.vertical_dragging = true;

    var editor_1 = $( '#editor_1' );
    
    var top_offset = editor_1.offset().top;

    // handle mouse movement
    $( document ).mousemove( function ( e ) {

        var actualY = e.pageY;
        // editor height
        var eheight = actualY - top_offset;
        
        eheight = Math.min( eheight, $(window).height() * 0.80);
        // Set wrapper height
        $( '#editor_1' ).css( 'height', eheight - 5);
        $( '#editor_1_wrap' ).css( 'height', eheight);
        $( '#console' ).css( 'height', $(window).height() - eheight - 20);

        // $( '#panels' ).css( 'height', $(window).height() - eheight - 100);

        // Set dragbar opacity while dragging (set to 0 to not show)
        $( '#horizontal_dragbar' ).css( 'opacity', 0.15 );

    } );

} );

$( '#vertical_dragbar' ).mousedown( function ( e ) {
    e.preventDefault();
    window.horizontal_dragging = true;

    var editor_1 = $( '#editor_1' );
    var left_offset = editor_1.offset().left;

    // handle mouse movement
    $( document ).mousemove( function ( e ) {
        var actualX = e.pageX;
        // editor height
        var ewidth = actualX - left_offset;
        ewidth = Math.max( 200, ewidth);
        ewidth = Math.min( $(window).width() - 160, ewidth);
        // Set wrapper height
        $( '#editor_bars_wrapper' ).css( 'width', ewidth); // SUSPICIOUS
        $('#editor_1_wrap').css('width', ewidth - 5);
        $('#editor_2').css('width', $('#multiple_editor_wrapper').width() - ewidth);
        $('#right_editor_wrap').css('width', $('#multiple_editor_wrapper').width() - ewidth);
        // Set dragbar opacity while dragging (set to 0 to not show)
        $( '#vertical_dragbar' ).css( 'opacity', 0.15 );

    } );

} );

//Temporary Patch (Hopefully)
$('#editor_1_wrap').css('width', $("#editor_bars_wrapper").width() - 5);
// Make second editor grow when resizing the browser.
window.onresize = () => {
    
    $('#right_editor_wrap').css('width', $('#multiple_editor_wrapper').width() - $("#editor_bars_wrapper").width());
    $('#editor_2').css('width', $("#multiple_editor_wrapper").width() - $("#editor_bars_wrapper").width());
    $('#editor_1_wrap').css('width', $("#editor_bars_wrapper").width() - 5);
    
}

//YUSUF's DEBUGGING AUXILIARY
// document.onmousemove = function(e){
//     var x = e.pageX;
//     var y = e.pageY;
//     e.target.title = "X is "+x+" and Y is "+y;
// };

// Finish resizing when mouse is up.
$( document ).mouseup( function ( e ) {

    if( window.vertical_dragging || window.horizontal_dragging) {
        var editor_1 = $( '#editor_1' );
        $( '#horizontal_dragbar' ).css( 'opacity', 1 );
        $( '#vertical_dragbar' ).css( 'opacity', 1 );
        $( document ).unbind( 'mousemove' );

        // Editors don't adjust itself without these functions.
        editor.resize();
        editor2.resize();
    }

} );

function addDiscussion(errorPair) {
    let errorData = errorPair.errorData;

    // Creating a discussion.
    let discussion = document.createElement("div");
    discussion.className = "to-fix-error";
    discussion.id = "error-" + errorCount;

    let errorReason = document.createElement("p");
    errorReason.innerText = errorData.toString();
    discussion.appendChild(errorReason);
    
    let rejectButton = document.createElement("button");
    rejectButton.className ="mdl-button mdl-js-button mdl-button--raised mdl-button--colored";
    rejectButton.innerText = "Reject";

    let buttonWrapper = document.createElement("div");
    buttonWrapper.className = "buttonduo";
    
    rejectButton.onclick = () => {
        let parent = rejectButton.parentNode;
        let errorNum = parent.id.slice(-1);
        console.log(rejectButton.innerText);
        if(rejectButton.innerText === "REJECT") {
            rejectButton.innerText = "Accept";
            errorReason.className = "striked";
            errorData.guess = false;
        }
        else {
            rejectButton.innerText = "Reject";
            errorReason.className = "";
            errorData.guess = true;
        }
    };

    buttonWrapper.appendChild(rejectButton);

    let hintButton = document.createElement("button");
    hintButton.className ="mdl-button mdl-js-button mdl-button--raised mdl-button--colored";
    hintButton.innerText = "Show Hint";

    hintButton.onclick = () => {
        $("#hintModal").modal('show');

        document.getElementById("hintConfirm").onclick = () => {
            console.log("Hey");
            buttonWrapper.removeChild(hintButton);
            errorData.showHint = true;
            errorReason.innerText = errorData.toString();
        };
        
    };

    buttonWrapper.appendChild(hintButton);

    discussion.appendChild(buttonWrapper);

    discussion.appendChild(document.createElement("hr"));
   
    errors_tab.appendChild(discussion);
    errorPair.errorElement = discussion;
    errorCount++;
}

errors.forEach(err => {
    addDiscussion(err);
});

var reviewCounter = 2;
document.getElementById("submit-btn").onclick = () => {
    runSource = editor2.getSession().getValue();
    
    if(runSource.includes("System")) {
        alert("Please don't use System");
        return;
    }

    runCode(insertMain(runSource));

};

document.getElementById("show-solutions").onclick = () => {
    document.getElementById("solutionScore").innerHTML = "<b>" + score + "<b>";
    $("#solutionModal").modal('show');
};

document.getElementById("solutionConfirm").onclick = () => {

    // Set editor 2 to solved.
    editor2.getSession().setValue(levelData.solution);
    editor2.setReadOnly(true);

    errors.forEach(err => {

        err.errorElement.firstChild.innerText = err.errorData.getExplanation();

        err.errorElement.removeChild(err.errorElement.firstChild.nextSibling); 
        let subButton = document.getElementById("submit-btn");
        subButton.innerText = "Go Back";
        subButton.onclick = () => {
            window.location.href = "/game-mode-select.html";
        };
    });

    levelData.solutionHighlights.forEach((rangex) => {
        editor2.session.addMarker(
            new Range(rangex[0] - 1, 0, rangex[1], 0), "ace_step", "text"
        );
    });
    

    document.getElementById("feedbacks").click();
    document.getElementById("show-solutions").onclick = null;
};


// API BUSINESS
var APISubmitSettings = {
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

var APIGetSettings = {
    "async": true,
    "crossDomain": true,
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "judge0.p.rapidapi.com",
        "x-rapidapi-key": j0Key
    }
};

var sendData = { 
    "language_id": 62,
};

function runCode( source) {
    sendData.source_code = source;
    APISubmitSettings.data =  JSON.stringify(sendData);

    $.ajax(APISubmitSettings).done(function (response) {
        console.log(response);
        
        setTimeout( getResult, 3000);    
        function getResult() {
            
            APIGetSettings.url =  "https://judge0.p.rapidapi.com/submissions/" + response.token;
    
            $.ajax(APIGetSettings).done(function (finalResponse) {
                console.log(finalResponse);
                
                if(finalResponse.status.id == 1 || finalResponse.status.id == 2) {
                    console.log("TRYING AGAIN");
                    setTimeout( getResult, 1000);
                }
                else {
                    document.getElementById('multiple_editor_wrapper').style.pointerEvents = 'auto';
                    document.getElementById('multiple_editor_wrapper').style.opacity = '1';
                    showLoader(false);

                    // Use results to infer & check

                    let runAdapter = {
                        'compileStatus': "OK",
                        'runError': "",
                        'output': "",
                    };
                    if(finalResponse.status.id == 3) {
                        runAdapter.output = finalResponse.stdout;
                    }
                    else if(finalResponse.status.id == 6) {
                        runAdapter.compileStatus = finalResponse.compile_output;
                    }
                    else {
                        alert("DEBUG ONLY, CODE STATUS ID: " + finalResponse.status.id);
                        runAdapter.runError = finalResponse.stderr;
                    }

                    let runEvaluation = findCorrects( runAdapter);

                    // If code compiled do a review
                    doReview( runEvaluation);
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

function findCorrects( runAdapter) {
    
    console.log( "Find Correct Starts");
    console.log(runAdapter);
    
    let runEvaluation = {};

    //ToDo Give feedbacks.
    if( runAdapter.compileStatus === "OK") {
        if( runAdapter.runError === "") {
            runEvaluation.compiled = true;
            let correctness = [];
            runEvaluation.correctness = correctness;

            let output = runAdapter.output.split("\n");
            output.pop();
            console.log(output);

            let currentCorrect = true;
            output.forEach( outputLine => {
                console.log('current correct: ' + currentCorrect);

                if( isNaN(outputLine)) {
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
            document.getElementById("consoleText").innerText = runAdapter.runError;
            runEvaluation.compiled = false;
            console.log(runAdapter.compileStatus);
        }
    }
    else {
        document.getElementById("consoleText").innerText = runAdapter.compileStatus;
        runEvaluation.compiled = false;
        console.log(runAdapter.compileStatus);
    }

    console.log("Eval complete");
    console.log(runEvaluation);
    return runEvaluation;
}

function doReview( runEvaluation) {
    if( !runEvaluation.compiled) {
        alert("Runtime or Compilation Error");
        document.getElementById("errorOutput").click();
        return;
    }

    correctness = runEvaluation.correctness;

    for(let i = 0; i < errors.length; i++) {
        let err = errors[i];

        let previouslyUnsolved = !err.errorData.resolved;
        console.log( err);

        
        if( err.errorData.isTrueError) {
            if( !err.errorData.guess) {
                err.errorData.checkAnswer(false);
            }
            else {
                err.errorData.checkAnswer(correctness[i]);
            }
        }
        else {
            err.errorData.checkAnswer( !err.errorData.guess);
        }

        if(err.errorData.updatedResolved && previouslyUnsolved) {
            err.action = 'hide';            
        }
        else if(!err.errorData.updatedResolved && !previouslyUnsolved) {
            err.action = 'show';
        }
        else {
            err.action = null;
        }
    }

    $("#submitModal").modal('show');
    //acceptChanges();
    
}

document.getElementById("submitConfirm").onclick = () => {
    acceptChanges();
}

function acceptChanges() {
    score = 0;

    for(let i = 0; i < errors.length; i++) {
        let err = errors[i];

        err.errorData.updateFeedback();

        score += err.errorData.currentScore;

        err.errorElement.firstChild.innerText = err.errorData.toString();

        if( err.action === 'hide') {
            err.errorElement.firstChild.nextSibling.style.display = 'none';
        }
        else if( err.action === 'show') {
            err.errorElement.firstChild.nextSibling.style.display = 'block';
        }
    }

    document.getElementById("feedbacks").click();
    reviewCounter++;
}

// Inserts main to test.
function insertMain( code) {
    var insertHere = code.lastIndexOf("}");

    return code.slice(0, insertHere) + levelData.test + "}";
}


(function timeUpdate() {

    let date_now = new Date ();
    let time_now = date_now.getTime ();
    let time_diff = time_now - startTime;
    let passedSeconds = Math.floor ( time_diff / 1000 );
    
    passedSeconds = scoreTimeTreshold * 60 - passedSeconds;

    let msg = "Remaining Time: ";
    if( passedSeconds <= 0 ) {
        passedSeconds *= -1;
        msg = "Penalized Time: ";
    }
    let m = Math.floor ( passedSeconds / 60);
    let s = passedSeconds % 60;

    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('timeInfo').innerHTML = msg +
    m + ":" + s;

    if(msg[0] != 'R') {
        document.getElementById('penaltyInfo').innerText = m;
    }    

    setTimeout(timeUpdate, 1000);
})();
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function showLoader( show) {
    if( document.getElementById("loader") === null && show) {
        let loader = document.createElement("div");
        loader.id = "loader";
        document.body.appendChild(loader);
    }
    else if(!show) {
        let loader = document.getElementById("loader");
        loader.parentNode.removeChild(loader);
    }
}