
//SıGN UP
document.getElementById("signUp").addEventListener("click",newUser,false); 
function newUser(){
  var newUserPassword = document.getElementById("sign-up-password").value;
  var newUserName = document.getElementById("sign-up-username").value;
  var newUserEmail = document.getElementById("sign-up-email").value;
  //TODO check retyped password
  
  firebase.auth().createUserWithEmailAndPassword(newUserEmail, newUserPassword).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
    // ...
  });
  alert("done");
}
//lOG IN
document.getElementById("login").addEventListener("click",loginUser,false); 
function loginUser(){
  var UserPassword = document.getElementById("log-in-password").value;
  var UserEmail = document.getElementById("log-in-email").value;
  //TODO check retyped password
  
   firebase.auth().signInWithEmailAndPassword(UserEmail, UserPassword).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  }); 
  alert("logged in as "+user.email);
}
// user state changed
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    alert("hello");
    window.location.pathname = "/main";
    // ...
  } else {
    // User is signed out.
    // ...
    alert("signed out")
  }
});
//sign out
document.getElementById("signOut").addEventListener("click",signOutUser,false);
function signOutUser(){
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });
}