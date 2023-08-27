"use strict";
const keyUsername = "username";
const searchInput = document.querySelector("#search");

const form = document.querySelector(".wrapper-form-book");
const overlay = document.querySelector(".overlay");
const btnCloseForm = document.querySelector(".close-form-book");
const btnsOpenForm = document.querySelector("#button-add-book");
// Ini untuk username
const btnsOpenFormUsername = document.querySelector("#user-name");
const formUsername = document.querySelector(".wrapper-form-username");
const btnCloseFormUsername = document.querySelector(".close-form-username");
// ini untuk remove dialogue
const btnOpenDialogue = document.querySelector(".button-trash");
const dialogueRemove = document.querySelector(".card-dialogue-remove");
const btnCloseDialogue = document.querySelector(".close-dialogue-remove");
const noButton = document.querySelector("#no-button");

const closeModal = function (modal) {
	modal.classList.add("hidden");
	overlay.classList.add("hidden");
};

const openModal = function (modal) {
	modal.classList.remove("hidden");
	overlay.classList.remove("hidden");
};

//book
btnsOpenForm.addEventListener("click", function () {
	openModal(form);
});
btnCloseForm.addEventListener("click", function () {
	closeModal(form);
});

// username
btnsOpenFormUsername.addEventListener("click", function () {
	openModal(formUsername);
});

btnCloseFormUsername.addEventListener("click", function () {
	closeModal(formUsername);
});

// Dialogue
btnOpenDialogue.addEventListener("click", function () {
	openModal(dialogueRemove);
});

noButton.addEventListener("click", function () {
	closeModal(dialogueRemove);
});

btnCloseDialogue.addEventListener("click", function () {
	closeModal(dialogueRemove);
});

overlay.addEventListener("click", function () {
	closeModal(form);
	closeModal(formUsername);
	closeModal(dialogueRemove);
});

document.addEventListener("keydown", function (e) {
	if (e.key === "Escape" && !form.classList.contains("hidden")) {
		closeModal(form);
	} else if (e.key === "Escape" && !formUsername.classList.contains("hidden")) {
		closeModal(formUsername);
	} else if (
		e.key === "Escape" &&
		!dialogueRemove.classList.contains("hidden")
	) {
		closeModal(dialogueRemove);
	}
});

// Count Character Title dan Author
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

// ini bagian untuk ganti username
document.addEventListener("DOMContentLoaded", function () {
	const submitFormUsername = document.getElementById("form-username");
	submitFormUsername.addEventListener("submit", function (event) {
		event.preventDefault();
		addUsername();
		loadDataUserFromStorage();
		closeModal(formUsername);
	});

	if (isStorageExist()) {
		if (localStorage.getItem(keyUsername) === null) {
			localStorage.setItem(keyUsername, "Your Name✏️");
		}
		loadDataUserFromStorage();
	}

	totalBook();
});

const addUsername = () => {
	const username = document.getElementById("username").value;
	document.getElementById("user-name").value = username;
	localStorage.setItem(keyUsername, username);
};

const loadDataUserFromStorage = () => {
	const username = localStorage.getItem(keyUsername);
	document.getElementById("user-name").innerText = username;
};

searchInput.addEventListener("input", (e) => {
	const containerBuku = document.querySelectorAll(".card-book");
	const judulBuku = document.querySelectorAll(".text-card h4");
	const penulis = document.querySelectorAll(".text-card > p");
	const value = e.target.value.toLowerCase();

	for (const i in containerBuku) {
		let isVisible =
			judulBuku[i].innerText.toLowerCase().includes(value) ||
			penulis[i].innerText.toLowerCase().includes(value);
		containerBuku[i].classList.toggle("hidden", !isVisible);
	}
});
