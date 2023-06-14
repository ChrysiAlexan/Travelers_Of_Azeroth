document.addEventListener("DOMContentLoaded", function() {
  // Check if the user is already logged in
  if (getCookie("user")) {
    // If the user is logged in, redirect them to the home page
    window.location.replace("../");
  }

if(document.getElementById("form-log")){
  // Event listener for the login form submission
  document.getElementById("form-log").addEventListener("submit", function(e) {
    e.preventDefault();
    var dat = {
      action:"login",
    email:document.getElementById('email').value,
    password:document.getElementById('password').value
  };
  console.log(JSON.stringify(dat));
    // Send a POST request to the server with the form data
    var xhr = new XMLHttpRequest(); // creates an httprequest object
    xhr.open("POST", "../databases/dbHandler.php", true); //what methode (post||get) and what url
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = function() { //event when request finishes and wants to do something with response
      if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText); //response from php an array position with 2 values [0] is OK or Error and [1] is userid or error message
        if (response[0] === "OK") {
          // If login is successful, set the user cookie and redirect to the home page
          setCookie("user", response[1], 7);
          window.location.replace("../");
        }
      }
    };
    xhr.send(objectToUrlParams(dat));//js sends form data as json
  });
}

  // Event listener for the registration form submission
if(document.getElementById("registerForm"))
{
  document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();
    var pass1Valid, passwordsMatch = false;
    var pass1 = document.getElementById('password');
    // Validate password format using a regular expression
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(pass1.value)) {
      pass1Valid = true;
    }
    var pass2 = document.getElementById('repassword');

    // Check if the two password fields match
    if (pass1.value === pass2.value) {
      passwordsMatch = true;
    }

    // Check form validity and password validations 
    if (!this.checkValidity() || !pass1Valid || !passwordsMatch) {
      if (!pass1Valid){
        pass1.classList.add("is-invalid");
      }
      if (!passwordsMatch) {
        pass2.classList.add("is-invalid");
      }
    } else 
    {

    	var data ={
    		action:"register",
    		firstname: document.getElementById('firstname').value,
    		lastname: document.getElementById('lastname').value,
    		email: document.getElementById('email').value,
    		password: document.getElementById('password').value,
    		address: document.getElementById('address').value,
    		city: document.getElementById('city').value,
    		"postal-code": document.getElementById('postal-code').value,
    		"mobile-phone": document.getElementById('mobile-phone').value
    	};
      console.log(JSON.stringify(data)
)      // If form is valid, send a POST request to the server with the form data
      //request to send to php from register
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "../databases/dbHandler.php", true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          var errorMessage = document.getElementById("error_message");
          errorMessage.innerHTML = response[1];
          if (response[0] === "OK") {
            // Display success message and redirect to the login page after a delay
            errorMessage.classList.add("text-success");
            window.setTimeout(function() {
              window.location.replace("./login.html");
            }, 2000);
          } else {
            // Display error message
            errorMessage.classList.add("text-danger");
          }
        }
      };
      xhr.send(objectToUrlParams(data));
    }
    this.classList.add("was-validated");
  });
}
  // Fetch and replace the navigation menu
  fetch("nav.html")
    .then(function(res) {
      return res.text();
    })
    .then(function(text) {
      var oldelem = document.getElementById("nav-placeholder");
      var newelem = document.createElement("div");
      newelem.innerHTML = text;
      oldelem.parentNode.replaceChild(newelem, oldelem);
    });


});
//convert a js object to string suitable for request data
function objectToUrlParams(obj) {
  const params = new URLSearchParams();
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      params.append(key, obj[key]);
    }
  }
  return params.toString();
}