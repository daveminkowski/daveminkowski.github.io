// base array which will be randomized for the selector element. This could be a local variable but is easier to access at the top of the script
var baseArray = ["Link", "Mario", "Samus", "Solid Snake", "Mega Man", "Trevor Philips", "Kratos", "Master Chief", "John Marston", "Arthur Morgan"];

//the heroRankArray is eventually filled with the values from the base array (on button click)
//but is empty to show that the values are actually added TO it instead of just referenced FROM it
var heroRankArray = [];

// the selector element
var heroPicker = document.getElementById("heroPicker");
// button element to add heroes
var addButton = document.getElementById("heroAdd");

// error message when pressing add while no option is selected
// var errMsg = "Please make a selection";

function refreshList() {
	"use strict";
	// refreshing the ordered list:
	// to recreate the new list order, the old list has to be removed and the new list is recreated based on the values
	// currently contained in the array. This function has to be called every time a hero is added or removed from the list.

	// form elements
	var rankedList = document.getElementById("rankedListOfHeroes"); // Ordered List where hero names will appear
	var heroSlot = rankedList.getElementsByTagName("li"); // LI elements within the ordered list
	var removalButtonList = document.getElementById("removalButtons"); // Ordered list where the removal buttons will appear when hero is added
	var removalButtonLi = removalButtonList.getElementsByTagName("li"); // LI elements within the list (of buttons)

	// CLEAR THE LIST FIRST:
	// iterate through each existing LI element of both ordered lists and remove them:
	for (var j = heroSlot.length - 1; j >= 0; j--) {
		rankedList.removeChild(heroSlot[j]);
		removalButtonList.removeChild(removalButtonLi[j]);
	}

	// RECREATE THE LIST SECOND:
	// recreate a LI element for each hero (and their corresponding button)
	for (var i = 0; i < heroRankArray.length; i++) {
		// set the content to be displayed when a hero is selected. This will be displayed as 
		// the hero's name, as stored in the array
		var chosenHero = heroRankArray[i]; // this wasn't 100% necessary but is later used in string concatenation so it's a tad easier

		// assigning a unique removal button ID
		// first remove whitespaces (if any) in each index
		var trimmedString = chosenHero.split(' ').join('');
		// concatenate that to the remHero button ID
		var heroButtonID = "remHero#" + trimmedString;
		// testing it works:
		//console.log (heroButtonID);

		// the content entered into the button to remove the hero that was just added
		var chosenHeroButton = "<button class='project8button' id=" + heroButtonID + ">Remove " + chosenHero + "</button>";

		// then create a new LI element for each hero added to the array
		var newHeroSlot = document.createElement("li");

		// create an LI element to place the removal button
		var newRemovalButton = document.createElement("li");

		// change the innerHTML of that LI elements to what we stored in the chosenHero/chosenHeroButton variables
		newHeroSlot.innerHTML = chosenHero;
		newRemovalButton.innerHTML = chosenHeroButton;

		// then add the LI elements (and the data to display in those elements) to their parent OL elements
		rankedList.appendChild(newHeroSlot);
		removalButtonList.appendChild(newRemovalButton);

		// to identify the button as a form element
		var removalButton = document.getElementById(heroButtonID);

		// finally, add an event listener to the created button
		if (removalButton.addEventListener) {
			removalButton.addEventListener("click", removeHeroFromList, false);
		} else if (removalButton.attachEvent) {
			removalButton.attachEvent("onclick", removeHeroFromList);
		}
	}
	arrayDisplay();
	disableAddButton();
}

//////////////////////////////////////////////// SELECTOR FUNCTIONS ////////////////////////////////////////////////

// DISABLE SELECTED INDEX
// This function disables choices from the selector that have already been made (no duplicates)
function disableIndex() {
	"use strict";
	// user's currently selected index
	//var selectedHero = heroPicker.selectedIndex;
	var heroName = heroPicker.value;
	var trimmedHeroName = heroName.split(' ').join('');
	// testing it works:
	//console.log("Disabling this character's selector : " + trimmedHeroName);
	// string to reference names of option elements
	var optionString = "option" + trimmedHeroName;
	// variable to reference the element object each hero is stored under (when created by the page load function)
	var optionToRemove = document.getElementById(optionString);
	// disabled the chosen option
	optionToRemove.disabled = true;

	// this function could be built into the disableIndex function but I wanted to break down each part to work on it separately
	moveSelector();

}

// DISABLE/ENABLE ADD BUTTON
// disable the add button when the number of options is the same as the number of choices in the array (10)
function disableAddButton() {
	"use strict";
	// option elements as an object
	var selectorElement = document.getElementsByTagName("option");
	
	// number of options in the selector
	var numOfOptions = document.getElementsByTagName("option");
	// if number of created option elements equals the number of array elements (all heroes have been chosen)
	if (numOfOptions.length === heroRankArray.length) {
		// disable the add button
		addButton.disabled = true;
		// empty the selector
		heroPicker.selectedIndex = -1;
		// ensure ALL options are disabled
		for (var i = 0; i < heroRankArray.length; i++){
			selectorElement[i].disabled = true;
		}
	} else {
		// if the number of chooseable options is < number of array elements (10), enable the add button
		addButton.disabled = false;
		// move the selector to an available option
		for (var j = 0; j < heroRankArray.length; j++){
			if (!selectorElement[j].disabled) {
				heroPicker.selectedIndex = j;
			}
			
		}
	}
}

