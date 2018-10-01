
$(document).ready(function() {
  //initialize firebase
  var config = {
      apiKey: "AIzaSyC9pE2ORuZUcAnZM_4fnUDSScgurVLBbN8",
      authDomain: "gwbootcamp-97ba0.firebaseapp.com",
      databaseURL: "https://gwbootcamp-97ba0.firebaseio.com",
      projectId: "gwbootcamp-97ba0",
      storageBucket: "gwbootcamp-97ba0.appspot.com",
      messagingSenderId: "454079581913"
    };


   
    firebase.initializeApp(config);

    var database = firebase.database();
    var email;
    //check if the user is logged in otherwise dont display anything
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
         
          email=user.email;
          //do a firebase lookup for the user who is logged in and only display their favorites
          database.ref('/meetupFavs').orderByChild('email').equalTo(email).on("child_added", function(snapshot) {
            var sv = snapshot.val();
            var listings = $('#container');
            
            var favButton = $("<p class='mx-1 my-1 star' data-toggle='modal' data-target='#myModal' >");
            favButton.html('<i class="fas fa-trash-alt float-left"></i>');
           
            listings.append(favButton);
    
            //you can display what ever else you want
            var details = $("<h5 class='ml-1 my-0'>");
            details.html(sv.favMeetup.name);
            listings.append(details);
            
            var address = $("<p>");
            address.html(sv.favMeetup.address);
            listings.append(address);
          
        });
        } else {
          console.log("boo hoo. no user");
        }
    });
    
    
    
});
