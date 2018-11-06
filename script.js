// Creating a list of colors
var colors = generateRandomColors(9);

// Defining the generateRandomColors()function that'll generate a 
// list of random color
function generateRandomColors(num) {
	var arr = [];
	for (var i = 0; i < num; i++) {
		arr.push(randomColor());
	}
	return arr;
}
// Defining the randomColor() function that'll generate a random color
function randomColor() {
	var r = Math.floor(Math.random() * 255 + 1);
	var g = Math.floor(Math.random() * 255 + 1);
	var b = Math.floor(Math.random() * 255 + 1);
	return "rgb("+ r + ", " + g + ", " + b + ")";
}



// When the game starts/restarts a random color out of all colors is selected 
// as winnning color and changes the h1
// Note: substring() is a string method used to delete specified number of characters 
// from the string from the the start.
var pickedColor = colors[pickColor()];
var modifiedPickedColor = pickedColor.substring(3);
var rgbDisplay = document.querySelector("#rgbDisplay");
rgbDisplay.innerHTML = modifiedPickedColor;

// Defining the pickedColor() function that selects a winning color out of colors list
function pickColor() {
	return Math.floor(Math.random()* colors.length);
}



// Selecting All 6 Squares with the class "square"
var squares = document.querySelectorAll(".squares");
// Applying the colors in the colors list to each Square and adding Event Listeners to Squares
// Note: backgroundColor is better than using just background
for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = colors[i];
		squares[i].style.border = "1px solid black";

		squares[i].addEventListener("click", function() {
		var clickedColor = this.style.backgroundColor;
		if (clickedColor === pickedColor) {
			winner();
		} else {
			var index = colors.indexOf(clickedColor);
			tryAgain(index);
		}
	});
};

// Functions for Winner and Try Again
function winner() {
	document.querySelector("#messageDisplay").textContent = "Correct!";
	for (var i = 0; i < colors.length; i++) {
		squares[i].style.backgroundColor = pickedColor;
	}
	document.querySelector("h1").style.backgroundColor = pickedColor;
	newPlay.textContent = "Play Again?";
}

function tryAgain(index) {
	document.querySelector("#messageDisplay").textContent = "Try Again!";
	squares[index].style.backgroundColor = "#1d1338";
}



// Making the New Colors button work
var newPlay = document.querySelector("#newPlay");
newPlay.addEventListener("click", function() {
	if (newPlay.textContent === "Play Again?") {
		newPlay.textContent = "New Colors";
	}
	if (hardButton.classList.contains("selectedOption") === true){
		reset(9);
	} else if (mediumButton.classList.contains("selectedOption") === true){
		reset(6);
	} else {
		reset(3);
	}
});

// Defining the reset() function
function reset(num) {
	colors = generateRandomColors(num);
	for (var i = 0; i < squares.length; i++) {
		if (colors[i]){
			squares[i].style.backgroundColor = colors[i];
			squares[i].style.border = "1px solid black";
		} else {
			squares[i].style.backgroundColor = "#1d1338";
			squares[i].style.border = "none";
		}
	}
	document.querySelector("h1").style.backgroundColor = "#f13326";

	pickedColor = colors[pickColor()];
	modifiedPickedColor = pickedColor.substring(3);
	rgbDisplay = document.querySelector("#rgbDisplay");
	rgbDisplay.innerHTML = modifiedPickedColor;
	document.querySelector("#messageDisplay").textContent = "Pick a color!";
	newPlay.textContent = "New Colors";
}



// Choosing Easy or Hard mode and adding Event Listeners 
var easyButton = document.querySelector("#easyButton");
var hardButton = document.querySelector("#hardButton");
hardButton.classList.add("selectedOption");

easyButton.addEventListener("click", function() {
	easyButton.classList.add("selectedOption");
	mediumButton.classList.remove("selectedOption");
	hardButton.classList.remove("selectedOption");
	reset(3);
});
mediumButton.addEventListener("click", function() {
	mediumButton.classList.add("selectedOption");
	easyButton.classList.remove("selectedOption");
	hardButton.classList.remove("selectedOption");
	reset(6);
});
hardButton.addEventListener("click", function() {
	hardButton.classList.add("selectedOption");
	mediumButton.classList.remove("selectedOption");
	easyButton.classList.remove("selectedOption");
	reset(9);
});