// MOVE THE SELECTOR
//once an option has been disabled, the selector needs to move to a non-disabled option to avoid duplicate entries
function moveSelector() {
	"use strict";
	// number of options in the selector
	var numOfOptions = document.getElementsByTagName("option");
	// for each option element on the page, check if the element has been disabled. If not, change the selected index to one of those indices
	for (var i = 0; i < numOfOptions.length; i++) {
		// if the currently selected option is disabled, do nothing and continue to iterate through the loop
		if (isDisabled()) {
			// if currently selected option is NOT disabled, set the selector to the first available hero in the list
		} else {
			heroPicker.selectedIndex = i;
		}
	}
}

// boolean switch to route the logic in the moveSelector() function
function isDisabled() {
	"use strict";
	var heroName = heroPicker.value;
	var trimmedHeroName = heroName.split(' ').join('');
	// string to reference names of option elements
	var optionString = "option" + trimmedHeroName;
	// variable to reference the element object each hero is stored under (when created by the page load function)
	var optionToRemove = document.getElementById(optionString);
	if (optionToRemove.disabled) {
		return false;
	} else {
		return true;
	}
}


//////////////////////////////////////////////// ADD BUTTON FUNCTIONS ////////////////////////////////////////////////

// ADD A HERO TO THE ORDERED LIST/ARRAY
function addHeroToList() {
	"use strict";
	// the value of the currently selected option
	// optionally, eliminate the heroPicker variable and just declare: var newHero = document.getElementById("heroPicker").value;
	var newHero = heroPicker.value;
	// add selection option to heroRankArray
	heroRankArray.push(newHero);
	// call the refreshList function
	refreshList();
	disableIndex();
}

// DISPLAY THE CURRENT ARRAY VALUES
function arrayDisplay() {
	"use strict";
	// the paragraph element where the array values will be displayed
	var arrayValues = document.getElementById("arrayValues");

	// a variable to append the array strings to each other for display
	var textToDisplay = "";

	// for every element in the heroRankArray, append the array values to the display string
	for (var i = 0; i < heroRankArray.length; i++) {
		textToDisplay += "[" + i + "] = " + heroRankArray[i] + "<br>";
	}
	arrayValues.innerHTML = textToDisplay;
}

//////////////////////////////////////////////// LIST BUTTON FUNCTIONS ////////////////////////////////////////////////

// REMOVE A HERO TO THE ORDERED LIST/ARRAY, MAKE IT AVAILABLE TO CHOOSE AGAIN
function removeHeroFromList(evt) {
	"use strict";
	if (evt === undefined) { // get caller element in IE8
		evt = window.event;
	}
	var callerElement = evt.target || evt.srcElement;
	// get the button ID from the event click, pass it to the enableIndex Function
	enableIndex(evt.srcElement.id);
	//var listItems = document.getElementsByTagName("li");
	var parentItem = callerElement.parentNode;
	for (var i = 0; i < heroRankArray.length; i++) {
		
		// this is searching parent elements for an array string that matches the name of the hero, then remove it from the array
		if (parentItem.innerHTML.search(heroRankArray[i]) !== -1) {
			heroRankArray.splice(i, 1);
			
		}
	}
	refreshList();
}

// this function is used to find the button name that was clicked, which can then be used to re-enable the selector element of that hero
function enableIndex(buttonName) {
	"use strict";
	// I thought this was pretty clever if I do say so myself. The name of the button is passed into the function, which then splits 
	// the button name into an array of 2 strings at the # symbol. The value I want is everything after that (the name of the hero)
	var heroName = buttonName.split('#')[1];
	// debugging
	//console.log("Function passed this button name: " + buttonName);
	//console.log("Shortened the button name into: " + heroName);
	var indexName = "option" + heroName;
	var indexToEnable = document.getElementById(indexName);
	indexToEnable.disabled = false;

}

//////////////////////////////////////////////// RUN ON PAGE LOAD ////////////////////////////////////////////////

if (window.addEventListener) {
	window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
	window.attachEvent("onload", setUpPage);
}

// call these functions on page load
function setUpPage() {
	"use strict";
	createEventListener();
	createSelectorOptions();
}

//////////////////////////////////////////////// PAGE SETUP FUNCTIONS ////////////////////////////////////////////////

// create event listeners for the add button
function createEventListener() {
	"use strict";
	// event listener for the add button
	if (addButton.addEventListener) {
		addButton.addEventListener("click", addHeroToList, false);
	} else if (addButton.attachEvent) {
		addButton.attachEvent("onclick", addHeroToList);
	}
}

// randomize the array
function shuffle(array) {
	"use strict";
	var currentIndex = array.length,
		temporaryValue, randomIndex;
	// While there are elements to shuffle
	while (0 !== currentIndex) {
		// Pick a random element
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		// swap with current element
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

// populate the selector element with options
function createSelectorOptions() {
	"use strict";
	// randomize the original array of names
	shuffle(baseArray);
	// for each name in the array, create a selector option for the drop-down selector
	for (var i = 0; i < baseArray.length; i++) {
		var newOption = document.createElement("option");
		newOption.innerHTML = baseArray[i];
		heroPicker.appendChild(newOption);
		
		// assigning a unique option ID
		// first remove whitespaces (if any) in each index
		var trimmedHeroName = baseArray[i].split(' ').join('');
		// testing it works:
		//console.log("Created this option names : " + trimmedHeroName);

		newOption.id = "option" + trimmedHeroName;
	}
}
