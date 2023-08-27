const books = [];
const RENDER_EVENT = "render-book";
const STORAGE_KEY = "BOOKSHELF_APPS";

function totalBook() {
	let bookTotal = books.filter((obj) => obj.isCompleted === false);
	document.getElementById("books-total").innerText = bookTotal.length;
}

document.addEventListener("DOMContentLoaded", function () {
	const submitFormBook = document.getElementById("form-book");
	submitFormBook.addEventListener("submit", function (event) {
		event.preventDefault();
		addBook();
		closeModal(form);
	});

	if (isStorageExist()) {
		loadDataFromStorage();
	}

	totalBook();
});

function addBook() {
	const title = document.getElementById("title").value;
	const author = document.getElementById("author").value;
	const year = document.getElementById("date").value;

	const generatedID = generateId();
	const bookObject = generateBookObject(
		generatedID,
		title,
		author,
		year,
		false
	);
	books.push(bookObject);
	document.dispatchEvent(new Event(RENDER_EVENT));
	saveData();
}

function generateId() {
	return +new Date();
}

function generateBookObject(id, title, author, year, isCompleted) {
	return {
		id,
		title,
		author,
		year,
		isCompleted,
	};
}

document.addEventListener(RENDER_EVENT, function () {
	const uncompletedBookList = document.getElementById("books");
	uncompletedBookList.innerHTML = "";
	const completedBookList = document.getElementById("books-completed");
	completedBookList.innerHTML = "";

	for (const bookItem of books) {
		const bookElement = makeBook(bookItem);
		if (!bookItem.isCompleted) {
			uncompletedBookList.append(bookElement);
		} else {
			completedBookList.append(bookElement);
		}
	}

	totalBook();
});

function makeBook(bookObject) {
	const imageCard = document.createElement("img");
	let randomImg = Math.floor(Math.random() * 8 + 1);
	imageCard.src = `assets/images/book-img/book-${randomImg}.jpg`;
	imageCard.alt = `book-${randomImg}.jpg`;

	// Text Card
	const textTitle = document.createElement("h4");
	textTitle.innerText = bookObject.title;

	const textAuthor = document.createElement("p");
	textAuthor.innerText = bookObject.author;

	const textTimestamp = document.createElement("p");
	textTimestamp.innerText = bookObject.year;

	const textContainer = document.createElement("div");
	textContainer.classList.add("text-card");
	textContainer.append(textTitle, textAuthor, textTimestamp);

	// button wrapper
	const buttonWrapper = document.createElement("div");
	console.log(buttonWrapper);
	buttonWrapper.classList.add("button-card", "flex-col");

	// Innner card (text card + button wrap)
	const innerCard = document.createElement("div");
	innerCard.classList.add("inner-card", "flex-row");
	innerCard.append(textContainer, buttonWrapper);
	console.log(innerCard);

	// card utama
	const container = document.createElement("div");
	container.classList.add("card-book", "flex-row");
	container.append(imageCard, innerCard);
	container.setAttribute("id", `book-${bookObject.id}`);

	if (bookObject.isCompleted) {
		const undoButton = document.createElement("button");
		undoButton.classList.add("button-undo");

		undoButton.addEventListener("click", function () {
			undoBookFromCompleted(bookObject.id);
		});

		const trashButton = document.createElement("button");
		trashButton.classList.add("button-trash");

		trashButton.addEventListener("click", function () {
			checkAndRemove(bookObject); // menggunakan argumen untuk mengantarkan objek yang akan di hapus, kalau tidak akan eror (tidak berfungsi)
		});

		buttonWrapper.append(undoButton, trashButton);
	} else {
		const checkButton = document.createElement("button");
		checkButton.classList.add("button-check");

		checkButton.addEventListener("click", function () {
			addBookToCompleted(bookObject.id);
		});

		const trashButton = document.createElement("button");
		trashButton.classList.add("button-trash");

		trashButton.addEventListener("click", function () {
			checkAndRemove(bookObject);
		});

		buttonWrapper.append(checkButton, trashButton);
	}

	return container;
}

function addBookToCompleted(bookId) {
	const bookTarget = findBook(bookId);

	if (bookTarget == null) return;

	bookTarget.isCompleted = true;
	document.dispatchEvent(new Event(RENDER_EVENT));
	saveData();
}

function findBook(bookId) {
	for (const bookItem of books) {
		if (bookItem.id === bookId) {
			return bookItem;
		}
	}
	return null;
}

function removeBookFromCompleted(bookId) {
	const bookTarget = findBookIndex(bookId);

	if (bookTarget === -1) return;

	books.splice(bookTarget, 1);
	document.dispatchEvent(new Event(RENDER_EVENT));
	saveData();
}

function undoBookFromCompleted(bookId) {
	const bookTarget = findBook(bookId);

	if (bookTarget === -1) return;

	bookTarget.isCompleted = false;
	document.dispatchEvent(new Event(RENDER_EVENT));
	saveData();
}

function findBookIndex(bookId) {
	for (const index in books) {
		if (books[index].id === bookId) {
			return index;
		}
	}

	return -1;
}

function saveData() {
	if (isStorageExist()) {
		const parsed = JSON.stringify(books);
		localStorage.setItem(STORAGE_KEY, parsed);
	}
}

function isStorageExist() /* boolean */ {
	if (typeof Storage === undefined) {
		alert("Browser kamu tidak mendukung local storage");
		return false;
	}
	return true;
}

function checkAndRemove(bookObject) {
	openModal(dialogueRemove);
	document.getElementById("yes-button").addEventListener("click", function () {
		removeBookFromCompleted(bookObject.id);
		closeModal(dialogueRemove);
	});
}

function loadDataFromStorage() {
	const serializedData = localStorage.getItem(STORAGE_KEY);
	let data = JSON.parse(serializedData);

	if (data !== null) {
		for (const book of data) {
			books.push(book);
		}
	}
	document.dispatchEvent(new Event(RENDER_EVENT)); // setelah di load memicu event untuk melakuka render card todo
}
