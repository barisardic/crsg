// set background pictures for level cards
var imagesRef = firebase.storage().ref();
var backgroundImageUrl = imagesRef.child('level-background-pictures/1.jpg').getDownloadURL();
  //var img = document.getElementById('card1');
  //img.src = backgroundImageUrl;
  var userEmailButton = document.getElementById("userEmail");
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    userEmailButton.textContent = user.email;
    // ...
  } else {
    // User is signed out.
    // ...
    window.location.href = "/index.html";
  }
});
document.getElementById("signout2").addEventListener("click", signOutUser, false);
userEmailButton.addEventListener("click", toProfile, false);

function signOutUser() {
  //alert("singning out");
  firebase.auth().signOut().then(function () {
    // Sign-out successful.

  }).catch(function (error) {
    // An error happened.
  });
}
tutorialBtn
document.getElementById("tutorialBtn").addEventListener("click",playTutorial,false);
document.getElementById("PreQuizButton").addEventListener("click",playPreQuiz,false);
document.getElementById("playButton1").addEventListener("click", playPage, false);
document.getElementById("playButton2").addEventListener("click", playPage, false);
document.getElementById("playButton3").addEventListener("click", playPage, false);
document.getElementById("playButton4").addEventListener("click", playPage, false);
document.getElementById("playButton5").addEventListener("click", playPage, false);
document.getElementById("PostQuizButton").addEventListener("click",playPostQuiz,false);
//document.getElementById("playButton6").addEventListener("click",playPage,false);
function playTutorial(){
  localStorage.setItem('selected', 0);
  window.location.href = "/tutorial.html";
}
function playPreQuiz(){
    // selectedLevel = 0;
  localStorage.setItem('selected', 0);
  window.location.href = "/prequiz.html";
}
function playPostQuiz(){
  localStorage.setItem('selected', 0);
  window.location.href = "/postquiz.html";
} 
function playPage() {
  //alert(this.id);
  var selectedLevel = this.id.charAt(this.id.length - 1);
  localStorage.setItem('selected', selectedLevel);
  // ...
  //TODO goto new page after this and load the level:D
  window.location.href = "/editor.html";
}

function toProfile() {
  //alert("go");
  window.location.href = "/userprofile.html";
}
/* $('#playButton,#pro2,#pro3').addEventListener("click",playPage,false); 
function playPage(){
  alert("Plaay?");
    // ...
  
} */

//mouse movements
const cursor = document.querySelector('.cursor');
const cursorImage = document.querySelector('.cursorImage');

document.addEventListener('mousemove', e => {
    cursor.setAttribute("style", "top: "+(e.pageY - 10)+"px; left: "+(e.pageX - 10)+"px;")
    cursorImage.setAttribute("style", "top: "+(e.pageY - 10)+"px; left: "+(e.pageX - 10)+"px;")
})
/* cursorImage.setAttribute("style", "transform: rotate("+ Math.atan(e.movementY/e.movementX)* (180/Math.PI) + "deg);")
document.addEventListener('mousemove', e => {
    if(e.movementX == 0 && e.movementY > 0){//down
        cursorImage.setAttribute("style", "transform: rotate(180deg);")
    }
    if(e.movementX == 0 && e.movementY < 0){//up
        cursorImage.setAttribute("style", "transform: rotate(0deg);")
    }
    if(e.movementX > 0 && e.movementY == 0){//right
        cursorImage.setAttribute("style", "transform: rotate(90deg);")
    }
    if(e.movementX < 0 && e.movementY == 0){//left
        cursorImage.setAttribute("style", "transform: rotate(-90deg);")
    }
    else{
        cursorImage.setAttribute("style", "transform: rotate(-90deg);")
    }
}) */

document.addEventListener('click', () => {
    cursor.classList.add("expand");
    cursorImage.classList.add("clicked");

    setTimeout(() => {
        cursor.classList.remove("expand");
        cursorImage.classList.remove("clicked");
    }, 500)
})
//document.addEventListener('DOMContentLoaded', openGuruModal, false);
if(localStorage.getItem('selected')==-1){
    window.onload = openGuruModal();
}


function openGuruModal() {
    //alert("Here guru guru");
    //editor.renderer.setShowGutter(false);
    console.log("opening overlay");
    console.log(""+localStorage.getItem('selected'));
    document.getElementById("overlay").style.display = "block";
    document.getElementById('guru_modal').classList.add("visible");
}
function closeGuruModal() {
    //editor.renderer.setShowGutter(true);
    document.getElementById("overlay").style.display = "none";
    document.getElementById('guru_modal').classList.remove("visible");
}
$(document).click(function (event) {
    //if you click on anything except the modal itself or the "open modal" link, close the modal
    if (!$(event.target).closest(".guru_modal,.js-open-modal").length) {
        //editor.renderer.setShowGutter(true);
        document.getElementById("overlay").style.display = "none";
        //typeSound.pause();
        $("body").find(".guru_modal").removeClass("visible");
    }
});
var guruArray = ["astroAlertAnim.gif", "astroCuriousAnim.gif", "astroHappyAnim.gif"];
guruCount = 0;
var GurusWords = ["If you don’t have time or expertise for the review, do let the author know, so that another reviewer could be assigned to the code review.",
        "Sign off on the pull request with a thumbs up or 'Ready to merge' comment.",
        "Communicate which ideas you feel strongly about and those you don't.",
        "Identify ways to simplify the code while still solving the problem.",
        "If discussions turn too philosophical or academic, move the discussion offline to a regular Friday afternoon technique discussion. In the meantime, let the author make the final decision on alternative implementations."
    ];
document.getElementById('guru_modal').addEventListener('click', clickedOnGuru, false);

function clickedOnGuru() {
    displayGuruImage();

    document.getElementById('guru_modal').classList.add("toBlue");
    document.getElementById("guruSays").innerHTML = "";
    var str = GurusWords[guruCount % GurusWords.length];
    // this jquery snippet is for the typewriter effect, if you dont want it, dont reset innerhtml set it to GurusWords. 
    var spans = '<span>' + str.split('').join('</span><span>') + '</span>';
    $(spans).hide().appendTo('.guruSays').each(function (i) {
        //typeSound.play();
        //typeSound.playbackRate=2*(str.length/218);
        //typeSound.loop = true;

        $(this).delay(50 * i).css({
            display: 'inline',
            opacity: 0
        }).animate({
            opacity: 1
        }, 100);
    });

    guruCount = guruCount + 1;
}
function displayGuruImage() {
    var num = Math.floor(Math.random() * 3); // 0...6
    document.guruPortrait.src = '../assets/' + guruArray[num];
}