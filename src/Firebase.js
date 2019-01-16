import * as firebase from 'firebase';
let database;

export const init =()=>{
var config = {
    apiKey: "AIzaSyAolHNL1igZBErU2Z6YA-o-V33ob7EJdpc",
    authDomain: "test-color-13abc.firebaseapp.com",
    databaseURL: "https://test-color-13abc.firebaseio.com",
    projectId: "test-color-13abc",
    storageBucket: "test-color-13abc.appspot.com",
    messagingSenderId: "810419889708"
  };    
  firebase.initializeApp(config);
    database= firebase.database();
}

  

