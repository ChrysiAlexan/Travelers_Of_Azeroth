document.addEventListener("DOMContentLoaded", function() {
	// Check if the user is logged in by checking the presence of a user cookie
	if (!getCookie("user")) {
		// If the user is not logged in, redirect them to the login page
		window.location.replace("login.html");
	}

	// Fetch the user's packages using an AJAX request
	fetch('../databases/dbHandler.php?action=getMyPackages&userid=' + getCookie("user"))
		.then(function(res) {
			return res.text();
		})
		.then(function(text) {
			// Parse the response as JSON
			var packages = JSON.parse(text);
			
			// Loop through each package and create the corresponding HTML elements
			for (var i = 0; i < packages.length; i++) {
				var col = document.createElement("div");
				col.classList.add("col-12", "col-md-3", "col-sm-12", "p-2");
				var card = document.createElement("div");
				card.classList.add("card");
				var img = document.createElement("img");
				img.classList.add("card-image", "p-2");
				img.src = "../" + packages[i].photoURL;
				img.alt = packages[i].toCity + " image";
				var body = document.createElement("div");
				body.classList.add("card-body");
				var title = document.createElement("h5");
				title.innerHTML = packages[i].toCity;
				var descr = document.createElement("p");
				descr.classList.add("card-text","overflow-auto");
				descr.innerHTML = packages[i].description;
				var list = document.createElement("ul");
				list.classList.add("list-group", "list-group-flush");
				list.innerHTML += '<li class="list-group-item">From ' + packages[i].fromCity + '</li>';
				list.innerHTML += '<li class="list-group-item">To ' + packages[i].toCity + '</li>';
				list.innerHTML += '<li class="list-group-item">Departure ' + packages[i].fromDate + '</li>';
				list.innerHTML += '<li class="list-group-item">Arrival ' + packages[i].toDate + '</li>';
				list.innerHTML += '<li class="list-group-item">Duration ' + packages[i].duration + ' days</li>';
				list.innerHTML += '<li class="list-group-item">Price ' + packages[i].price + ' gold coins</li>';

				body.appendChild(title);
				body.appendChild(descr);

				card.appendChild(img);
				card.appendChild(body);
				card.appendChild(list);

				col.appendChild(card);
				document.querySelector(".myPackages.container .row").appendChild(col);
			}
		})
		.then(function() {
			// Fetch and replace the navigation menu for logged-in users
			return fetch('navLogged.html');
		})
		.then(function(res) {
			return res.text();
		})
		.then(function(text) {
			var oldelem = document.getElementById("nav-placeholder");
			var newelem = document.createElement("div");
			newelem.innerHTML = text;
			oldelem.parentNode.replaceChild(newelem, oldelem);
		})
		.then(function() {
			// Add event listener to the logout button
			document.getElementById("logOut").addEventListener("click", function() {
				// Clear the user cookie and redirect to the home page
				eraseCookie("user");
				window.location.replace("../");
			});
		});
});
