
const heading = document.getElementById("heading")
const details = document.getElementById("details")
const image = document.getElementById("image")
const price = document.getElementById("price")
const load = document.getElementById("load")

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



function setData(object) {
	load.style.display="none"
	heading.innerHTML = object.Name
	details.innerHTML = object.Details
	price.innerHTML = object.Price
	image.src = object.Image
}


function getDetailsFromDB(serviceName) {
  const db = firebase.firestore();
  // console.log(db);
  db.collection("ServiceData")
  	.where("Name","==",serviceName)
    .get()
    .then((response) => {
      console.log(response.docs[0].data());
      setData(response.docs[0].data());
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



getData()
