
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
document.getElementById("logIn").addEventListener("click",loginUser,false); 
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
  var display = user.UserEmail;
  alert("logged in as"+display);
}
// user state changed
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    alert("hello");
    // ...
  } else {
    // User is signed out.
    // ...
    alert("signed out")
  }
});
