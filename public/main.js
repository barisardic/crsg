
var userEmailButton = document.getElementById("userEmail");
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    userEmailButton.textContent= user.email;
    // ...
  } else {
    // User is signed out.
    // ...
    alert("user not in")
    window.location.href = "/index.html";
  }
});
document.getElementById("signOut2").addEventListener("click",signOutUser,false);
function signOutUser(){
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });
}