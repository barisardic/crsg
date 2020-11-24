
//SıGN UP
document.getElementById("signUp").addEventListener("click",newUser,false); 
function newUser(){
  var newUserPassword = document.getElementById("sign-up-password").value;
  var retypedNewUserPassword = document.getElementById("sign-up-password-re").value;
  window.newUserName = document.getElementById("sign-up-username").value;
  window.newUserEmail = document.getElementById("sign-up-email").value;
  //TODO check retyped password
  if(newUserPassword===retypedNewUserPassword){
    console.log("pos 0");
    firebase.auth().createUserWithEmailAndPassword(newUserEmail, newUserPassword).then(
        (user)=>{
       // here you can use either the returned user object or       firebase.auth().currentUser. I will use the returned user object
       firebase.auth().currentUser.updateEmail(newUserEmail)
       console.log(firebase.auth().currentUser.email)
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("Unsuccessful. " +errorMessage)
        
        // ...
      });
  }
  else{
    alert("Passwords you have entered do not match!");
  }
  
  //alert("done");
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
    alert("Problem While Logging In \n Try Again!");
    // ...
  }); 
}
// user state changed
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      if(user.emailVerified == false){
        var user = firebase.auth().currentUser;
        user.sendEmailVerification().catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          alert("Unsuccessful. " +errorMessage)
          
          // ...
        }); 
      }
    // User is signed in.
    //alert("hello");
    // ...
    if (
        firebase.auth().currentUser.metadata.creationTime ===
        firebase.auth().currentUser.metadata.lastSignInTime
      ) {
          // sign up
            userId= user.uid;
            console.log("pos 1"+userId);
            var database = firebase.database();
            /* database.ref('users/' + userId+"/scores").set({
                level1: 0,
                level2: 0,
                level3: 0,
                level4: 0,
                level5: 0,
                level6: 0
              }); */
              /* database.ref('users/' + userId+"/answersSeen").set({
                  level1: 0,
                  level2: 0,
                  level3: 0,
                  level4: 0,
                  level5: 0,
                  level6: 0
              });  */
            database.ref('users/' + userId).set({
              username: window.newUserName,
              email: window.newUserEmail,
              highScore :0,
              answersSeen: {
                level1: 0,
                level2: 0,
                level3: 0,
                level4: 0,
                level5: 0,
                level6: 0
              },
              scores:{
                level1: 0,
                level2: 0,
                level3: 0,
                level4: 0,
                level5: 0,
                level6: 0
              }
            }).then(function(){
            localStorage.setItem('selected', -1);
            window.location.href = "/game-mode-select.html";
            });   
            
            console.log("pos 2");
            
      }
      else{
        localStorage.setItem('selected', -1);
        window.location.href = "/game-mode-select.html";
      }
      /* localStorage.setItem('selected', -1);
      window.location.href = "/main.html"; */
  } else {
    // User is signed out.
    // ...
    
  }
});
//sign out
/* document.getElementById("signOut").addEventListener("click",signOutUser,false);
function signOutUser(){
  firebase.auth().signOut().then(function() {
  }).catch(function(error) {
    
  });
  
} */
