// set background pictures for level cards
var imagesRef = firebase.storage().ref();
var backgroundImageUrl = imagesRef.child('level-background-pictures/1.jpg').getDownloadURL();
  var img = document.getElementById('card1');
  img.src = backgroundImageUrl;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var userEmailButton = document.getElementById("userEmail");
    userEmailButton.textContent= user.email;
    // ...
  } else {
    // User is signed out.
    // ...
    window.location.href = "/index.html";
  }
});
document.getElementById("signout2").addEventListener("click",signOutUser,false);
userEmailButton.addEventListener("click",toProfile,false);
function signOutUser(){
  alert("singning out");
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    
  }).catch(function(error) {
    // An error happened.
  });
}
document.getElementById("playButton").addEventListener("click",playPage,false);
document.getElementById("playButton2").addEventListener("click",playPage,false);
document.getElementById("playButton3").addEventListener("click",playPage,false);
document.getElementById("playButton4").addEventListener("click",playPage,false);
document.getElementById("playButton5").addEventListener("click",playPage,false);
document.getElementById("playButton6").addEventListener("click",playPage,false); 
function playPage(){
  alert(this.id);
    // ...
  //TODO goto new page after this and load the level:D
  window.location.href = "/editor.html";
}
function toProfile(){
  alert("go");
  window.location.href = "/userprofile.html";
}
/* $('#playButton,#pro2,#pro3').addEventListener("click",playPage,false); 
function playPage(){
  alert("Plaay?");
    // ...
  
} */