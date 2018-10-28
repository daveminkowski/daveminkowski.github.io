// math/ms conversion constants
var dayLength = (1000 * 60 * 60 * 24); // number of ms in a single day
var monthLength = (1000 * 60 * 60 * 24 * 31); // number of ms in a single month
var yearLength = (1000 * 60 * 60 * 24 * 365); // number of ms in a single year

// variables for today's values
var today = new Date();
var currYear = today.getFullYear();
var currMonth = today.getMonth() + 1; // months begin at 0 in date objects
var currDay = today.getDate();

//var dateForm = document.getElementsByTagName("form")[0]; // the form as an object
// form fields
var todayField = document.getElementById("today"); // displays today's date
var startDate = document.getElementById("startDate"); // field for the user-entered date
var result = document.getElementById("result"); // output
var result2 = document.getElementById("result2"); // more output

// error message to display for any alert dialogs
var errMsg = "Please ensure a proper date has been entered.";
// boolean variable to return (in)valid entries
var formValidity = true;

// the actual math function
function calculateDifference() {
	"use strict";
	// validation boolean
	var validity = true;

	// variables for user-entered date
	var userDate = new Date(startDate.value);
	var userMonth = (userDate.getMonth() + 1); // months start at 0 while stored in date objects
	var userDay = (userDate.getDate() + 1);// dates start at 0 while stored in date objects
	var userYear = userDate.getFullYear();

	// conversion of dates to milliseconds
	var startDateMS = userDate.getTime(); // convert user date to milliseconds
	var todayMS = today.getTime(); // convert today's date to milliseconds

	// math variables

	// get the difference in time that's passed between the dates
	var difference = todayMS - startDateMS;
	// total number of days spanning the difference in dates, converted from milliseconds
	var totaldays = Math.floor(difference / dayLength)-1;
	// total number of whole years in the date difference
	var years = Math.floor(difference / yearLength);
	// remainder of the year division
	var monthRemainder = (difference % yearLength);
	// total number of months wholly divisible in the year remainder
	var months = Math.floor(monthRemainder / monthLength);
	// remainder of the month division
	var daysRemainder = (monthRemainder % monthLength);
	// number of days wholly divisible in the month remainder
	var days = Math.floor(daysRemainder / dayLength)-1;

	try {
		// verify that a date has been entered. If not, recolor background/border and focus the cursor on the missing field. 
		if (!startDate.value) {
			startDate.style.backgroundColor = "#F7F4B0";
			validity = false;
			startDate.style.border = "2px solid red";
			startDate.focus();
		} else {
			startDate.style.backgroundColor = "#FFFFFF";
			startDate.style.border = "2px solid #8A8A8A";
		}

		// if any of the above required validation is not met, throw the error message. Otherwise, validation is successful and no further action is needed.
		if (validity === false) {
			throw errMsg;
		}
		
		// if the user date is today or earlier...
		if ((userYear < currYear) || ((userYear <= currYear && userMonth < currMonth)) || ((userYear <= currYear && userMonth <= currMonth && userDay <= currDay))){
			// if the user date is today....
			if (userYear === currYear && userMonth === currMonth && userDay === currDay) {
				result.innerHTML = "That's Today!";
				result2.innerHTML = "";
			} else {
			// otherwise it MUST be a previous date...
				result.innerHTML = "Since " + userMonth + "/" + userDay + "/" + userYear + ", " + " a total of " + totaldays + " days have passed.";
				result2.innerHTML = "This is the equivalent of " + years + " years, " + months + " months and " + days + " days.";
			}
		}
		// otherwise it MUST be a future date...
		else {
			// absolute value of the difference in the original equation - Line 43
			var futureDifference = Math.abs(difference);
			// total days in that span
			var futureTotalDays = Math.floor(futureDifference / dayLength) + 1;
			// total number of years wholly divisible in the date difference
			var futureYears = Math.floor(futureDifference / yearLength);
			// remainder of the year division
			var futureMonthRemainder = (futureDifference % yearLength);
			// total number of months wholly divisible in the year remainder
			var futureMonths = Math.floor(futureMonthRemainder / monthLength);
			// remainder of the month division
			var futureDaysRemainder = (futureMonthRemainder % monthLength);
			// number of days wholly divisible in the month remainder
			var futureDays = Math.floor(futureDaysRemainder / dayLength) + 1;

			result.innerHTML = "This is " + futureTotalDays + " days in the future!";
			result2.innerHTML = "This is the equivalent of " + futureYears + " years, " + futureMonths + " months and " + futureDays + " days from now.";
			// if any of the validation returns fails, return false to the validateForm() method. 
		}
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
	calculateDifference(); // call calculation here if form fields are valid
	if (!formValidity) { // if validation is false, show error message
		alert(errMsg);
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
	resetPageDefaults();
	createEventListener();
}

// set values to defaults
function resetPageDefaults() {
	"use strict";
	startDate.value = ""; // clear last starting value on reload
	result.innerHTML = ""; // clear previous results on reload
	result2.innerHTML = ""; // clear previous results on reload
	todayField.innerHTML = "Today's Date:&emsp;" + currMonth + "/" + currDay + "/" + currYear; // reload current mm/dd/yyyy on page load
	startDate.style.backgroundColor = "#FFFFFF";
	startDate.style.border = "2px solid #8A8A8A";
}

// create event listener for calculate button
function createEventListener() {
	"use strict";
	var submitButton = document.getElementById("calculate");
	if (submitButton.addEventListener) {
		submitButton.addEventListener("click", validateForm, false);
	} else if (submitButton.attachEvent) {
		submitButton.attachEvent("onclick", validateForm);
	}
	var resetButton = document.getElementById("reset");
	if (resetButton.addEventListener) {
		resetButton.addEventListener("click", resetPageDefaults, false);
	} else if (resetButton.attachEvent) {
		resetButton.attachEvent("onclick", resetPageDefaults);
	}
}
