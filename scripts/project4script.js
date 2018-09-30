	// project 4's script is slightly different than the script used on contact.html due to formatting and such. The website.contactvalidator.js
	// file does not include commenting.

	// variables for functions
	var nameBox = document.getElementById("name");							// name text field
	var emailBox = document.getElementById("email");						// email text field
	var messageBox = document.getElementById("message");					// message text field
	var notice = document.getElementById("notification");					// notification display paragraph
	var submitButton = document.getElementById("contactbutton");			// submit button on form
	var errMsg = "Please complete all fields";								// error message to display for any alert dialogs (just 1 for now)

	// This function is called on a successful form submission. This will open the acknowledgemet.html page in the current browser window then
	// halt the form from executing any further action. Without it being done this way with the "onsubmit" tag on the form element, my redirect
	// would always come back as "page not found". I think the form is trying to post its data and cant (since I have no way to handle it) and
	// the form action has to be stopped to avoid that outcome?
	function redirect() {
		if (nameBox.value && emailBox.value && messageBox.value){
		window.open("msgconfirm.html", "_self");
		console.log("Success - All three fields filled, email in correct format."); 
		return false;
		} else {
			return false;
		}
	}
	
	// the "final check" function. Since fields load as white-colored with no indication they are required, a final check is
	// performed when the user tries to submit the form which will alert the user to the required input fields... I hope
	function verifyInput() {
		validateName();
		validateEmail();
		validateMessage();
		if (nameBox.value && emailBox.value && messageBox.value) {
			console.log("All three fields have a value. If page is not redirected, email is formatted incorrectly (handled by browser).");
		} else {
			console.log("One or more fields is empty - show alert dialog here");
			alert(errMsg);
		}
	}
	
	// check if name field has an entry, recolor background and show error message display if not. 
	function validateName() {
		if (!nameBox.value) {
			nameBox.style.backgroundColor = "#F7F4B0";
			console.log("missing name text");
			} else {
				nameBox.style.backgroundColor = "";
				console.log("successfully entered name text");
			}
	}

	// check if email field has an entry, recolor background and show error message display if not. 
	function validateEmail() {
		if (!emailBox.value) {
			emailBox.style.backgroundColor = "#F7F4B0";
			console.log("missing email text");
		} else {
			emailBox.style.backgroundColor = "";
			console.log("successfully entered email text");
			}
	}
	
	// check if message field has an entry, recolor background and show error message display if not. 
	function validateMessage() {
		if (!messageBox.value) {
			messageBox.style.backgroundColor = "#F7F4B0";
			console.log("missing message text");
		} else {
			messageBox.style.backgroundColor = "";
			console.log("successfully entered message text");
			}
	}

	// create backward compatible event listeners rather than putting them in html as onchange="validateName();" etc
	// these event listeners respond to changes in the input fields
	function createEventListeners() {
	if (nameBox.addEventListener) {
		nameBox.addEventListener("input", validateName, false);
	} else if (nameBox.attachEvent) {
		nameBox.attachEvent("onchange", validateName);
	}
	if (emailBox.addEventListener) {
		emailBox.addEventListener("input", validateEmail, false);
	} else if (emailBox.attachEvent) {
		emailBox.attachEvent("onchange", validateEmail);
	}
	if (messageBox.addEventListener) {
		messageBox.addEventListener("input", validateMessage, false);
	} else if (messageBox.attachEvent) {
		messageBox.attachEvent("onchange", validateMessage);
	}
    }

	// call the function to create event listeners for text fields on page load
	if (window.addEventListener) {
		window.addEventListener("load", createEventListeners, false);
	} else if (window.attachEvent) {
		window.attachEvent("onload", createEventListeners);
	}
	
	// add backward compatible event listener to Submit button - this will again remind the user to fill out all fields
	// if any are left empty once they submit the form
    if (submitButton.addEventListener) {
		submitButton.addEventListener("click", verifyInput, false); 
    } else if (submitButton.attachEvent)  {
		submitButton.attachEvent("onclick", verifyInput, false);
    }