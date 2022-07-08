function getQueryDataArray() {
  /* It returns array of keys and values in url query string
    eg. for url = http://localhost:3000/index.html?key1=value1&key2=value2
    then it will return ['key1', 'value1', 'key2', 'value2']
    */
  const queries = window.location.href.split("?")[1];

  if (queries) {
    let array = [],
      hash;
    let hashes = queries.split("&");
    for (let i = 0; i < hashes.length; i++) {
      hash = hashes[i].split("=");
      if (hash[0] !== "") array.push(hash);
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

// console.log(getQueryDataArray());
// console.log(getQueryDataObject());

$(".gotoNewPage").on("click", gotoNewPage); // Adding eventListener

function gotoNewPage(e) {
  e.preventDefault();
  /* It redirect to a new path
    It is triggered onclick of any element with class 'gotoNewPage'
    !IMPORTANT! The element must have these three attributes
    1. path => the page to where to redirect eg. data-path='./test.html'
    2. key => the key of the data to be passed eg. data-key='city'
    3. value => the key of the data to be passed eg. data-value='kolkata'
    */
  const key = e.target.getAttribute("data-key");
  const value = e.target.getAttribute("data-value");
  const newPath = e.target.getAttribute("href");

  if (key && value && newPath) {
    const presentData = getQueryDataArray();
    let newLink = newPath + "?";
    newLink = newLink + `${key}=${value}`;
    if (presentData) {
      presentData.forEach((item) => {
        newLink = newLink + `&${item[0]}=${item[1]}`;
      });
    }
    //redirecting to the new link with data as url query string
    window.location.assign(newLink);
  }
}




<script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk="
    crossorigin="anonymous"></script>