"use strict";

const LOCAL_STORAGE_KEY_TBRS = "tbrs";

let tbrs = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_TBRS)) || [];

let listRoot = document.querySelector("#tbr-app-root");

function updateList() {
  saveList();
  listRoot.innerHTML = "";
  listRoot.append(createUserTbr(tbrs));
}

function saveList() {
  localStorage.setItem(LOCAL_STORAGE_KEY_TBRS, JSON.stringify(tbrs));
}

updateList();

function createItem(elementType, innerText) {
  let item = document.createElement(elementType);
  item.innerText = innerText;
  return item;
}

function createUserTbr(items) {
  let list = document.createElement("ul");
  items.forEach((item) => {
    let listItem = document.createElement("li");
    listItem.classList.add("grid", "your-tbr-list");
    let title = createItem("p", item.title);
    title.classList.add("book-title");
    let author = createItem("p", item.author);
    author.classList.add("author");
    let library;
    if (item.library[0]) {
      library = createItem("a", "Stockholm");
      library.setAttribute("href", item.library[1]);
    } else {
      library = createItem("p", "Library Not available");
    }
    library.classList.add("button-text");
    let purchase = createItem("a", item.store[0]);
    purchase.setAttribute("href", item.store[1]);
    purchase.classList.add("button-text");
    let removeButton = createItem("button", "REMOVE");
    removeButton.addEventListener("click", () => {
      tbrs = tbrs.filter((thing) => thing.id !== item.id);
      updateList();
      updateButton(item.id);
    });
    listItem.append(title, author, purchase, library, removeButton);
    list.append(listItem);
  });
  return list;
}

fetch("./content/books.json", {})
  .then((response) => {
    console.log(response);
    return response.json();
  })
  .then((data) => {
    console.log(data);
    data.forEach((book) => {
      if (!book.read) {
        let listItem = document.createElement("li");
        listItem.classList.add("grid", "my-tbr-list");
        let title = createItem("p", book.title);
        title.classList.add("book-title");
        let author = createItem("p", book.author);
        author.classList.add("author");
        let status = createItem("p", book.status);
        let addToTbr = createItem("button", "+");
        addToTbr.classList.add("button-text");
        addToTbr.addEventListener("click", () => {
          let bookAlreadyAdded = false;
          tbrs.forEach((item) => {
            if (item.id === book.id) {
              bookAlreadyAdded = true;
              addToTbr.innerText = "already added";
            }
          });
          if (!bookAlreadyAdded) {
            tbrs.push(book);
            addToTbr.innerText = "Added";
            updateList();
          }
        });
        listItem.append(title, author, status, addToTbr);
        document.querySelector("#app-root").append(listItem);
      }
    });
  })
  .catch((error) => {
    console.error(error);
  });
