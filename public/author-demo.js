// lol = document.getElementById("editor_1");
// lol.innerText = level1Code;

var editor = ace.edit( "editor_1" );
var editor2 = ace.edit( "editor_2" );
var vertical_dragging = false;
var horizontal_dragging = false;


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
    checkAnswer(answer) {
        let newFeedback = null;
        
        if(answer === this.answer) {
            this.resolved = true;
            newFeedback = "Thanks. Problem is solved.";
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
errorDatas[0].answer = "        return this.toString().equals(dogo.toString());";
// errorDatas.push(new CodeError([40,40], "This won't probably work as expected.", true, "Is string a literal?"));
// errorDatas[1].answer = "        return this.toString().equals(dogo.toString());";
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
    errors.forEach(err => {

        if(!err.errorData.resolved) {
            console.log( err);
            err.errorData.checkAnswer(editor2.session.getLine(err.errorData.lines[0] - 1));
            err.errorElement.firstChild.innerText = err.errorData.toString();
            if(err.errorData.resolved) {
                console.log("RESOLVED");
                err.errorElement.removeChild(err.errorElement.firstChild.nextSibling);
            }
        }   
        
    });
    reviewCounter++;
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