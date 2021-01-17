var config = {
    apiKey: "AIzaSyDvCa6OaCmVlGJSW-_hyCsjOHjJt7a90bA",
    authDomain: "hack-the-north-2020.firebaseapp.com",
    databaseURL: "https://hack-the-north-2020.firebaseio.com",
  };
  firebase.initializeApp(config);
  
  
  // Google OAuth Client ID, needed to support One-tap sign-up.
  // Set to null if One-tap sign-up is not supported.
  var CLIENT_ID = null;