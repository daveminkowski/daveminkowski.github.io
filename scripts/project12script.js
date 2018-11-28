// I didn't have any existing code I thought appropriately showcased manipulating CSS elements so I just started from scratch. 

// uses the slideDown function of jquery to make menus visible on mouse over
function display(event) {
	"use strict";
	$(event.currentTarget).children("ul").slideDown("fast");
}
// uses the slideUp function of jquery to hide menus when mouse is removed from hover area
function hide(event) {
	"use strict";
	$(event.currentTarget).children("ul").slideUp("fast");
}

// ul.divisionMenu (the ul element with the class assignment "divisionMenu") is the element being interacted with, manipulating the li element associated with it. 
// This function will perform the display function on mouseOver and the hide function when the mouse is moved off the element
$("ul.divisionMenu li").hover(display,hide);
$("ul.conferenceMenu li").hover(display,hide);