var editor = ace.edit( "editor_1" );
var editor2 = ace.edit( "editor_2" );
var vertical_dragging = false;
var horizontal_dragging = false;

// If using WordPress uncomment line below as we have to
// 32px for admin bar, minus 1px to center in 2px slider bar
// wpoffset = 31;

editor.setTheme("ace/theme/monokai");
// inline must be true to syntax highlight PHP without opening <?php tag
editor.getSession().setMode( { path: "ace/mode/php", inline: true } );

// enable autocompletion and snippets
editor.setOptions( {
    enableBasicAutocompletion: true,
    enableSnippets           : true,
    enableLiveAutocompletion : false
} );

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
        ewidth = Math.max( 300, ewidth);
        ewidth = Math.min( $(window).width() - 160, ewidth);
        // Set wrapper height
        $( '#editor_bars_wrapper' ).css( 'width', ewidth);
        $('editor_1_wrap').css('width', ewidth - 5);
        $('console').css('width', ewidth - 5);
        
        $('#editor_2').css('width', $('#multiple_editor_wrapper').width() - ewidth);

        // Set dragbar opacity while dragging (set to 0 to not show)
        $( '#vertical_dragbar' ).css( 'opacity', 0.15 );

    } );

} );

window.onresize = () => {
    $('multiple_editor_wrapper').css('width', window.width);
}

//YUSUF's DEBUGGING AUXILIARY
document.onmousemove = function(e){
    var x = e.pageX;
    var y = e.pageY;
    e.target.title = "X is "+x+" and Y is "+y;
};

//
$( document ).mouseup( function ( e ) {

    if( window .vertical_dragging || window.horizontal_dragging) {
        var editor_1 = $( '#editor_1' );
        $( '#horizontal_dragbar' ).css( 'opacity', 1 );
        $( '#vertical_dragbar' ).css( 'opacity', 1 );
        $( document ).unbind( 'mousemove' );
    }

} );


class CodeError {
    constructor(lines, reason, isTrueError) {
        this.lines = lines;
        this.reason = reason;
        this.isTrueError = isTrueError;
        this.guess = true;
        this.answer = null;
        this._feedback = [];
    }
    toString() {
        return "Error at lines " + this.lines[0] + "-" + this.lines[1] + ": " + this.reason;
    }
    checkAnswer(answer) {
        //TODO
        this._feedback.push("The error persists.");
        
        let articx = document.createElement("article");
        for(let i = 0; i < this._feedback.length; i++) {
            let currentFeedback = document.createElement("p");
            currentFeedback.innerText = this._feedback[i];
            articx.appendChild(currentFeedback);
        }
        return articx;
    }
}

class ErrorPair {
    constructor(Error) {
        this.errorData = Error;
        this.errorElement = null;
    }
}

let errorDatas = [];
errorDatas.push(new CodeError([3,4], "Line is very long.", true));
errorDatas.push(new CodeError([5,9], "Indentation is problematic.", false));

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
    errorReason.innerText = "Error at lines " + errorData.lines[0] + " - " + errorData.lines[1] + ": " + errorData.reason;
    discussion.appendChild(errorReason);
    
    let rejectButton = document.createElement("button");
    rejectButton.className ="mdl-button mdl-js-button mdl-button--raised mdl-button--colored";
    rejectButton.innerText = "Reject";

    let buttonWrapper = document.createElement("div");
    buttonWrapper.class = "buttonduo";
    
    rejectButton.onclick = () => {
        let parent = rejectButton.parentNode;
        let errorNum = parent.id.slice(-1);
        
        if(Error.guess) {
            rejectButton.innerText = "Accept";
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
        let errorNum = parent.id.slice(-1);
        
    };

    buttonWrapper.appendChild(hintButton);

    discussion.appendChild(buttonWrapper);

    discussion.appendChild(document.createElement("hr"));
   
    errors_tab.appendChild(discussion);
    errorPair.errorElement = discussion;
    errorCount++;
}

addDiscussion(errors[0]);
addDiscussion(errors[1]);

document.getElementById("submit-btn").onclick = () => {
    console.log(discussions);

}