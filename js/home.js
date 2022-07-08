
// const services = ["Haircut", "Hair spa","Car Repair","Waxing","Threading"]
const searchlist = document.getElementById("searchlist")
const search = document.getElementById("search")
const search_button = document.getElementById("search_button")


function renderlist(array)
{
	for(let i=0;i<array.length;i++)
	{
		const serviceName = array[i]
		const node = document.createElement("LI");                 // Create a <li> node
		const textnode = document.createTextNode(serviceName);         // Create a text node
		node.appendChild(textnode);                              // Append the text to <li>
		searchlist.appendChild(node);     // Append <li> to <ul> with id="myList"
		}
	
}

search.addEventListener("keyup",search_list)

search_button.addEventListener("click",search_list)

function search_list()
{
	// searchlist.innerHTML = ""
	const searchTerm = search.value.toLowerCase()
    console.log(searchTerm)
	// const newarray = services.filter((item)=>{
	// 	if(item.toLowerCase().indexOf(searchTerm)>-1)
	// 		return item
	// 	else
	// 		return null
	// })
	// // console.log("search called")
	// renderlist(newarray)
	// Declare variables
  var input, filter, ul, li, a, i, txtValue;
  // input = document.getElementById('');
  // filter = input.value.toUpperCase();
  // ul = document.getElementById("myUL");
  li = searchlist.getElementsByTagName('li');

  if(searchTerm==="" || !searchTerm)
  {
  	console.log("enter")
  	// for (i = 0; i < li.length; i++)
  	// {
  	// 	console.log(li)
  	// 	li[i].style.display = "none";
  	// }
  	searchlist.style.display="none";
  }
  else
  {
  	searchlist.style.display=""
  }

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toLowerCase().indexOf(searchTerm) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }


}

search_list()
// renderlist()

$('#logout').on('click', function(){
    // signOut(auth);
    console.log("logout");
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        localStorage.removeItem("userdata");
        window.location.assign("./index.html");
      }).catch((error) => {
        // An error happened.
      });
})

const uname = document.getElementById("username")

const auth = firebase.auth()

auth.onAuthStateChanged((user) => {
  if (user) {
    const isemailverified = user.emailVerified
    if(isemailverified)
    {
      var pnum = user.email;
      uname.innerHTML = pnum;
    }
    else
    {
      window.alert("Please verify your email")
      window.location.replace("./index.html")
    }
    
  } 
  else {
    window.location.replace("./index.html")
    // User is signed out
    // ...
  }
});