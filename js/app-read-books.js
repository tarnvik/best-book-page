"use strict";

const LOCAL_STORAGE_KEY_TBRS = "tbrs";

let readBooks2021 = document.querySelector("#read-books-2021");
let readBooks2020 = document.querySelector("#read-books-2020");
let button2020 = document.querySelector("#btn-2020");
let button2021 = document.querySelector("#btn-2021");

let tbrs = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_TBRS)) || [];

function saveList() {
  localStorage.setItem(LOCAL_STORAGE_KEY_TBRS, JSON.stringify(tbrs));
}

function hide(hide, show) {
  hide.classList.add("hide");
  show.classList.remove("hide");
}

button2020.addEventListener("click", () => {
  hide(readBooks2021, readBooks2020);
  button2020.classList.add("underline");
  button2021.classList.remove("underline");
});

button2021.addEventListener("click", () => {
  hide(readBooks2020, readBooks2021);
  button2020.classList.remove("underline");
  button2021.classList.add("underline");
});

function createItem(ElementType, innerText) {
  let item = document.createElement(ElementType);
  item.innerText = innerText;
  return item;
}

function createListItem(book) {
  let listItem = document.createElement("li");
  listItem.classList.add("grid", "book-list");
  let titleLink = createItem("a", book.title);
  titleLink.classList.add("book-title");
  titleLink.setAttribute("href", "reviews.html#" + book.id);
  let author = createItem("p", book.author);
  author.classList.add("author");
  let pages = createItem("p", book.pages);
  let score = createItem("p", book.score + "/5");
  let addToTbr = createItem("button", "+");
  addToTbr.classList.add("button-text");
  addToTbr.addEventListener("click", () => {
    let bookAlreadyAdded = false;
    tbrs.forEach((item) => {
      if (item.id === book.id) {
        bookAlreadyAdded = true;
        addToTbr.innerText = "Added";
      }
    });
    if (!bookAlreadyAdded) {
      tbrs.push(book);
      addToTbr.innerText = "Added";
      saveList();
    }
  });
  listItem.append(titleLink, author, pages, score, addToTbr);
  return listItem;
}

fetch("./content/books.json", {})
  .then((response) => {
    console.log(response);
    return response.json();
  })
  .then((data) => {
    console.log(data);
    data.forEach((book) => {
      if (book.read[0]) {
        let listItem = createListItem(book);
        if (book.read[1] === 2021) {
          document.querySelector("#app-2021-root").append(listItem);
        } else if (book.read[1] === 2020) {
          document.querySelector("#app-2020-root").append(listItem);
        }
      } else if (book.read[1] === "currently reading") {
        let currentReadImg = document.createElement("img");
        currentReadImg.setAttribute(
          "alt",
          book.title + " by " + book.author + " book cover"
        );
        currentReadImg.setAttribute("src", book.img);
        document.querySelector("#current-read-root").append(currentReadImg);
      }
    });
  })
  .catch((error) => {
    console.error(error);
  });
