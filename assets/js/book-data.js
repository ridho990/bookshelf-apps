const books = [];
const RENDER_EVENT = "render-book";
// const SAVED_EVENT = "saved-book";
const STORAGE_KEY = "BOOKSHELF_APPS";

document.addEventListener("DOMContentLoaded", function () {
	// 1. Selesai di load
	const submitFormBook = document.getElementById("form-book");
	submitFormBook.addEventListener("submit", function (event) {
		// 2. User mengisi terus pencet submit
		event.preventDefault(); // Supaya tidak refresh
		addBook(); // 3. Maka fungsi ini terpanggil
	});

	if (isStorageExist()) {
		loadDataFromStorage();
	}
});

function addBook() {
	const title = document.getElementById("title").value;
	const author = document.getElementById("author").value;
	const year = document.getElementById("date").value;

	const generatedID = generateId(); // 4. Mendapatkan nilai id
	const bookObject = generateBookObject(
		// 6. Mendapatkan nilai objek dan assign ke variabel ini
		generatedID,
		title,
		author,
		year,
		false
	);
	books.push(bookObject); // 8. Memasukkan objek ke dalam array
	document.dispatchEvent(new Event(RENDER_EVENT)); // 9. Memicu event RENDER_EVENT berjalan
	saveData();
}

function generateId() {
	return +new Date(); //5. menghasilkan waktu dalam bentuk milidetik
}

function generateBookObject(id, title, author, year, isCompleted) {
	//7. Generate objek
	return {
		// Mengembalikan objek
		id,
		title,
		author,
		year,
		isCompleted,
	};
}

document.addEventListener(RENDER_EVENT, function () {
	// 10. karena terpicu maka fungsi ini berjalan
	// console.log(todos);

	const uncompletedBookList = document.getElementById("books");
	uncompletedBookList.innerHTML = "";
	const completedBookList = document.getElementById("books-completed");
	completedBookList.innerHTML = "";

	for (const bookItem of books) {
		// 11. Melooping semua anggota array
		const bookElement = makeBook(bookItem); // 12. Menetapkan Todo Element
		if (!bookItem.isCompleted) {
			uncompletedBookList.append(bookElement);
		} else {
			completedBookList.append(bookElement);
		}
	}
});

function makeBook(bookObject) {
	// 13 Dipanggil fungsi ini berjalan
	// Membuat kontener dan isi konten
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

	const container = document.createElement("div");
	container.classList.add("card-book", "flex-row"); // 14. Menetapkan styling pada contener
	container.append(imageCard, innerCard);
	container.setAttribute("id", `book-${bookObject.id}`);

	if (bookObject.isCompleted) {
		// 15. Mengecek objek saat ini apakah statusnya selesai (true)
		const undoButton = document.createElement("button");
		undoButton.classList.add("button-undo");

		undoButton.addEventListener("click", function () {
			// 15.a Membuat tombol undo dan eventnya
			undoBookFromCompleted(bookObject.id); // 15.b Memanggil Fungsi Undo
		});

		const trashButton = document.createElement("button"); // 16. Alur Sisa Sama
		trashButton.classList.add("button-trash");

		trashButton.addEventListener("click", function () {
			removeBookFromCompleted(bookObject.id);
		});

		buttonWrapper.append(undoButton, trashButton);
	} else {
		const checkButton = document.createElement("button");
		checkButton.classList.add("button-check");

		checkButton.addEventListener("click", function () {
			addBookToCompleted(bookObject.id);
		});

		const trashButton = document.createElement("button"); // 16. Alur Sisa Sama
		trashButton.classList.add("button-trash");

		trashButton.addEventListener("click", function () {
			removeBookFromCompleted(bookObject.id);
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
		// if (todoItem.id.includes()) {
		// 	return todoItem;
		// }
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
	// 15.c Fungsi berjalan
	const bookTarget = findBook(bookId); // 15.d mendapatkan index untuk diolah

	if (bookTarget === -1) return; // Kalau kosong lewat
	// if (bookTarget === null) return; // Kalau kosong lewat

	bookTarget.isCompleted = false; // 15.e mengubah atribut isComplet menjadi false
	document.dispatchEvent(new Event(RENDER_EVENT)); // 15.f fungsi ini kembali di jalankan
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
		// document.dispatchEvent(new Event(SAVED_EVENT));
	}
}

function isStorageExist() /* boolean */ {
	if (typeof Storage === undefined) {
		alert("Browser kamu tidak mendukung local storage");
		return false;
	}
	return true;
}

// document.addEventListener(SAVED_EVENT, function () {
// 	console.log(localStorage.getItem(STORAGE_KEY));
// });

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
