// CRSG AUTHOR MODULE
// Author: Yusuf Avci

//let score = 0;
var hobo;

// Creating the editors.
var editor = ace.edit( "editor_1" );
var editor2 = ace.edit( "editor_2" );
var vertical_dragging = false;
var horizontal_dragging = false;

// Setting the editor text to initial text.
editor.getSession().setValue(level1Code);
editor2.getSession().setValue(level1Code);

//Scroll to the bottom
var scrollingElement = (document.scrollingElement || document.body);
scrollingElement.scrollTop = scrollingElement.scrollHeight;

// If using WordPress uncomment line below as we have to
// 32px for admin bar, minus 1px to center in 2px slider bar
// wpoffset = 31;

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

// This line is a patch. TODO
//$('#editor_1_wrap').css('width', $( '#editor_bars_wrapper' ).width() - 5);
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

//
$( document ).mouseup( function ( e ) {

    if( window.vertical_dragging || window.horizontal_dragging) {
        var editor_1 = $( '#editor_1' );
        $( '#horizontal_dragbar' ).css( 'opacity', 1 );
        $( '#vertical_dragbar' ).css( 'opacity', 1 );
        $( document ).unbind( 'mousemove' );

        // J'adore cette function. 
        editor.resize();
        editor2.resize();
    }

} );


class CodeError {
    constructor(lines, reason, isTrueError, hint, explanation) {
        this.lines = lines;
        this.reason = reason;
        this.hint = hint;
        this.showHint = false;
        this.isTrueError = isTrueError;
        this.resolved = false;
        this.answer = null;
        this._feedback = [];
        this.explanation = explanation;
    }

    getExplanation() {
        let toReturn = "Error at lines " + this.lines[0] + "-" + this.lines[1];;
 
        toReturn += "\n" + "Solution: " + this.explanation;
      
        return toReturn;
    }

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
    checkAnswer( isCorrect) {
        let newFeedback = null;
        
        if( isCorrect) {
            this.resolved = true;
            newFeedback = "Thanks. Problem is solved.";
        }
        else if(this.resolved === true){
            this.resolved = false;
            newFeedback = "This error occurred again. Plase solve it again.";
        }
        else {
            newFeedback = "Problem persists.";
        }
        for(let i = 0; i < this._feedback.length; i++) {

            if(this._feedback[i][1] === newFeedback) {
                this._feedback[i][0] = reviewCounter;

                let temp = this._feedback[i];
                this._feedback[i] = this._feedback[this._feedback.length - 1];
                this._feedback[this._feedback.length - 1] = this._feedback[i];
                return;
            }
        }

        this._feedback.push([ reviewCounter, newFeedback]);
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
        let parent = hintButton.parentNode;

        buttonWrapper.removeChild(hintButton);
        let errorNum = parent.id.slice(-1);
        
        errorData.showHint = true;
        errorReason.innerText = errorData.toString();
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
    
    runCode(runSource);

};

document.getElementById("show-solutions").onclick = () => {
    
    errors.forEach(err => {

        // Set editor 2 to solved.
        editor2.getSession().setValue(level1Solution);
        editor2.setReadOnly(true);


        err.errorElement.firstChild.innerText = err.errorData.getExplanation();

        err.errorElement.removeChild(err.errorElement.firstChild.nextSibling); 
        let subButton = document.getElementById("submit-btn");
        subButton.innerText = "Go Back";
        subButton.onclick = () => {
            window.location.href = "/game-mode-select.html";
        };
    });
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

        hobo = runResult;
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
        runEvaluation.compiled = false;
        console.log(runResult.compile_status);
    }

    console.log("Eval complete");
    console.log(runEvaluation);
    return runEvaluation;
}

function doReview( runEvaluation) {
    correctness = runEvaluation.correctness;

    for(let i = 0; i < errors.length; i++) {
        let err = errors[i];

        let previouslyUnsolved = !err.errorData.resolved;
        console.log( err);

        
        if( err.errorData.isTrueError) {
            err.errorData.checkAnswer(correctness[i]);
        }
        else {
            err.errorData.checkAnswer(guess === errorData.isTrueError );
        }

        err.errorElement.firstChild.innerText = err.errorData.toString();
        if(err.errorData.resolved && previouslyUnsolved) {
            err.errorElement.firstChild.nextSibling.style.display = 'none';
        }
        else if(!err.errorData.resolved && !previouslyUnsolved) {
            err.errorElement.firstChild.nextSibling.style.display = 'block';
        }       
    }
    
    for(let i = 0; i < errors.length; i++) {
        let err = errors[i];
    
    }

    reviewCounter++;
}