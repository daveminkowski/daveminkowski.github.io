var packersImage = "images/project3images/packers.png";
var bearsImage = "images/project3images/bears.png";
var vikingsImage = "images/project3images/vikings.png";
var lionsImage = "images/project3images/lions.png";
var logoToDisplay = document.getElementById("logodisplay");

function showLogo() {
	var buttonClicked = (this.id);
	switch (buttonClicked) {
		case "packers":
			logoToDisplay.src = packersImage;
			logoToDisplay.style.display = "block";
			document.getElementById("teamurldisplay").innerHTML = '<a href="https://www.packers.com/" target="blank">Official Website of the Green Bay Packers</a>';
			break;
		case "bears":
			logoToDisplay.src = bearsImage;
			logoToDisplay.style.display = "block";
			document.getElementById("teamurldisplay").innerHTML = '<a href="https://www.chicagobears.com/" target="blank">Official Website of the Chicago Bears</a>';
			break;
		case "vikings":
			logoToDisplay.src = vikingsImage;
			logoToDisplay.style.display = "block";
			document.getElementById("teamurldisplay").innerHTML = '<a href="https://www.vikings.com/" target="blank">Official Website of the Minnesota Vikings</a>';
			break;
		case "lions":
			logoToDisplay.src = lionsImage;
			logoToDisplay.style.display = "block";
			document.getElementById("teamurldisplay").innerHTML = '<a href="https://www.detroitlions.com/" target="blank">Official Website of the Detroit Lions</a>';
			break;
	}
}

var packersButton = document.getElementById("packers");
if (packersButton.addEventListener) {
	packersButton.addEventListener("click", showLogo, false);
} else if (packersButton.attachEvent) {
	packersButton.attachEvent("onclick", showLogo);
}
var bearsButton = document.getElementById("bears");
if (bearsButton.addEventListener) {
	bearsButton.addEventListener("click", showLogo, false);
} else if (bearsButton.attachEvent) {
	bearsButton.attachEvent("onclick", showLogo);
}
var vikingsbutton = document.getElementById("vikings");
if (vikingsbutton.addEventListener) {
	vikingsbutton.addEventListener("click", showLogo, false);
} else if (vikingsbutton.attachEvent) {
	vikingsbutton.attachEvent("onclick", showLogo);
}
var lionsbutton = document.getElementById("lions");
if (lionsbutton.addEventListener) {
	lionsbutton.addEventListener("click", showLogo, false);
} else if (lionsbutton.attachEvent) {
	lionsbutton.attachEvent("onclick", showLogo);
}
