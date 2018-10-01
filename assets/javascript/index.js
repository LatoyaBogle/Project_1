var latitude, longitude,token="false";

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
    sessionStorage.clear();
    //call geolocation
    geoLoc();
    
    //button for Logging in
    $("#confirm").on("click", function(){
        //check if user is already signed in        
        firebase.auth().onAuthStateChanged(function(user) {
            //console.log("in auth");
            //if they are signed in and we have long and lat log in and direct to main.html
            if (user) {
                if(longitude && latitude) {
                    // Store all content into sessionStorage
                    sessionStorage.setItem("longitude", longitude);
                    sessionStorage.setItem("latitude", latitude);
                    window.location.href = "main.html";
                }
            } else {
                //console.log("signing in");
                //if not logged in, sign in.
                signIn();
            }
        });
    });
    
});

function geoLoc() {
    //if geo location is enabled get the values
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getCurrentLocation);
       
    } else {
        //if it is disabled, nothing will happen
        console.log ("geolocation not available");
    }
}

function getCurrentLocation (position) {
    //get longitude and latitude
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log ("lon is "+longitude+" and lat is "+latitude);
    //make an openweather call to get location name
    var APIKey = "9cf07e60efb34da49a4496096daf288b";
    var queryURL="https://api.openweathermap.org/data/2.5/weather?lat="+latitude + "&lon=" + longitude + "&APPID=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
             
        $("#currLoc").text(response.name);
    
            
    });    
    //envoke mapbox to show the geocoder.
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWlzaHRpYXEiLCJhIjoiY2psdnBtY2VvMDUyMTNxcXN0ZGJwcjd2YiJ9.jiV57t9pdOYOb8iJc_xABg';
    
    var mapL = new mapboxgl.Map({
        container: 'mapLanding', // container id
        style: 'mapbox://styles/mapbox/light-v9', // stylesheet location
        center: [longitude, latitude], // starting position [lng, lat]
        zoom: 8 // starting zoom
    }); 
    var geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken
    });
    $('#geocoderLanding').append(geocoder.onAdd(mapL));
    geocoder.on('result', function(ev) {
       
        
    //once the location changes run displayMeetupAPI to get new data 
    longitude=ev.result.geometry.coordinates[0];
    latitude=ev.result.geometry.coordinates[1];
        
    });
    
}

function signIn() {
    console.log("in sign in");
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {
        console.log("Sign In successful");
        // This gives you a Google Access Token. You can use it to access the Google API.
        token = result.credential.accessToken;
        // console.log(token);
        if(longitude && latitude) {
            // Store all content into sessionStorage
            sessionStorage.setItem("longitude", longitude);
            sessionStorage.setItem("latitude", latitude);
            window.location.href = "main.html";
            

        }
        }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        });
}
