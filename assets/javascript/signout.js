
//This function is called when Sign Out is clicked

$(document).on("click","#signout", function(){
    //console.log("button clicked");
    firebase.auth().signOut().then(function() {
        console.log("signed out");
        //window.location.href = "index.html";
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
        console.log("error");
      });
      //send the user back to main page
      window.location.href = "index.html";
});

