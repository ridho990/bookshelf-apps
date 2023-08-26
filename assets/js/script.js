"use strict";

const form = document.querySelector(".wrapper-form-book");
const overlay = document.querySelector(".overlay");
const btnCloseForm = document.querySelector(".close-form-book");
const btnsOpenForm = document.querySelector("#button-add-book");
// Ini untuk username
const btnsOpenFormUsername = document.querySelector("#user-name");
const formUsername = document.querySelector(".wrapper-form-username");
const btnCloseFormUsername = document.querySelector(".close-form-username");

const closeModal = function () {
	form.classList.add("hidden");
	overlay.classList.add("hidden");
};

const openModal = function () {
	form.classList.remove("hidden");
	overlay.classList.remove("hidden");
};

btnsOpenForm.addEventListener("click", openModal);
btnCloseForm.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

const closeFormUsername = function () {
	formUsername.classList.add("hidden");
	console.log("Close");
	overlay.classList.add("hidden");
};

const openFormUsername = function () {
	formUsername.classList.remove("hidden");
	console.log("Open");
	overlay.classList.remove("hidden");
};

btnsOpenFormUsername.addEventListener("click", openFormUsername);
btnCloseFormUsername.addEventListener("click", closeFormUsername);
overlay.addEventListener("click", closeFormUsername);

document.addEventListener("keydown", function (e) {
	console.log(e.key);
	if (e.key === "Escape" && !form.classList.contains("hidden")) {
		console.log("Esc was pressed");
		closeModal();
	} else if (e.key === "Escape" && !formUsername.classList.contains("hidden")) {
		closeFormUsername();
	}
});

const countCharachterTitle = () => {
	const totalCharacterTitle = document.getElementById("title").value.length;
	const restCharacter = 30 - totalCharacterTitle;
	document.getElementById("span-count-charachter-title").innerText =
		restCharacter;
	if (restCharacter > 6) {
		document.getElementById("count-character-title").style.color = "#023047";
	} else {
		document.getElementById("count-character-title").style.color = "red";
	}
};

const countCharachterAuthor = () => {
	const totalCharacterAuthor = document.getElementById("author").value.length;
	const restCharacter = 30 - totalCharacterAuthor;
	document.getElementById("span-count-charachter-author").innerText =
		restCharacter;
	if (restCharacter > 6) {
		document.getElementById("count-character-author").style.color = "#023047";
	} else {
		document.getElementById("count-character-author").style.color = "red";
	}
};

document.getElementById("title").addEventListener("focus", function () {
	document.getElementById("count-character-title").style.visibility = "visible";
});

document.getElementById("author").addEventListener("focus", function () {
	document.getElementById("count-character-author").style.visibility =
		"visible";
});

document
	.getElementById("title")
	.addEventListener("input", countCharachterTitle);
document
	.getElementById("author")
	.addEventListener("input", countCharachterAuthor);

document.getElementById("title").addEventListener("blur", function () {
	document.getElementById("count-character-title").style.visibility = "hidden";
});

document.getElementById("author").addEventListener("blur", function () {
	document.getElementById("count-character-author").style.visibility = "hidden";
});

document.getElementById("submit").addEventListener("submit", function (e) {
	console.log(e);
	e.preventDefault();
});
