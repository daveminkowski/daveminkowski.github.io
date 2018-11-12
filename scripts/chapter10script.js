var wait;
var latDisplay = document.getElementById("latitude");
var longDisplay = document.getElementById("longitude");
var elevationDisplay = document.getElementById("elevation");
var elevationLabel = document.getElementById("elevationLabel");
var errDisplay = document.getElementById("notify");

function geoTest() {
	"use strict";
	wait = setTimeout(fail, 10000);
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(createMap, fail);
	} else {
		fail();
	}
}

function createMap(position) {
	"use strict";
	clearTimeout(wait);
	var Lat = position.coords.latitude;
	var CurrLat = Lat.toFixed(5);
	var Lng = position.coords.longitude;
	var CurrLong = Lng.toFixed(5);
	var CurrAlt = position.coords.altitude;

	var mapOptions = {
		center: new google.maps.LatLng(CurrLat, CurrLong),
		zoom: 15,
		mapTypeId: 'hybrid', 
	};

	var map = new google.maps.Map(document.getElementById("map"), mapOptions);
	var elevator = new google.maps.ElevationService;
	var infowindow = new google.maps.InfoWindow({
		map: map
	});

	latDisplay.innerHTML = "<code>&emsp;" + Lat + "</code>";
	longDisplay.innerHTML = "<code>&emsp;" + Lng + "</code>";
	elevationDisplay.innerHTML = "?";
	errDisplay.innerHTML = "<em>Click anywhere on the map to display the elevation at that point</em>";
	
	map.addListener('click', function (event) {
		displayLocationElevation(event.latLng, elevator, infowindow);
	});

} // end map creation function


// function to display altitude on map info window
function displayLocationElevation(location, elevator, infowindow) {
	"use strict";
	// Initiate the location request
	elevator.getElevationForLocations({
		'locations': [location]
	}, function (results, status) {
		infowindow.setPosition(location);
		if (status === 'OK') {
			// Retrieve the first result
			if (results[0]) {
				// Open the infowindow indicating the elevation at the clicked position.
				// round elevation value to 2 decimal places
				var roundedElevation = results[0].elevation.toFixed(2); 
				infowindow.setContent('The elevation at this point <br>is ' +
					roundedElevation + ' meters.');
				elevationLabel.innerHTML = "<code>Elevation at this point:";
				elevationDisplay.innerHTML = "<code>&emsp;" + roundedElevation + " meters.</code>";
			} else {
				infowindow.setContent('No results found');
			}
		} else {
			infowindow.setContent('Elevation service failed due to: ' + status);
		}
	});
}

function fail() {
	"use strict";
	document.getElementById("map").innerHTML = "Unable to display your current location.";
}
