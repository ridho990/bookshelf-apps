"use strict";
const keyUsername = "username";
const searchInput = document.querySelector("#search");

const formInput = document.querySelector(".form-book");
const form = document.querySelector(".wrapper-form-book");
const overlay = document.querySelector(".overlay");
const btnCloseForm = document.querySelector(".close-form-book");
const btnsOpenForm = document.querySelector("#button-add-book");

const btnEdit = document.querySelector(".button-edit");
const formEdit = document.querySelector(".wrapper-edit-book");
const btnCloseEdit = document.querySelector(".close-edit-book");
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

function funOnClick(target, funcModal, modal) {
	target.addEventListener("click", function () {
		funcModal(modal);
	});
}

// Form Input Buku
funOnClick(btnsOpenForm, openModal, form);
funOnClick(btnCloseForm, closeModal, form);
funOnClick(btnCloseEdit, closeModal, formEdit);

// username
funOnClick(btnsOpenFormUsername, openModal, formUsername);
funOnClick(btnCloseFormUsername, closeModal, formUsername);

// Dialogue
funOnClick(noButton, closeModal, dialogueRemove);
funOnClick(btnCloseDialogue, closeModal, dialogueRemove);

overlay.addEventListener("click", function () {
	closeModal(form);
	closeModal(formUsername);
	closeModal(dialogueRemove);
	closeModal(formEdit);
});

function isEscapeAndHidden(e, modal) {
	return e.key === "Escape" && !modal.classList.contains("hidden");
}

document.addEventListener("keydown", function (e) {
	if (isEscapeAndHidden(e, form)) {
		closeModal(form);
	} else if (isEscapeAndHidden(e, formUsername)) {
		closeModal(formUsername);
	} else if (isEscapeAndHidden(e, dialogueRemove)) {
		closeModal(dialogueRemove);
	} else if (isEscapeAndHidden(e, formEdit)) {
		closeModal(formEdit);
	}
});

// Count Character Title dan Author
function countCharacter(idInputForm, idSpanRestValue, idWrapperRestValue) {
	document.getElementById(idInputForm).addEventListener("input", function () {
		const totalCharacterTitle =
			document.getElementById(idInputForm).value.length;
		const restCharacter = 30 - totalCharacterTitle;
		document.getElementById(idSpanRestValue).innerText = restCharacter;
		if (restCharacter > 6) {
			document.getElementById(idWrapperRestValue).style.color = "#023047";
		} else {
			document.getElementById(idWrapperRestValue).style.color = "red";
		}
	});
}

function visibilityRestCharacter(
	idInputForm,
	idWrapperRestValue,
	typeEvent,
	attrValue
) {
	document.getElementById(idInputForm).addEventListener(typeEvent, function () {
		document.getElementById(idWrapperRestValue).style.visibility = attrValue;
	});
}

// visibilityRestCharacter("id tag input terjadinya event", "id span yang membungkus sisa karakter (yang diubah)", "tipe event", "atribut yang diterapkan pada wrapper")
visibilityRestCharacter("title", "count-character-title", "focus", "visible");
visibilityRestCharacter("author", "count-character-author", "focus", "visible");
visibilityRestCharacter("title", "count-character-title", "blur", "hidden");
visibilityRestCharacter("author", "count-character-author", "blur", "hidden");

// countCharacter("id tag input (yang sedang diketik)", "ini tag span yang menyimpan nilai update sisa karakter", "id span yang membungkus sisa karakter (yang diubah)")
countCharacter("title", "span-count-charachter-title", "count-character-title");
countCharacter(
	"author",
	"span-count-charachter-author",
	"count-character-author"
);

// Edit Form
visibilityRestCharacter(
	"title-edit",
	"count-character-title-edit",
	"focus",
	"visible"
);
visibilityRestCharacter(
	"author-edit",
	"count-character-author-edit",
	"focus",
	"visible"
);
visibilityRestCharacter(
	"title-edit",
	"count-character-title-edit",
	"blur",
	"hidden"
);
visibilityRestCharacter(
	"author-edit",
	"count-character-author-edit",
	"blur",
	"hidden"
);

countCharacter(
	"title-edit",
	"span-count-charachter-title-edit",
	"count-character-title-edit"
);
countCharacter(
	"author-edit",
	"span-count-charachter-author-edit",
	"count-character-author-edit"
);

// username
visibilityRestCharacter(
	"username",
	"count-character-username",
	"focus",
	"visible"
);

visibilityRestCharacter(
	"username",
	"count-character-username",
	"blur",
	"hidden"
);

countCharacter(
	"username",
	"span-count-character-username",
	"count-character-username"
);

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

// Bagian Search
searchInput.addEventListener("input", (e) => {
	const containerBuku = document.querySelectorAll(".card-book");
	const judulBuku = document.querySelectorAll(".card-title");
	const penulis = document.querySelectorAll(".card-author");
	const value = e.target.value.toLowerCase();

	for (let i = 0; i < containerBuku.length; i++) {
		let isVisible =
			judulBuku[i].innerText.toLowerCase().includes(value) ||
			penulis[i].innerText.toLowerCase().includes(value);
		containerBuku[i].classList.toggle("hidden", !isVisible);
	}
});
