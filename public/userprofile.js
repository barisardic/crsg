document.getElementById("signout3").addEventListener("click",signOutUser,false);
function signOutUser(){
  //alert("singning out");
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    
  }).catch(function(error) {
    // An error happened.
  });
}
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
document.getElementById("submitBtn").addEventListener("click",writeUserData,false)

  function writeUserData() {
    event.preventDefault();
    var user = firebase.auth().currentUser;
    var userId = user.uid;
    var name = document.getElementById("name").value;
    var uni = document.getElementById("uni").value;
    var email = document.getElementById("email").value;

    var fb = document.getElementById("feedback").value;
    var cs453Bool = document.getElementById("cs453").checked;
    var cs415Bool = document.getElementById("cs415").checked;
    var cs319Bool = document.getElementById("cs319").checked;
    //todo finsd out boolean returning checkbox value
    var database = firebase.database();
    database.ref('users/' + userId).set({
      username: name,
      university: uni,
      email: email,
      cs453 :cs453Bool,
      cs415 :cs415Bool,
      cs319 :cs319Bool,
      feedback : fb
    });
    var snackbarContainer = document.querySelector('#demo-snackbar-example');
    var handler = function(event) {
      //showSnackbarButton.style.backgroundColor = '';
    }; 
    var feedbackMsg = {
      message: "Submitted Successfully",
      timeout: 10000,
      actionHandler: handler,
      actionText: ' '
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(feedbackMsg);
  }