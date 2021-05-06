"use strict";

const LOCAL_STORAGE_KEY_TBRS = "tbrs";


let tbrs = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_TBRS)) || [];

function saveList() {
  localStorage.setItem(LOCAL_STORAGE_KEY_TBRS, JSON.stringify(tbrs));
}

function createItem(ElementType, innerText) {
  let item = document.createElement(ElementType);
  item.innerText = innerText;
  return item;
}

let shortReview;
let longReview;

fetch("./content/short-review.txt", {})
  .then((response) => {
    console.log(response);
    return response.text();
  })
  .then((data) => {
    console.log(data);
    shortReview = data;
  })
  .catch((error) => {
    console.error(error);
  });

fetch("./content/long-review.txt", {})
  .then((response) => {
    console.log(response);
    return response.text();
  })
  .then((data) => {
    console.log(data);
    longReview = data;
  })
  .catch((error) => {
    console.error(error);
  });

fetch("./content/books.json", {})
  .then((response) => {
    console.log(response);
    return response.json();
  })
  .then((data) => {
    console.log(data);
    data.forEach((book) => {
      if (book.review) {
        let article = document.createElement("article");
        article.setAttribute("id", book.id);
        let bookCover = document.createElement("img");
        bookCover.setAttribute("src", book.img);
        let title = createItem("h2", book.title);
        let author = createItem("p", book.author);
        let pages = createItem("p", book.pages);
        let score = createItem("p", book.score + "/5");
        let library;
        if (book.library[0]) {
          library = createItem("a", "Library (Stockholm)");
          library.setAttribute("href", book.library[1]);
        } else {
          library = createItem("p", "Not available");
        }
        let purchase = createItem("a", "Buy (" + book.store[0] + ")");
        purchase.setAttribute("href", book.store[1]);
        let addToTbr = createItem("button", "+");
        addToTbr.addEventListener("click", () => {
          let bookAlreadyAdded = false;
          tbrs.forEach((item) => {
            if (item.id === book.id) {
              bookAlreadyAdded = true;
            }
          });
          if (!bookAlreadyAdded) {
            tbrs.push(book);
            saveList();
          }
        });
        let review = createItem("p", shortReview);
        let toggleReview = createItem("a", "Show More");
        toggleReview.setAttribute("href", "#" + book.id);
        let reviewIsShort = true;
        article.append(
          bookCover,
          title,
          author,
          pages,
          score,
          library,
          purchase,
          addToTbr,
          review,
          toggleReview
        );
        toggleReview.addEventListener("click", () => {
          if (reviewIsShort) {
            toggleReview.innerText = "Show less";
            review.innerText = longReview;
            reviewIsShort = false;
          } else {
            toggleReview.innerText = "Show more";
            review.innerText = shortReview;
            reviewIsShort = true;
          }
          article.classList.toggle("span-3");
        });
        document.querySelector("#app-root").append(article);
      }
    });
  })
  .catch((error) => {
    console.error(error);
  });
