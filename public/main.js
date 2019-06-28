var user = firebase.auth().currentUser;

if (user) {
  // User is signed in.
  var userEmail = document.getElementById("userEmail");
  userEmail.nodeValue = userEmail;
} else {
  // No user is signed in.
  window.location.pathname = "/index";
}