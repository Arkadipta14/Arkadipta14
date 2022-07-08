
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

function getData()
{
  const data = getQueryDataObject()
  console.log(data)
  if(data?.id)
  {
  	getDetailsFromDB(data.id)
  }
  else
  {
  	window.alert("Invalid ID")
  	window.location.replace("./home.html")
  }
}

function setData(object)
{
	const name = document.getElementById("name")
	const email = document.getElementById("email")
	const service = document.getElementById("service")
	const date = document.getElementById("date")
	const time = document.getElementById("time")
	const cost = document.getElementById("cost")
	console.log(object)

	name.innerHTML = object.name;
	email.innerHTML = object.email;
	service.innerHTML = object.serviceName;
	date.innerHTML = object.date;
	time.innerHTML = object.time;
	cost.innerHTML = object.price;
} 

getData()    //gettin payement from db

function getDetailsFromDB(paymentid) {
  const db = firebase.firestore();
  // console.log(db);
  db.collection("Booking")
    .doc(paymentid)
    .get()
    .then((doc) => {
      console.log(doc.data());
      setData(doc.data());
      
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

const printButton = document.getElementById("print")

function printDetails()
{
    window.print();
}

printButton.addEventListener("click",printDetails);