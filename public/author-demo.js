// CRSG AUTHOR MODULE
// Author: Yusuf Avci

// GLOBALS
// Creating the editors.
var editor = ace.edit( "editor_1" );
var editor2 = ace.edit( "editor_2" );

// Becomes true while dragging a bar.
var vertical_dragging = false;
var horizontal_dragging = false;

var score = 0;

var startDate = new Date();
var startTime = startDate.getTime();

// CODE INIT

// Editor setup.
// Setting the editor text to initial text.
editor.getSession().setValue(level1Code);
editor2.getSession().setValue(level1Code);

//Scroll to the bottom
var scrollingElement = (document.scrollingElement || document.body);
scrollingElement.scrollTop = scrollingElement.scrollHeight;

// Set editors. TODO maybe simple factory.
editor.setTheme("ace/theme/monokai");
editor.setReadOnly(true);
editor.getSession().setMode( { path: "ace/mode/java", inline: true } );
editor2.getSession().setMode( { path: "ace/mode/java", inline: true } );
// enable autocompletion and snippets
editor.setOptions( {
    enableBasicAutocompletion: true,
    enableSnippets           : true,
    enableLiveAutocompletion : false
} );
editor2.setOptions( {
    enableBasicAutocompletion: true,
    enableSnippets           : true,
    enableLiveAutocompletion : false
} );


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
        $( '#console' ).css( 'height', $(window).height() - eheight);

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

// Make second editor grow when resizing the browser.
window.onresize = () => {
    
    $('#right_editor_wrap').css('width', $('#multiple_editor_wrapper').width() - $("#editor_bars_wrapper").width());
    $('#editor_2').css('width', $("#multiple_editor_wrapper").width() - $("#editor_bars_wrapper").width());
    
}

//YUSUF's DEBUGGING AUXILIARY
document.onmousemove = function(e){
    var x = e.pageX;
    var y = e.pageY;
    e.target.title = "X is "+x+" and Y is "+y;
};

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

// Review comment class.
class CodeError {
    constructor(lines, reason, isTrueError, hint, explanation) {
        // Linet at which error occurs.
        this.lines = lines;
        // First review.
        this.reason = reason;
        // Hint to be returned when a user requests hint.
        this.hint = hint;
        // Should the hint be displayed.
        this.showHint = false;
        // Is the error genuine or should be rejected.
        this.isTrueError = isTrueError;
        // Player's guess on whether or not the problem is genuine.
        this.guess = true;
        // Is the error solved.
        this.resolved = false;
        // Used to temporarily stage resolved.
        this.updatedResolved = false;
        // Shown to user.
        this._feedback = [];
        // Used to temporarily stage new feedback.
        this._newFeedback = [];
        // Solution explanation.
        this.explanation = explanation;
        // Current Score.
        this.currentScore = 0;
        // How much score is gained from this solution.
        this.gainedScore = 0;
    }

    // Returns the solution text.
    getExplanation() {
        let toReturn = "Error at lines " + this.lines[0] + "-" + this.lines[1];;
 
        toReturn += "\n" + "Solution: " + this.explanation;
      
        return toReturn;
    }

    // Returns relevant data of review comment.
    toString() {
        let toReturn = "Error at lines " + this.lines[0] + "-" + this.lines[1] + ":\n" + "Review 1: " + this.reason;
        let counter = 2;
        this._feedback.forEach( i => {
            toReturn += "\n" + "Review " + i[0] + ": " + i[1];
        });
        if(this.showHint) {
            toReturn += "\n" + "Hint: " + this.hint;
        }
        return toReturn;
    }

    // Stages an update on feedback and resolved state. Update is realized vai update function.
    checkAnswer( isCorrect) {
        let newFeedback = null;
        this._newFeedback = [...this._feedback];
        this.gainedScore = 0;

        if( isCorrect) {
            this.updatedResolved = true;
            if(this.resolved) {
                this.gainedScore = this.currentScore;
            }
            else {
                this.gainedScore = this.calculateScore();
            }
            newFeedback = "Thanks. Problem is solved.";
        }
        else if(this.resolved === true){
            this.updatedResolved = false;
            newFeedback = "This error occurred again. Plase solve it again.";
        }
        else {
            this.updatedResolved = this.resolved;
            newFeedback = "Problem persists.";
        }

        // Update feedback.
        for(let i = 0; i < this._newFeedback.length; i++) {

            if(this._newFeedback[i][1] === newFeedback) {
                this._newFeedback[i][0] = reviewCounter;

                let temp = this._newFeedback[i];
                this._newFeedback[i] = this._newFeedback[this._newFeedback.length - 1];
                this._newFeedback[this._newFeedback.length - 1] = temp;
                return;
            }
        }

        this._newFeedback.push([ reviewCounter, newFeedback]);
    }

