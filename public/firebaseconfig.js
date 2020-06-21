var firebaseConfig = {
    apiKey: "AIzaSyA0aonfduOwOfnPoCxZfuaDBcOufU2Zj_8",
    authDomain: "crsg-protoype.firebaseapp.com",
    databaseURL: "https://crsg-protoype.firebaseio.com",
    projectId: "crsg-protoype",
    storageBucket: "crsg-protoype.appspot.com",
    messagingSenderId: "438209695879",
    appId: "1:438209695879:web:41b459953d567130"
};
if (!firebase.apps.length) {
    console.log("init firebase");
    firebase.initializeApp(firebaseConfig);
}
else{
    console.log("can not init firebase");
}