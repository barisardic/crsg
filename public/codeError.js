export class CodeError {
    /**
     * Contains data of a review comment.
     * @param {number[]} lines Contains start and end lines of the review comment.
     * @param {string} reason First review. (Reason of error)
     * @param {boolean} isTrueError Is the error a genuine error. (If false, should be rejected) 
     * @param {string} hint Hint that will be shown.
     * @param {string} explanation Solution explanation
     * @property {number[]} lines Contains start and end lines of the review comment.
     * @property {string} reason First review. (Reason of error)
     * @property {string} hint Hint that will be shown.
     * @property {boolean} showHint Should the hint be displayed.
     * @property {boolean} isTrueError Is the error a genuine error. (If false, should be rejected) 
     * @property {boolean} guess Guess = ture means the player thinks the review is genuine.
     * @property {boolean} resolved Is the problem solved.
     * @property {boolean} updatedResolved Used to stage new resolved state before commiting.
     * @property {string[]} _feedback Cotains feedbacks, hints.
     * @property {string[]} _newFeedback Used to stage new reviews before confirmation.
     * @property {string} explanation Solution explanation.
     * @property {number} currentScore User's current score gained from this review.
     * @property {number} gainedScore Used to stage gained score before confirmation.
     */
    constructor(lines, reason, isTrueError, hint, explanation) {
        // Lines at which error occurs.
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

    setAgain( storedError) {
        this.lines = storedError.lines;
        this.reason = storedError.reason;
        this.hint = storedError.hint;
        this.showHint = storedError.showHint;
        this.isTrueError = storedError.isTrueError;
        this.guess = storedError.guess;
        this.resolved = storedError.resolved;
        this.updatedResolved = storedError.updatedResolved;
        this._feedback = storedError._feedback;
        this._newFeedback = storedError._newFeedback;
        this.explanation = storedError.explanation;
        this.currentScore = storedError.currentScore;
        this.gainedScore = storedError.gainedScore;
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
                newFeedback = "You are right. This comment was a false positive.";
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

    /**
     * Calculates the score the player will get from a review comment.
     * @param {number} reviewCounter 
     * @param {number} time_diff 
     * @param {number} scoreTimeTreshold 
     * @param {number} commentScore 
     */
    calculateScore( reviewCounter, time_diff, scoreTimeTreshold, commentScore) {
        let substractPercent = ((reviewCounter - 2) * 10);
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
    
    /**
     * Updates the feedback.
     * @function
     */
    updateFeedback() {
        this.resolved = this.updatedResolved;
        this._feedback = this._newFeedback;
        this.currentScore = this.gainedScore;
    }
}


export class ErrorPair {
    /**
     * Contains error data and error element (HTML aspects).
     * @param {CodeError} Error Error data of the error pair.
     * @property {CodeError} errorData Error data of the error pair.
     * @property {Object} errorElement Error html element. Is set in addDiscussion function.
     */
    constructor(Error) {
        this.errorData = Error;
        this.errorElement = null;
    }
}