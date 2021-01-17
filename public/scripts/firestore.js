function addDream() {
    console.log("entered function");
    //get user input text
    var title_i = document.getElementById('title').value;
    var summary_i = document.getElementById('summary').value;
    var description_i = document.getElementById('description').value;
    var links_i = document.getElementById('links').value;

    if (summary_i.length == 0) {
        alert('Please enter a summary.');
        return;
    }
    if (title_i.length <= 0) {
        title_i ="Untitled";
    }
    if (description_i.length <= 0) {
        description_i ="No description";
    }
    if (links_i.length <= 0) {
        links_i = ["no updates"];
    }

    //get checked filters
    var filters_i = [];
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');

    for (var i = 0; i < checkboxes.length; i++) {
        filters_i.push(checkboxes[i].value);
    }
    
    //get user name
    var user = firebase.auth().currentUser;
    var displayName = "";

    if (user) {
        displayName = user.displayName;
    } else {
        displayName = "anonymous";
    }

    //get current date
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    var today  = new Date();
    
    var date_i = today.toLocaleDateString("en-US", options); 
    console.log(date_i);
    console.log(title_i);
    console.log(description_i);
    
    firebase.firestore().collection("dreams").add({
        title: title_i,
        summary: summary_i,
        description: description_i,
        votes: 0,
        filters: filters_i,
        post: {date: date_i, user: displayName}
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}