//var domain = "https://localhost:5000";
var domain = "https://cloudcastle.space";
//var domain = "https://localhost:5000";

function handleSignUp() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var first_name = document.getElementById('first_name').value;
  var last_name = document.getElementById('last_name').value;
  var username = document.getElementById('username').value;

  if (first_name.length == 0 || last_name.length == 0 || username.length == 0) {
    alert('Please fill in all fields.');
    return;
  }
  if (email.length < 4) {
    alert('Please enter an email address.');
    return;
  }
  if (password.length < 4) {
    alert('Please enter a password.');
    return;
  }
  // Create user with email and pass.
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
    
    user.uid = username;
    user.displayName = first_name + " " + last_name;
    console.log (user.displayName);
    window.location.href =  domain + "/project_page.html";

  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
  });
}


  /**
 * Sends an email verification to the user.
 */
function sendEmailVerification() {
    firebase.auth().currentUser.sendEmailVerification().then(function() {
      // Email Verification sent!
      alert('Email Verification Sent!');
    });
  }
  

function toggleSignIn() {
  if (firebase.auth().currentUser) {
    firebase.auth().signOut();
  } else {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }
    // Sign in with email and pass.
    firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
      
      window.location.href = domain + "/project_page.html";
  
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
  }
}


function sendPasswordReset() {
  var email = document.getElementById('email').value;
  firebase.auth().sendPasswordResetEmail(email).then(function() {
    // Password Reset Email Sent!
    alert('Password Reset Email Sent! You may now close this window.');
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/invalid-email') {
      alert(errorMessage);
    } else if (errorCode == 'auth/user-not-found') {
      alert(errorMessage);
    }
    console.log(error);
  });
}



/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */
function initApp() {

  // Listening for auth state changes.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      console.log("logged in: " + email);
    } else {
      // User is signed out.
      console.log("logged out");
    }
  });
  
  if (document.getElementById('sign-in') !== null)
    document.getElementById('sign-in').addEventListener('click', toggleSignIn, false);

  if (document.getElementById('sign-up') !== null)
    document.getElementById('sign-up').addEventListener('click', handleSignUp, false);

  if (document.getElementById('password-reset') !== null)
    document.getElementById('password-reset').addEventListener('click', sendPasswordReset, false);
}

window.onload = function() {
  initApp();
};