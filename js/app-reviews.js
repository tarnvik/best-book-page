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
        article.classList.add("review", "grid");
        let bookCover = document.createElement("img");
        bookCover.setAttribute("src", book.img);
        bookCover.classList.add("review-img");
        let title = createItem("h2", book.title);
        let author = createItem("p", book.author);
        let div = document.createElement("div");
        div.classList.add("flex", "around");
        let pages = createItem("p", "Pages: " + book.pages);
        let score = createItem("p", book.score + "/5");
        div.append(pages, score);
        let library;
        if (book.library[0]) {
          library = createItem("a", "Library (Stockholm)");
          library.setAttribute("href", book.library[1]);
        } else {
          library = createItem("p", "Not available");
        }
        let purchase = createItem("a", "Buy (" + book.store[0] + ")");
        purchase.setAttribute("href", book.store[1]);
        let addToTbrText = createItem("p", "Add to TBR: ");
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
        review.classList.add("span-2");
        let toggleReview = createItem("a", "Show More");
        toggleReview.setAttribute("href", "#" + book.id);
        let reviewIsShort = true;
        article.append(
          bookCover,
          title,
          author,
          div,
          library,
          purchase,
          addToTbrText,
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
          article.classList.toggle("span-end");
        });
        document.querySelector("#app-root").append(article);
      }
    });
  })
  .catch((error) => {
    console.error(error);
  });
