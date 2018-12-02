// EXAMPLE 1

var someNumber = 10;

addFiveFunction(someNumber);

function addFiveFunction(anyNumber) {
	"use strict";
	var answer = 5 + anyNumber;
	console.log("The result of the function is " + answer + ".");
	return answer;
}

// EXAMPLE 2
var calcButton = document.getElementById("calculateTotal");
var grandTotalField = document.getElementById("grandTotal");
var subTotalField = document.getElementById("subTotal");
var taxRate = 1.078;
var invalidSubTotalError = "Please enter a valid amount -  up to 2 decimal places.";

function displayTotal() {
	"use strict";
	var subTotalValue = subTotalField.value;
		if (!subTotalValue || !validNumField(subTotalValue)){
			subTotalField.style.backgroundColor = "#F7F4B0";
			subTotalField.style.border = "2px solid red";
			subTotalField.focus();
			alert (invalidSubTotalError);
		} else {
			subTotalField.style.backgroundColor = "#FFFFFF";
			subTotalField.style.border = "2px solid #8A8A8A";
			grandTotalField.value = "$" + calcTax(subTotalValue);
		}
}

function calcTax(subtotal) {
	"use strict";
	var grandTotal = (subtotal * taxRate).toFixed(2);
	return grandTotal;
}

function validNumField(formField) {
	"use strict";
	var filter = /^[0-9]+(\.[0-9]{1,2})?$/;
	//var filter2 = /^[0-9]+$/i;

	if (filter.test(formField)) {
		return true;
	} else {
		return false;
	}
}
/////////////////////////////////////////////////// page load and event listeners ///////////////////////////////////////////////////

// run setup functions on page load
if (window.addEventListener) {
	window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
	window.attachaEvent("onload", setUpPage);
}

//// call these functions on page load
function setUpPage() {
	"use strict";
	createEventListeners();
}

// create event listeners
function createEventListeners() {
	"use strict";
	if (calcButton.addEventListener) {
		calcButton.addEventListener("click", displayTotal, false);
	} else if (calcButton.attachEvent) {
		calcButton.attachEvent("click", displayTotal);
	}
}
