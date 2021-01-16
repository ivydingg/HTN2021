// FirebaseUI config.
var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return true;
        },
        uiShown: function() {
          // The widget is rendered.
          // Hide the loader.
          document.getElementById('loader').style.display = 'none';
        }
    },
    // Url to redirect to after a successful sign-in.
    signInSuccessUrl: 'https://www.google.com',
    signInOptions: [
        {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            // Required to enable ID token credentials for this provider.
            clientId: CLIENT_ID
        },
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // Other providers don't need to be given as object.
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback function.
    // Terms of service url/callback.
    tosUrl: 'https://www.google.com',
    // Privacy policy url/callback.
    privacyPolicyUrl: function() {
      window.location.assign('https://www.google.com');
    }
  };
  
  // Initialize the FirebaseUI Widget using Firebase.
  var ui = new firebaseui.auth.AuthUI(firebase.auth());

  // The start method will wait until the DOM is loaded.
  ui.start('#firebaseui-auth-container', uiConfig);
