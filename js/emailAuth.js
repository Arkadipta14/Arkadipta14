const loginmailField = document.getElementById("login_mail");
const loginpasswordField = document.getElementById("login_password");
const displayNameField = document.getElementById("displayName");
// const photoField = document.getElementById("photo");
// const labels = document.getElementsByTagName("label");
const signUp = document.getElementById("signUp");
// const failureModal = document.querySelector(".failure");
// const feedbackMessage = document.querySelector(".feedbackMessage");
const signupmailField = document.getElementById("signup_mail");
const signuppasswordField = document.getElementById("signup_password");
const signInWithMail = document.getElementById("signInWithMail");
const auth = firebase.auth();
const nameField = document.getElementById("name")

//Sends verification emails in the same language as the language used in the
//user's device
auth.useDeviceLanguage();

function addUserToDB(userData) {
  const name = nameField.value
  const db = firebase.firestore();
  // console.log(db);
  db.collection("UserData")
    .doc(userData.uid)
    .set({
      name: name,
      uid: userData.uid,
      email: userData.email,
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}


//Function wrapping all the signup parts including the email verification email
//triggered once the user clicks on the signup button
const signUpFunction = () => {
  const email = signupmailField.value;
  const password = signuppasswordField.value;

  //Built in firebase function responsible for signing up a user
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
      console.log("Signed Up Successfully !");
      console.log(response);
      addUserToDB(response);
      sendVerificationEmail();
    })
    .catch((error) => {
      console.error(error);
    });
};

//Function called right after the signUpWithEmailAndPassword to send verification emails
const sendVerificationEmail = () => {
  //Built in firebase function responsible for sending the verification email
  auth.currentUser
    .sendEmailVerification()
    .then(() => {
      console.log("Verification Email Sent Successfully !");
      window.alert("Email sent! Please verify")
      window.location.reload()
      //redirecting the user to the profile page once everything is done correctly
      //window.location.assign('../profile');
    })
    .catch((error) => {
      alert("Something went wrong!");
      console.error(error);
    });
};

signUp.addEventListener("click", signUpFunction);

//Sign in function
const signInWithEmailFunction = () => {
  const email = loginmailField.value;
  const password = loginpasswordField.value;

  //Built in firebase function responsible for authentication
  auth
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      //Signed in successfully
      if(res.emailVerified)
      {
        const userdata = {email:res.email,userID:res.uid}
        localStorage.setItem("userdata",JSON.stringify(userdata))
        window.location.assign("./home.html")
      }
      else
        alert("Please verify your email")
      //   window.location.assign('./profile')
      console.log("Login result => ", res);
    })
    .catch((error) => {
      //Something went wrong
      alert("Something went wrong")
      console.error(error);
    });
};

signInWithMail.addEventListener("click", signInWithEmailFunction);







function addDataToDB() {
  const db = firebase.firestore();
  console.log(db);
  db.collection("users")
    // .doc(userData.uid)
    .add({
      name: "name",
      uid: "wsegh9i",
      email: "email",
      // isEmailVerified: userData.emailVerified,
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

