// Review comment class.
export class CodeError {
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
        let toReturn = "Error at lines " + this.lines[0] + "-" + this.lines[1] + ":\n" + "Review Round 1: " + this.reason;
        let counter = 2;
        this._feedback.forEach( i => {
            toReturn += "\n" + "Review Round " + i[0] + ": " + i[1];
        });
        if(this.showHint) {
            toReturn += "\n" + "Hint: " + this.hint;
        }
        return toReturn;
    }

    // Stages an update on feedback and resolved state. Update is realized via update function.
    checkAnswer( isCorrect, reviewCounter, time_diff, scoreTimeTreshold, commentScore) {
        let newFeedback = null;
        this._newFeedback = [...this._feedback];
        this.gainedScore = 0;

        if( isCorrect) {
            this.updatedResolved = true;
            if(this.resolved) {
                this.gainedScore = this.currentScore;
            }
            else {
                this.gainedScore = this.calculateScore(reviewCounter, time_diff, scoreTimeTreshold, commentScore);
            }
            if( this.isTrueError) {
                newFeedback = "Thanks. Problem is solved.";
            }
            else {
                newFeedback = "You are right. This comment was wrong.";
            }
            
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

    calculateScore( reviewCounter, time_diff, scoreTimeTreshold, commentScore) {
        let substractPercent = ((reviewCounter - 2) * 20);
        if(this.showHint) {
            substractPercent += 10;
        }

        console.log("CALCULATING SCORE");

        let minutes_elapsed = time_diff / (1000 * 60);

        console.log("MINUTES ELAPSED");
        substractPercent += Math.max(0, minutes_elapsed - scoreTimeTreshold);

        console.log("SUBSTRACT PERCENT")
        console.log("minutes elapsed, total sub");
        console.log(minutes_elapsed);
        console.log(scoreTimeTreshold);
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


export class ErrorPair {
    constructor(Error) {
        this.errorData = Error;
        this.errorElement = null;
    }
}