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
const dataTable = document.querySelector("#leader");

 var userNames =[]
 var userUnis = []
 var userScores = []

var userTopScoresref = firebase.database().ref('users/').orderByChild('highScore').limitToLast(10);
userTopScoresref.on("value", snap => {
  snap.forEach(function (childSnap) {
    window.userNames.unshift(childSnap.child("username").val());
    //window.userUnis.unshift(childSnap.child("university").val());
    window.userScores.unshift(childSnap.child("highScore").val());
    
   });
   //alert(userNames[0]+"-"+userUnis[0]+"-"+userScores[0]);
    for (i = 0; i < userScores.length; i++) {
      place = document.getElementById((i+1).toString()).children;
      //alert(place[0]);
      place[1].innerText= userNames[i];
      //place[2].innerText= userUnis[i];
      place[2].innerText= userScores[i];
    }
});
