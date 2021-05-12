"use strict;";

fetch("./content/books.json", {})
  .then((response) => {
    console.log(response);
    return response.json();
  })
  .then((data) => {
    console.log(data);
    data.forEach((book) => {
      if (book.review) {
        let bookCover = document.createElement("img");
        bookCover.classList.add("span-2-row");
        bookCover.setAttribute("src", book.img);
        bookCover.setAttribute(
          "alt",
          book.title + " by " + book.author + " book cover"
        );
        document.querySelector("#app-root").append(bookCover);
      }
    });
  })
  .catch((error) => {
    console.error(error);
  });
