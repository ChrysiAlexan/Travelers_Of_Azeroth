document.addEventListener("DOMContentLoaded", function() {
  // Check if the user is logged in and set the navigation menu accordingly
  if (!getCookie("user")) {
    // User is not logged in, fetch and replace the navigation menu for non-logged in users
    fetch('pages/nav.html')
    .then(function(res) {
        return res.text();
    })
    .then(function(text) {
        var oldelem = document.querySelector("#nav-placeholder");
        var newelem = document.createElement("div");
        newelem.innerHTML = text;
        oldelem.parentNode.replaceChild(newelem, oldelem);
    });
} else {
    // User is logged in, fetch and replace the navigation menu for logged in users
    fetch('pages/navLogged.html')
    .then(function(res) {
        return res.text();
    })
    .then(function(text) {
        var oldelem = document.querySelector("#nav-placeholder");
        var newelem = document.createElement("div");
        newelem.innerHTML = text;
        oldelem.parentNode.replaceChild(newelem, oldelem);
    })
      //log out
      .then(function() {
        // Event listener for the logout button
        document.getElementById("logOut").addEventListener("click", function() {
          eraseCookie("user");
          window.location.replace("./");
      });
    });
  }

  // Check if the page contains the ".TravelPackages.container" element
  if (document.querySelectorAll(".TravelPackages.container").length > 0) {
    // Fetch travel packages from the server
    fetch('databases/dbHandler.php?action=getPackages')
    .then(function(res) {
        return res.text();
    })
    .then(function(text) {
        var packages = JSON.parse(text);

        // Loop through the packages and create HTML elements to display them
        for (var i = 0; i < packages.length; i++) {
          var col = document.createElement("div");
          col.classList.add("col-12", "col-md-3", "col-sm-12", "p-2");
          var card = document.createElement("div");
          card.classList.add("card");
          var img = document.createElement("img");
          img.classList.add("card-image", "p-2");
          img.src = packages[i].photoURL;
          img.alt = packages[i].toCity + " image";
          var body = document.createElement("div");
          body.classList.add("card-body");
          var title = document.createElement("h5");
          title.innerHTML = packages[i].toCity;
          var descr = document.createElement("p");
          descr.classList.add("card-text", "overflow-auto");
          descr.innerHTML = packages[i].description;
          var list = document.createElement("ul");
          list.classList.add("list-group", "list-group-flush");
          list.innerHTML += '<li class="list-group-item">From ' + packages[i].fromCity + '</li>';
          list.innerHTML += '<li class="list-group-item">To ' + packages[i].toCity + '</li>';
          list.innerHTML += '<li class="list-group-item">Departure ' + packages[i].fromDate + '</li>';
          list.innerHTML += '<li class="list-group-item">Arrival ' + packages[i].toDate + '</li>';
          list.innerHTML += '<li class="list-group-item">Duration ' + packages[i].duration + ' days</li>';
          list.innerHTML += '<li class="list-group-item">Price ' + packages[i].price + ' gold coins</li>';
          list.innerHTML += '<li class="list-group-item">Available Seats ' + packages[i].difference + '</li>';

          var footer = document.createElement("div");
          footer.classList.add("card-body");
          var link = document.createElement("a");
          link.href = "#";
          link.classList.add("card-link");
          link.innerHTML = "Purchase";
          //function for the links buy
          link.id = packages[i].packageid;
          link.addEventListener("click", function(e) {
              e.preventDefault();
              var packageid = e.target.id;
              var userid = getCookie("user");
              if (!userid) {
                // If the user is not logged in, redirect them to the login page
                window.location.href = "./pages/login.html";
                return;
            }
            var postdata = {
                action: "purchase",
                packageid: packageid,
                userid: userid
            };
      // Send a POST request to the server to make a purchase
      fetch("./databases/dbHandler.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: objectToUrlParams(postdata)
    })
      .then(function(res) {
          return res.text();
      })
      .then(function(data) {//text that had been return from fetch
          var response = JSON.parse(data);
          if (response[0] == "OK") {
            // If the purchase is successful, redirect to the "myPackages" page
            window.location.href = "pages/myPackages.html";
        }
    });
  
});
          footer.appendChild(link);

          body.appendChild(title);
          body.appendChild(descr);

          card.appendChild(img);
          card.appendChild(body);
          card.appendChild(list);
          card.appendChild(footer);
          col.appendChild(card);

          document.querySelector(".TravelPackages.container .row").appendChild(col);
      }

        // Scroll to the "TravelPackages" section if the URL contains the hash
        var hash = window.location.hash.substr(1);
        if (hash == "TravelPackages") {
          document.getElementById("TravelPackages").scrollIntoView();
      }

        // Display a message if no packages are available
        if (packages.length == 0) {
          document.querySelector(".TravelPackages.container .row").innerHTML = "No packages available at this time";
      }
  });
}


  // Fetch and replace the contact section content
  fetch('pages/contact.html')
  .then(function(res) {
      return res.text();
  })
  .then(function(text) {
      var oldelem = document.querySelector("#Contact");
      oldelem.innerHTML = text;
  })
  .then(function() {
      // Scroll to the "Contact" section if the URL contains the hash
      var hash = window.location.hash.substr(1);
      if (hash == "Contact") {
        document.getElementById("Contact").scrollIntoView();
    }
    
  //   .then(function(){
  //       var con = document.getElementById('cont');
  //       con.addEventListener("submit",function(e){
  //           e.preventDefault();
  //           fetch('databases/dbhandler.php?action=contact&name='+document.getElementById('conname').value+"&email="+document.getElementById('conemail').value+
  //               "&message="+document.getElementById('conmessage').value)
  //           .then(function(res) {
  //                return res.text();
  // })
  //           .then(function(text) {
  //                   var data=JSON.parse(text);
  //                   if(data[0]=="OK"){
  //                       alert('we have your message');
  //                   }
  //           })
  //       });
  //   })
});
});

function objectToUrlParams(obj) {
  const params = new URLSearchParams();
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      params.append(key, obj[key]);
    }
  }
  return params.toString();
}