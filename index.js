


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
  
      document.getElementById("user_div").style.display = "block";
      document.getElementById("login_div").style.display = "none";
  
       user = firebase.auth().currentUser;
  
      if(user != null){
  
        var email_id = user.email;
        //document.getElementById("user_para").innerHTML = "Welcome: " + email_id;
  

        var firestore = firebase.firestore();
        const docRef = firestore.doc("users/" + user.uid);

        const outputHeader = document.querySelector("#currentPrintOutput");
      

      getRealtimeUpdates = function() {
        docRef.onSnapshot(/*{includeMetadataChanges: true},*/ function(doc){
          if(doc && doc.exists){
            const myData = doc.data();
            //console.log(doc);
            if (myData.currentPrint == null){
              outputHeader.innerText = "No Print File Selected";
            }else{
            outputHeader.innerText = "Ready to Print: " + myData.currentPrint;
            }
        }
        });
      }

      getRealtimeUpdates();
      }
  
    } else {
      // No user is signed in.
  
      document.getElementById("user_div").style.display = "none";
      document.getElementById("login_div").style.display = "block";
  
    }
  });
  
  function login(){
  
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
  
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
  
      window.alert("Error : " + errorMessage);

    });
  }

  function signup(){
  
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
  
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
  
      window.alert("Error : " + errorMessage);
  
    });
  }
  
  function logout(){
    firebase.auth().signOut();
  }
  