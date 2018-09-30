	var nameBox = document.getElementById("name");							// name text field
	var emailBox = document.getElementById("email");						// email text field
	var messageBox = document.getElementById("message");					// message text field
	var errorBox = document.getElementById("errorDisplay");					// error display paragraph
	var submitButton = document.getElementById("contactbutton");			// submit button on form
	
	var errMsg = "Please complete all fields";		// error message to display when an input is missing
	
	function redirect() {
		if (nameBox.value && emailBox.value && messageBox.value){
		window.open("msgconfirm.html", "_self");
		return false;
		} else {
			return false;
		}
	}
		
	function verifyInput() {
		validateName();
		validateEmail();
		validateMessage();
		if (nameBox.value && emailBox.value && messageBox.value) {
		} else {
			errorBox.innerHTML = errMsg;
			alert(errMsg);
		}
	}
	
	function validateName() {
		if (!nameBox.value) {
			nameBox.style.backgroundColor = "#F7F4B0";
			errorBox.innerHTML = errMsg;
			} else {
				removeWarningMsg();
				nameBox.style.backgroundColor = "";
			}
	}

	function validateEmail() {
		if (!emailBox.value) {
			emailBox.style.backgroundColor = "#F7F4B0";
			errorBox.innerHTML = errMsg;
		} else {
			removeWarningMsg();
			emailBox.style.backgroundColor = "";
			}
	}

	function validateMessage() {
		if (!messageBox.value) {
			messageBox.style.backgroundColor = "#F7F4B0";
			errorBox.innerHTML = errMsg;
		} else {
			removeWarningMsg();
			messageBox.style.backgroundColor = "";
			}
	}
	
	function removeWarningMsg() {
		if (nameBox.value && emailBox.value && messageBox.value) {
			errorBox.innerHTML="<em>Fields marked with * are required.</em>";
		}
	}

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

	if (window.addEventListener) {
		window.addEventListener("load", createEventListeners, false);
	} else if (window.attachEvent) {
		window.attachEvent("onload", createEventListeners);
	}
	
    if (submitButton.addEventListener) {
		submitButton.addEventListener("click", verifyInput, false); 
    } else if (submitButton.attachEvent)  {
		submitButton.attachEvent("onclick", verifyInput, false);
    }