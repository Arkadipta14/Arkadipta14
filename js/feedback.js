

const nameField = document.getElementById("name")
const mailField = document.getElementById("email")
const msgField = document.getElementById("fmessage")
const sendLetter = document.getElementById("sendLetter")
const cancel = document.getElementById("cancel")


function addDataToDB(object) {
  const db = firebase.firestore();
  console.log(db);
  db.collection("Feedback")
    // .doc(userData.uid)
    .add(object)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}


function remove()
{
  nameField.value=""
  mailField.value=""
  msgField.value=""
  window.alert("Feedback Removed");
}

cancel.addEventListener("click",remove);


function sendfeedback() {
  const name = nameField.value
  const mail =  mailField.value
  const msg = msgField.value
  const object = {name:name, mail:mail, message:msg}
  addDataToDB(object)
  document.body.classList.add("sent");
  window.alert("Thank you for your feedback");
  remove();
}

sendLetter.addEventListener("click", sendfeedback);


