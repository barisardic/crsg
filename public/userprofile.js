document.getElementById("signout3").addEventListener("click",signOutUser,false);
function signOutUser(){
  alert("singning out");
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    
  }).catch(function(error) {
    // An error happened.
  });
}
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var userEmailButton = document.getElementById("userEmail2");
      userEmailButton.textContent= user.email;
      // ...
    } else {
      // User is signed out.
      // ...
      window.location.href = "/index.html";
    }
  });