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
  window.location.href = "/tutorial.html";
}
function playPreQuiz(){
  window.location.href = "/prequiz.html";
}
function playPostQuiz(){
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

document.addEventListener('mousemove', e => {
    cursor.setAttribute("style", "top: "+(e.pageY - 10)+"px; left: "+(e.pageX - 10)+"px;")
})

document.addEventListener('click', () => {
    cursor.classList.add("expand");

    setTimeout(() => {
        cursor.classList.remove("expand");
    }, 500)
})