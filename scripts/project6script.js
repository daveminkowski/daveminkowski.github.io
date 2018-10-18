// variables representing form components
var nameBox = document.getElementById("name"); // name text field
var emailBox = document.getElementById("email"); // email text field
var messageBox = document.getElementById("message"); // message text field
var notice = document.getElementById("notification"); // notification display paragraph
var sizeSelector = document.getElementById("mobosize"); // selector element
var custForm = document.getElementsByTagName("form")[0]; // the form as an object
var cpuBoxes = document.getElementsByName("cputype"); // the radio selector

// error message to display for any alert dialogs (just 1 for now)
var errMsg = 'Please complete all required fields';
// boolean variable to return (in)valid entries
var formValidity = true;
// regex to check the format of the email field. not completely comprehensive, but at least checks for a name@domain.com formatand will no
// longer accepts emails such as name@ or name@website
var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
/* validate required fields */
function validateRequired() {
	"use strict";
	var fieldsetValidity = true;
	var currentElement;

	try {
		// verify that a cpu type is selected
		if (!cpuBoxes[0].checked && !cpuBoxes[1].checked) {
			cpuBoxes[0].style.outline = "2px solid red"; // if unchecked, recolor, set red border and set fieldsetValidity = false;
			cpuBoxes[0].style.backgroundColor = "#F7F4B0";
			cpuBoxes[1].style.outline = "2px solid red";
			cpuBoxes[1].style.backgroundColor = "#F7F4B0";
			fieldsetValidity = false;
		} else {
			cpuBoxes[0].style.outline = "";
			cpuBoxes[1].style.outline = "";
		}

		// verify a motherboard size has been chosen in the selector element
		currentElement = document.querySelectorAll("select")[0];
		if (currentElement.selectedIndex === -1) { // if no selection, recolor, set red border and set fieldsetValidity = false;
			currentElement.style.border = "3px solid red";
			currentElement.style.backgroundColor = "#F7F4B0";
			fieldsetValidity = false;
		} else {
			currentElement.style.border = ""; // otherwise, remove red border and change bg color back to white
			currentElement.style.background = "white";
		}

		// verify that a name has been entered. If not, recolor background and focus the cursor on the missing field. 
		if (!nameBox.value) {
			nameBox.style.backgroundColor = "#F7F4B0";
			fieldsetValidity = false;
			nameBox.style.border = "3px solid red";
			nameBox.focus();
		} else {
			nameBox.style.backgroundColor = "#FFFFFF";
			nameBox.style.border = "3px solid #8A8A8A";
		}

		// verify that an email address has been entered. If not, recolor background and focus the cursor on the missing field.
		// second half of the if condition checks the email format and returns false if the email is incorrectly formatted, which
		// disallows form submission
		if (!emailBox.value || (!filter.test(emailBox.value))) {
			emailBox.style.backgroundColor = "#F7F4B0";
			fieldsetValidity = false;
			emailBox.style.border = "3px solid red";
			emailBox.focus();
		} else {
			emailBox.style.backgroundColor = "#FFFFFF";
			emailBox.style.border = "3px solid #8A8A8A";
		}

		// verify that a message has been entered. If not, recolor background and focus the cursor on the missing field.
		if (!messageBox.value) {
			messageBox.style.backgroundColor = "#F7F4B0";
			fieldsetValidity = false;
			messageBox.style.border = "3px solid red";
			messageBox.focus();
		} else {
			messageBox.style.backgroundColor = "#FFFFFF";
			messageBox.style.border = "3px solid #8A8A8A";
		}

		// finally, if any of the above required validation is not met, throw the error message. Otherwise, validation is successful and no further action is needed.
		if (fieldsetValidity === false) {
			throw errMsg;
		} else {
			notice.style.display = "none";
			notice.innerHTML = "";
		}

		// if any of the validation returns fails, return false to the validateForm() method. 
	} catch (msg) {
		formValidity = false;
		// while this is where the error will be caught, the field color change and boolean return of each required field is handled above, per field.
		// ANY failed validity will change the notification text just above the form (to an error message stored as a string), cause the background
		// color of the missing field(s) to change to yellow and show a pop up alert to the user. If the cpu or form factor isn't chosen from the form
		// those fields will be outlined in red.
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

	if (formValidity === true) { // if validation is true, submit the form
		custForm.submit();

	} else { // otherwise change notification text to the error message
		notice.style.borderColor = "red";
		alert(errMsg);
	}
}

/////////////////////////////////////////////////// page load and event listeners ///////////////////////////////////////////////////

// run setup functions on page load
if (window.addEventListener) {
	window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
	window.attachaEvent("onload", setUpPage);
}

// call these functions on page load
function setUpPage() {
	"use strict";
	removeSelectDefault();
	createEventListeners();
	generatePlaceholder();
}

// remove default value from motherboard size list (make the list appear empty, requiring a selection)
function removeSelectDefault() {
	"use strict";
	sizeSelector.selectedIndex = -1;
}

// create event listeners
function createEventListeners() {
	"use strict";
	if (custForm.addEventListener) {
		custForm.addEventListener("submit", validateForm, false);
	} else if (custForm.attachEvent) {
		custForm.attachEvent("onsubmit", validateForm);
	}
}

// add placeholder text for browsers that don't support placeholder attribute
function generatePlaceholder() {
	"use strict";
	if (!Modernizr.input.placeholder) {
		// why is Modernizer "not defined" here? (per dreamweaver). Everything seems to work with no messages in debugging console
		messageBox.value = messageBox.placeholder;
		if (messageBox.addEventListener) {
			messageBox.addEventListener("focus", zeroPlaceholder, false);
			messageBox.addEventListener("blur", checkPlaceholder, false);
		} else if (messageBox.attachEvent) {
			messageBox.attachEvent("onfocus", zeroPlaceholder);
			messageBox.attachEvent("onblur", checkPlaceholder);
		}
	}
}

// remove fallback placeholder text
function zeroPlaceholder() {
	"use strict";
	messageBox.style.color = "black";
	if (messageBox.value === messageBox.placeholder) {
		messageBox.value = "";
	}
}

// restore placeholder text if box contains no user entry
function checkPlaceholder() {
	"use strict";
	if (messageBox.value === "") {
		messageBox.value = messageBox.placeholder;
	}
}
