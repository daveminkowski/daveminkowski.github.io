// variable used in timeout function
var wait;

// page elements
var latDisplay = document.getElementById("latitude");
var longDisplay = document.getElementById("longitude");
var elevationDisplay = document.getElementById("elevation");
var elevationLabel = document.getElementById("elevationLabel");
var errDisplay = document.getElementById("notify");

// function to create map or fail if browser can display geolocation properties (from hands on 10-3)
function geoTest() {
	"use strict";
	wait = setTimeout(fail, 10000);
	// create the map if passed
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(createMap, fail);
	// otherwise display the fail error
	} else {
		fail();
	}
}

// create the map display to use in the map div
function createMap(position) {
	"use strict";
	clearTimeout(wait);
	// latitude, longitude and altitude variables for respective display elements
	var CurrLat = position.coords.latitude;
	var CurrLong = position.coords.longitude;
	
	// mapOptions parameter for google maps api - hybrid map shows satellite and street views, zoom level 15 is street-level zoom
	// zoom1: world
	// zoom5: landmass/continent
	// zoom10: City
	// zoom15: Street
	// zoom20: Buildings
	
	var mapOptions = {
		center: new google.maps.LatLng(CurrLat, CurrLong),
		zoom: 15,
		mapTypeId: 'hybrid', 
	};
	
	// create the map object using the above map options
	var map = new google.maps.Map(document.getElementById("map"), mapOptions);
	// elevator service to get altitude/elevation
	var elevator = new google.maps.ElevationService;
	// map window appears on map click
	var infowindow = new google.maps.InfoWindow({
		map: map
	});
	
	// changing the display of the page elements on page load
	latDisplay.innerHTML = "<code>&emsp;" + CurrLat + "</code>";
	longDisplay.innerHTML = "<code>&emsp;" + CurrLong + "</code>";
	elevationDisplay.innerHTML = "?";
	errDisplay.innerHTML = "<em>Click anywhere on the map to display the elevation at that point</em>";
	
	// event listener for map clicks (to display elevation)
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
				// results[0].elevation is the value for the altitude
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

// if no geolocation available, show this message (instead of nothing where the map would be)
function fail() {
	"use strict";
	document.getElementById("map").innerHTML = "Unable to display your current location.";
}
