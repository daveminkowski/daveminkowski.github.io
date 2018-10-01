// create an array that holds value for each of the object properties I want to display
	var propertyArray = 
			[navigator.appName, navigator.appVersion, navigator.onLine, navigator.platform,
			 navigator.userAgent, screen.width, screen.height, screen.pixelDepth];
	
	function getBrowserProperties() {
		"use strict"; 
		// for every item in the array, enter a td text value (in the 3rd column) to the td id# that corresponds to an element from the array
		for (var i = 0; i < propertyArray.length; i++) {
			document.getElementById(i).innerHTML = propertyArray[i];
		// this bit of loop just changes the color of every other table row so I dont have to type it in each row individually. loops for every value
		// in the property array.
		// starting with the first tr (row 0), check if the tr number divided by 2 leaves a remainder (checking for even values, including 0)
			var row = document.getElementsByTagName("tr")[i];
			if (i % 2 !== 0) {
		// then change every odd table row to gray.
				row.style.backgroundColor = "#ADA9A9";
			}
		}
	}
		// execute function on page load
		if (window.addEventListener) {
			window.addEventListener("load", getBrowserProperties, false);
		} else if (window.attachEvent) {
			window.attachEvent("onload", getBrowserProperties);
		}
	
	