    calculateScore() {
        let substractPercent = ((reviewCounter - 2) * 20);
        if(this.showHint) {
            substractPercent += 10;
        }

        let date_now = new Date ();
        let time_now = date_now.getTime ();
        let time_diff = time_now - startTime;
        let minutes_elapsed = Math.floor ( time_diff / (1000 * 60) );
        substractPercent += Math.max(0, minutes_elapsed - scoreTimeTreshold);

        console.log("minutes elapsed, total sub");
        console.log(minutes_elapsed);
        console.log(substractPercent);

        substractPercent = Math.min(substractPercent, 100);
        return commentScore * (100 - substractPercent) / 100;
    }
    
    updateFeedback() {
        this.resolved = this.updatedResolved;
        this._feedback = this._newFeedback;
        this.currentScore = this.gainedScore;
    }
}

class ErrorPair {
    constructor(Error) {
        this.errorData = Error;
        this.errorElement = null;
    }
}

let errorDatas = [];
errorDatas.push(new CodeError([40,40], "This won't probably work as expected.", true, "Is string a literal?", "Strings cannot be compared with == becasue they are not primitive."));

errorDatas.push(new CodeError([13,14], "This is bad.", true, "Is five four?"));

let errors = [];
errorDatas.forEach(data => {
    errors.push(new ErrorPair(data));
});

// Getting the tab to show the errors.
var errors_tab = document.getElementById("errors-list");
var errorCount = 0;

var commentScore = 100 / errors.length;
var scoreTimeTreshold = 2 * errors.length;

// let discussions = [];
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
    buttonWrapper.class = "buttonduo";
    
    rejectButton.onclick = () => {
        let parent = rejectButton.parentNode;
        let errorNum = parent.id.slice(-1);
        console.log(rejectButton.innerText);
        if(rejectButton.innerText === "REJECT") {
            rejectButton.innerText = "Accept";
            errorReason.className = "striked";
            Error.guess = false;
        }
        else {
            rejectButton.innerText = "Reject";
            errorReason.className = "";
            Error.guess = true;
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

            let parent = hintButton.parentNode;
            buttonWrapper.removeChild(hintButton);
            let errorNum = parent.id.slice(-1);
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
    
    runCode(insertMain(runSource));

};

document.getElementById("show-solutions").onclick = () => {
    document.getElementById("solutionScore").innerHTML = "<b>" + score + "<b>";
    $("#solutionModal").modal('show');
};

document.getElementById("solutionConfirm").onclick = () => {

    // Set editor 2 to solved.
    editor2.getSession().setValue(level1Solution);
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

    document.getElementById("show-solutions").onclick = null;
};

var details = {
    'client_secret': 'f9d86bc5cd7e190645c950fb5370b21091e0cb31',
    'lang': "JAVA",
};


function runCode( source) {
    details['source'] = source;

    // Converting to form.
    let formBody = [];
    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch('https://api.hackerearth.com/v3/code/run/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: formBody
    }).then((data) => data.json())
    .then( (runResult) => {
        // Work with JSON data here

        document.getElementById('multiple_editor_wrapper').style.pointerEvents = 'auto';
        document.getElementById('multiple_editor_wrapper').style.opacity = '1';

        // Use results to infer & check
        let runEvaluation = findCorrects( runResult);

        // If code compiled do a review
        doReview( runEvaluation);
        
    })
    .catch((err) => {
        // Do something for an error here
        document.getElementById('multiple_editor_wrapper').style.pointerEvents = 'auto';
        document.getElementById('multiple_editor_wrapper').style.opacity = '1';
    })
    document.getElementById('multiple_editor_wrapper').style.pointerEvents = 'none';
    document.getElementById('multiple_editor_wrapper').style.opacity = '0.4';


}


function findCorrects( runResult) {
    console.log( "Find Correct Starts");
    console.log(runResult);
    
    let runEvaluation = {};

    if( runResult.compile_status === "OK") {
        if( runResult.run_status.stderr === "") {
            runEvaluation.compiled = true;
            let correctness = [];
            runEvaluation.correctness = correctness;

            let output = runResult.run_status.output.split("\n");
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
            document.getElementById("consoleText").innerText = runResult.run_status.stderr;
            runEvaluation.compiled = false;
            console.log(runResult.compile_status);
        }
    }
    else {
        document.getElementById("consoleText").innerText = runResult.compile_status;
        runEvaluation.compiled = false;
        console.log(runResult.compile_status);
    }

    console.log("Eval complete");
    console.log(runEvaluation);
    return runEvaluation;
}

function doReview( runEvaluation) {
    if( !runEvaluation.compiled) {
        alert("Runtime or Compilation Error");
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
            err.errorData.checkAnswer( err.errorData.guess);
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

    reviewCounter++;
}

// Inserts main to test.
function insertMain( code) {
    var insertHere = code.lastIndexOf("}");

    return code.slice(0, insertHere) + level1TestCode + "}";
}