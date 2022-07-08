
// var currentDateTime = new Date();
// var year = currentDateTime.getFullYear();
// var month = (currentDateTime.getMonth() + 1);
// var date = (currentDateTime.getDate() + 1);

// if(date < 10) {
//   date = '0' + date;
// }
// if(month < 10) {
//   month = '0' + month;
// }

// var dateTomorrow = year + "-" + month + "-" + date;
// var checkinElem = document.querySelector("#checkin-date");
// // var checkoutElem = document.querySelector("#checkout-date");

// checkinElem.setAttribute("min", dateTomorrow);

// checkinElem.onchange = function () {
//     checkoutElem.setAttribute("min", this.value);
// }

let serviceData = null;


$(".timeOptions button").on('click', function () {
  $(this).siblings().removeClass('active');

  $(this).toggleClass("active");
 
})

$(".dateOptions button").on('click', function () {
  $(this).siblings().removeClass('active');

  $(this).toggleClass("active");
 
})


function addDataToDB(object) {
  const db = firebase.firestore();
  console.log(db);
  db.collection("Booking")
    // .doc(userData.uid)
    .add(object)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef);
      redirect(docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

function getQueryDataArray() {
  /* It returns array of keys and values in url query string
    eg. for url = http://localhost:3000/index.html?key1=value1&key2=value2
    then it will return [['key1', 'value1'], ['key2', 'value2']]
    */
  const queries = window.location.href.split("?")[1];

  if (queries) {
    let array = [];
    const urlParams = new URLSearchParams(queries);

    for (const item of urlParams) {
      array.push(item);
    }

    return array;
  }
  return null;
}

function getQueryDataObject() {
  /* It returns object with all keys and values in url query string
    eg. for url = http://localhost:3000/index.html?key1=value1&key2=value2
    then it will return {'key1': 'value1', 'key2': 'value2']
    */
  const array = getQueryDataArray();
  if (array) {
    const arrayOfObject = Object.fromEntries(array);
    return arrayOfObject;
  }

  return null;
}

function getDetailsFromDB(serviceName) {
  const db = firebase.firestore();
  // console.log(db);
  db.collection("ServiceData")
    .where("Name","==",serviceName)
    .get()
    .then((response) => {
      console.log(response.docs[0].data());
      // setData(response.docs[0].data());
      serviceData = response.docs[0].data();
      serviceData.id = response.docs[0].id
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

function getData()
{
  const data = getQueryDataObject()
  console.log(data)
  getDetailsFromDB(data.service)
}

getData();     //getting data for service where service comes from url query

function bookapt()
{
  var name = $("#name").val();
  var mail = $("#usermail").val();
  const userdata =  JSON.parse(localStorage.getItem("userdata"))
  const userID = userdata.userID
  var phone = $("#phone").val();
  // var date = $("#date").val();
  // var time = $("#time").val();
  let date = $(".dateOptions button.active");
  let time = $(".timeOptions button.active");
  date = date.text().trim();
  time = time.text().trim();
  // console.log(name);
  // console.log(mail);
  // console.log(phone);
  // console.log(date);
  // console.log(time);

  const data = {
    name:name, email:mail, phone:phone, date:date, time:time, serviceId: serviceData.id,serviceName:serviceData.Name, price:serviceData.Price, userid: userID
  }
  console.log(data);
  addDataToDB(data);

  // const db = firebase.firestore();
  // const batch = db.batch();


  // const bookref = db.collection("Appointments").doc();
  // db.set(bookref,data);
  // db.commit()
  //   .then(()=>{
  //     console.log("Service booked!");
  //     window.location.assign("/payment.html?id="+bookref.id);
  //   })
  //   .catch((error)=>{
  //     console.log(error);
  //   });

}

confirmBook.addEventListener('click',bookapt);

function setemail() {

  const userdata =  JSON.parse(localStorage.getItem("userdata"))
  if(userdata.email)
  {
    const emailField = document.getElementById("usermail")
    emailField.value = userdata.email
  }

}

setemail()

function redirect(id)
{
  window.location.replace("./payment.html?id="+id)
}


const cancelbutton = document.getElementById("cancel")


function back()
{
  window.location.replace("./personal.html")
}

cancelbutton.addEventListener('click',back);

