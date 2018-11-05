// base array which will be randomized for the selector element. This could be a local variable but is easier to access at the top of the script
var baseArray = ["Link", "Mario", "Samus", "Solid Snake", "Mega Man", "Trevor Philips", "Kratos", "Master Chief", "John Marston", "Arthur Morgan"];
	
//the heroRankArray is eventually filled with the values from the base array (on button click)
//but is empty to show that the values are actually added TO it instead of just referenced FROM it
var heroRankArray = []; 
						
// the selector element
var heroPicker = document.getElementById("heroPicker");
var errMsg = "Please make a selection";

function refreshList() {
	"use strict";
	// refreshing the ordered list:
	// to recreate the new list order, the old list has to be removed and the new list is recreated based on the values
	// currently contained in the array. This function has to be called every time a hero is added or removed from the list.
	
	// form elements
	var rankedList = document.getElementById("rankedListOfHeroes"); 		// Ordered List where hero names will appear
	var heroSlot = rankedList.getElementsByTagName("li");					// LI elements within the ordered list
	var removalButtonList = document.getElementById("removalButtons");		// Ordered list where the removal buttons will appear when hero is added
	var removalButton = removalButtonList.getElementsByTagName("li"); 		// LI elements within the list (of buttons)
	
	// CLEAR THE LIST FIRST:
	// iterate through each existing LI element of both ordered lists and remove them:
	for (var j = heroSlot.length - 1; j >= 0; j--) {
		rankedList.removeChild(heroSlot[j]);
		removalButtonList.removeChild(removalButton[j]);
	}
	
	// RECREATE THE LIST SECOND:
	// recreate a LI element for each hero (and their corresponding button)
	for (var i = 0; i < heroRankArray.length; i++) {
		// set the content to be displayed when a hero is selected. This will be displayed as 
		// the hero's name, as stored in the array
		var chosenHero = heroRankArray[i]; // this wasn't 100% necessary but is later used in string concatenation so it's a tad easier
		
		// assigning a unique removal button ID
		var heroButtonID = "remHero" + i;

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
      	} else if (lastFirstButton.attachEvent)  {
        	removalButton.attachEvent("onclick", removeHeroFromList);
		}
	}
	arrayDisplay();
}

// ADD A HERO TO THE LIST/ARRAY
function addHeroToList() {
	"use strict"
	// the value of the currently selected option
	// optionally, eliminate the heroPicker variable and just declare: var newHero = document.getElementById("heroPicker").value;
	var newHero = heroPicker.value;
	// add selection option to heroRankArray
	heroRankArray.push(newHero);
	// call the refreshList function
	refreshList();
}

// REMOVE A HERO TO THE LIST/ARRAY
function removeHeroFromList(evt) {
	if (evt === undefined) { // get caller element in IE8
		evt = window.event;
   }
   var callerElement = evt.target || evt.srcElement;
   //var listItems = document.getElementsByTagName("li");
   var parentItem = callerElement.parentNode;
   for (var i = 0; i < heroRankArray.length; i++) {
      if (parentItem.innerHTML.search(heroRankArray[i]) !== -1) {
         var itemToMove = heroRankArray.splice(i, 1);
      }
   }
   refreshList();
}
	
// DISPLAY THE CURRENT ARRAY VALUES
function arrayDisplay() {
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
	//removeSelectDefault(); no validation on this form, so this was the quickest fix. It also is an immediate way to tell if my array was randomized on page load
}

//////////////////////////////////////////////// PAGE SETUP FUNCTIONS ////////////////////////////////////////////////

// remove default value from motherboard size list (make the list appear empty, requiring a selection)
function removeSelectDefault() {
	"use strict";
	heroPicker.selectedIndex = -1;
}

// create event listeners for the add button
function createEventListener() {
	"use strict";
// button element to add heroes
	var addButton = document.getElementById("heroAdd");
// event listener for the add button
   if (addButton.addEventListener) {
     addButton.addEventListener("click", addHeroToList, false);
   } else if (addButton.attachEvent)  {
	   addButton.attachEvent("onclick", addHeroToList);
   }
}
	
// randomize the array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// populate the selector element with options
function createSelectorOptions() {
	// randomize the original array of names
	shuffle(baseArray);
	// for each name in the array, create a selector option for the drop-down selector
	for (var i = 0; i < baseArray.length; i++) {
		var newOption = document.createElement("option");
		newOption.innerHTML = baseArray[i];
		heroPicker.appendChild(newOption);
	}
}
