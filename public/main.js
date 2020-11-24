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
  if(firebase.auth().currentUser.emailVerified == false){alert("You need to verify your email!")}
  else{
    localStorage.setItem('selected', 0);
    window.location.href = "/tutorial.html";
  }
  
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
  //window.location.href = "/userprofile.html";
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

document.getElementById('guruButton').addEventListener('click', openGuruModal, false);

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
    if (!$(event.target).closest(".guru_modal,.js-open-modal,.guruSays,.guru,.guruSaid").length) {
        //editor.renderer.setShowGutter(true);
        document.getElementById("overlay").style.display = "none";
        typeSound.pause();
        $("body").find(".guru_modal").removeClass("visible");
    }
});
var guruArray = ["astroAlertAnim.gif", "astroCuriousAnim.gif", "astroHappyAnim.gif"];
guruCount = 0;
var GurusWords = ["I’m Stella, an astronaut, and this is my ship, the Crane! I bought the Crane a short time ago in hopes of travelling across the galaxy, buuuut since I spent all my earnings to buy the Crane, I’m… broke now.",
        "After drifting a while in space, a nearby spaceport thankfully noticed and tractored me in. There, I learned the engineers that are working on the travel relay had some problems, and needed someone to review their code. Seeing this as an opportunity, I asked to help them if they agreed to supply me with fuel for my travels, and they accepted!",
        "Fortunately, I am a master code reviewer! Oh who am I kidding - I never listened to Professor Ferragus’ lessons, I’m doomed! Wait, what is this under the control console?",
        "Okay okay, I found a code review manual, that’s good. If I can understand what it’s saying, I can review all the shabby code in the relay infrastructure in a jiffy, and be on my merry way!",
        "Because I’m very forgetful, I’ll be noting the code review tips I come across on this log. Maybe with these reminders I can work better together as a team with the other engineers at the relay!",
        "(The levels are accessed by clicking the relay portals in the centre of the spaceports. Play with the Browser's zoom level if the page proportions look broken! Use shift + mousewheel to scroll across the map!)",
        "------------- >>END OF TRANSMISSION!<< ------------- Click out of the log to return to your voyage!"
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
        typeSound.play();
        typeSound.playbackRate=5;
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
function displayGuruImage() {
    var num = Math.floor(Math.random() * 3); // 0...6
    document.guruPortrait.src = '../assets/' + guruArray[num];
}

//sound
var typeSound = document.getElementById("guruType");