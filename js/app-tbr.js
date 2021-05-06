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
    let title = createItem("p", item.title);
    let author = createItem("p", item.author);
    let removeButton = createItem("button", "REMOVE");
    removeButton.addEventListener("click", () => {
      tbrs = tbrs.filter((thing) => thing.id !== item.id);
      updateList();
    });
    listItem.append(title, author, removeButton);
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
        listItem.classList.add("grid", "tbr-list");
        let title = createItem("p", book.title);
        let author = createItem("p", book.author);
        let status = createItem("p", book.status);
        let addToTbr = createItem("button", "+");
        addToTbr.addEventListener("click", () => {
          tbrs.push(book);
          updateList();
        });
        listItem.append(title, author, status, addToTbr);
        document.querySelector("#app-root").append(listItem);
      }
    });
  })
  .catch((error) => {
    console.error(error);
  });
