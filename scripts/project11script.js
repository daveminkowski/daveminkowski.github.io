
// page elements
var notification = document.getElementById("notification");
var userInput = document.getElementById("zipCode");
var results = document.getElementById("results");
var weatherIcon = document.getElementById("weatherIcon");
var weatherTable = document.getElementById("weatherTable");
var latitude = document.getElementById("latitude");
var longitude = document.getElementById("longitude");
var currTemp = document.getElementById("currTemp");
var currHumidity = document.getElementById("currHumidity");
var currVisibility = document.getElementById("currVisibility");
var jsonReport = document.getElementById("JSONReport");
var errMsg = "Please enter your 5 digit ZIP code.";
var formValidity = true;

// my openweathermap.org API key (I know, I know, don't share API keys)
var API_KEY = "&appid=75565083006a596d36acf2b201bf8219";
var requestURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

function sendWeatherRequest(userZip) {
	"use strict";
	userZip = userInput.value;
	var weatherRequest = new XMLHttpRequest();
	var searchURL = requestURL + userZip + API_KEY;
	// receive data about a zip code using the endpoint given by openweather (api.openweathermap.org/data/2.5/weather?q=ZIP_CODE&appid=API_KEY);
	weatherRequest.open('GET', searchURL);
	
	weatherRequest.onload = function() {
	// save the data as an array of objects to access
	var weatherData = JSON.parse(weatherRequest.responseText);
	// save specific variables from weatherData to use where needed:
	// city/region name
	var myCity = weatherData.name;
	// weather data is returned as a value in kelvin by default and is converted to fahrenheit here
	var myCurrentTemp = convertKtoF(weatherData.main.temp);
	// humidity
	var myHumidity = weatherData.main.humidity;
	// coordinates
	var myLatitude = weatherData.coord.lat;
	var myLongitude = weatherData.coord.lon;
	// visibility/weather description
	var myVisibility = weatherData.weather[0].main;
	// the appropriate weather icon to visusalize the returned weather condition returned in the JSON object
	var weatherIconURL = "<img src=\"http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png\">";

	// change DOM elements text display:
	jsonReport.innerHTML = weatherRequest.responseText;
	jsonReport.style="visibility: visible";
	weatherTable.style="visibility: visible";
	results.innerHTML = "Current weather in the " + myCity + " area:";
	currTemp.innerHTML = "&emsp;" + myCurrentTemp + " °F";
	currTemp.style="visibility: visible";
	currHumidity.innerHTML = "&emsp;" + myHumidity + "%";
	currHumidity.style="visibility: visible";
	latitude.innerHTML = "&emsp;" + myLatitude;
	latitude.style="visibility: visible";
	longitude.innerHTML = "&emsp;" + myLongitude;
	longitude.style="visibility: visible";
	currVisibility.innerHTML = "&emsp;" + myVisibility;	
	currVisibility.style="visibility: visible";
	weatherIcon.innerHTML = weatherIconURL;
	};
	// send the request
	weatherRequest.send();
}

// converts temp value returned from kelvin to fahrenheit
function convertKtoF(value) {
	"use strict";
	var fTemp = "";
	fTemp = ((value * (9/5)) - 459.67).toFixed(2);
	return fTemp;
}

/////////////////////////////////////////////////// VALIDATION ///////////////////////////////////////////////////

function validateRequired() {
	"use strict";
	var fieldsetValidity = true;
	try {
		
	// verify that a numeric 5 digit zip has been entered. If not, recolor background and focus the cursor on the zip field
		if (!userInput.value || !validateFormField(userInput.value)) {
			userInput.style.backgroundColor = "#F7F4B0";
			fieldsetValidity = false;
			userInput.style.border = "2px solid red";
			notification.innerHTML = "Invalid ZIP Code";
			userInput.focus();
		} else {
			userInput.style.border = "";
			userInput.style.backgroundColor = "#FFFFF";
		}
	
		if (fieldsetValidity === false) {
			throw errMsg;
		} else {
			notification.style.display = "none";
			notification.innerHTML = "";
		}

		// if any of the validation returns fails, return false to the validateForm() method. 
	} catch (msg) {
		formValidity = false;
	}
}
// validate form
function validateForm(event) {
	"use strict";
	if (event.preventDefault) {
		event.preventDefault(); // prevent form from submitting
	} else {
		event.returnValue = false; // prevent form from submitting in IE8
	}
	formValidity = true;
	validateRequired(); // call form validation method here

	if (formValidity === true) { // if validation passes, proceed to submit a weather Request
		sendWeatherRequest();
	} else {
		// otherwise give an alert
		notification.style.borderColor = "red";
		alert(errMsg);
	}
}

function validateFormField(formField) {
	"use strict";
//	allows ONLY 5 digits for input
	var zipFilter = /^(?=(\D*\d){5}\D*$)/;
	
// regex legend
// \D - non-digit
// \d - any digit
// {5} - repeat 5 times, ensuring 5 digits are entered

	if (zipFilter.test(formField)) {
		return true;
	} else {
		return false;
	}
}

/////////////////////////////////////////////////// PAGE SETUP ///////////////////////////////////////////////////

// run setup function on page load
if (window.addEventListener) {
	window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
	window.attachaEvent("onload", setUpPage);
}

// call these functions during page setup
function setUpPage() {
	"use strict";
	createEventListener();
}

// create event listener for submit button
function createEventListener() {
	"use strict";
	var submitButton = document.getElementById("submit");
	if (submitButton.addEventListener) {
		submitButton.addEventListener("click", validateForm, false);
	} else if (submitButton.attachEvent) {
		submitButton.attachEvent("onclick", validateForm);
	}
}
