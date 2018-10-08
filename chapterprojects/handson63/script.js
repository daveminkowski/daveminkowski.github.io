"use strict";

var formValidity = true;


/* validate required fields */
function validateRequired() {
	var inputElements = document.querySelectorAll("#contactinfo input");
	var errorDiv = document.getElementById("errorText"); 
	var elementCount = inputElements.length; 
	var requiredValidity = true; 
	var currentElement;
	
	try {
		
		
		for (var i = 0; i < elementCount; i++) {
			// validate all input elemets in fieldset
			currentElement = inputElements[i];
			if (currentElement.value === "") {
				currentElement.style.background = "rgb(255,233,233)";
				requiredValidity = false;
			} else {
				currentElement.style.background = "white";
			}
		}
		if (requiredValidity === false) {
			throw "Please complete all fields";
		}
		
		errorDiv.style.display = "none";
		errorDiv.innerHTML = "";
	}
	
	catch (msg) {
		errorDiv.styl.display = "block";
		errorDiv.innerHTML = msg;
		formValidity = false;
	}
}

// validate nuber fields for older browsers
function validateNumbers() { 
	var numberInputs = document.querySelectorAll("#contactinfo input[type=number]"); 
	var elementCount = numberInputs.length; 
	var numErrorDiv = document.getElementById("numErrorText"); 
	var numbersValidity = true; 
	var currentElement;
	
	try {
		
		for (var i = 0; i < elementCount; i++) {
			// validate al input elements of type "number" in fieldset
			currentElement = numberInputs[i];
			if (isNaN(currentElement.value) || (currentElement.value === "")) {
				currentElement.style.background = "rgb(255,233,233)";
				numbersValidity = false;
			} else {
				currentElement.style.background = "white";
			}
		}
		
		if (numbersValidity === false) {
			throw "zip and social securty values must be numbers.";
		}
		
		numErrorDiv.style.display = "none";
		numErrorDiv.innerHTML = "";
	} catch (msg) {
		numErrorDiv.style.display = "block";
		numErrorDiv.innerHTML = msg;
		formValidity = false;
	}
}

// remove fallback placeholder text
function zeroPlaceholder() {
	var addressBox = document.getElementById("addrinput");
	addressBox.style.color = "black";
	if (addressBox.value === addressBox.placeholder) {
		addressBox.value = "";
	}
}

// restore placeholder text if box contains no user entry
function checkPlaceholder() {
	var addressBox = document.getElementById("addrinput");
	if (addressBox.value === "") {
		addressBox.style.color = "rgb(178,184,183)";
		addressBox.value = addressBox.placeholder;
	}
}

// add placeholder text for browsers that don't support placeholder attribute
function generatePlaceholder() {
	if (!Modernizr.input.placeholder) { 
		var addressBox = document.getElementById("addrinput"); 
		addressBox.value = addressBox.placeholder; 
		addressBox.style.color = "rgb(178,184,183)"; 
			if (addressBox.addEventListener) {
				addressBox.addEventListener("focus", zeroPlaceholder, false);
				addressBox.addEventListener("blur", checkPlaceholder, false);
			} else if (addressBox.attachEvent) { 
				addressBox.attachEvent("onfocus", zeroPlaceholder);
				addressBox.attachEvent("onblur", checkPlaceholder);
			}
	}
}

// check where the focus should be set when a value is entered int o an ssn field.
function advanceSsn() {
	var ssnFields = document.getElementsByClassName("ssn");
	var currentField = document.activeElement;
	if (currentField.value.length === currentField.maxLength) {
		if (currentField === ssnFields[0]) {
			ssnFields[1].focus();
		}
		if (currentField === ssnFields[1]) {
			ssnFields[2].focus();
		}
		if (currentField === ssnFields[2]) {
			document.getElementById("submitBtn").focus();
		}
	}
}

// call these methods on page load
function setUpPage() {
	createEventListeners();
	generatePlaceholder();
}

// create event listeners
function createEventListeners() { 
	var form = document.getElementsByTagName("form")[0]; 
		if (form.addEventListener) {
			form.addEventListener("submit", validateForm, false); 
		} else if (form.attachEvent) {
			form.attachEvent("onsubmit", validateForm);
		}
	
	var ssnFields = document.getElementsByClassName("ssn"); 
		for (var i = 0; i < ssnFields.length; i++) {
			if (ssnFields[i].addEventListener) { 
				ssnFields[i].addEventListener("input", advanceSsn, false);
			} else if (ssnFields[i].attachEvent) { 
				ssnFields[i].attachEvent("oninput", advanceSsn);
			}
		}
}

// validate form
function validateForm(evt) {
	if (evt.preventDefault) {
		evt.preventDefault(); // prevent form from submitting
	} else {
		evt.returnValue = false; // prevent form from submitting in ie8
	}
	formValidity = true; // reset form for validation
	validateRequired();
	validateNumbers();
	if (formValidity === true) {
		document.getElementsByTagName("form")[0].submit();
	}
}

// call setUpPage() on page load
if (window.addEventListener) { 
	window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) { 
	window.attachEvent("onload", setUpPage);
}


