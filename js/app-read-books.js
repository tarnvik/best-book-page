let readBooks2021 = document.querySelector("#read-books-2021");
let readBooks2020 = document.querySelector("#read-books-2020");

function hide(hide, show) {
  hide.classList.add("hide");
  show.classList.remove("hide");
}

document.querySelector("#btn-2020").addEventListener("click", () => {
  hide(readBooks2021, readBooks2020);
});

document.querySelector("#btn-2021").addEventListener("click", () => {
  hide(readBooks2020, readBooks2021);
});

function createListItem(book) {
  let listItem = document.createElement("li");
  listItem.classList.add("grid", "book-list");
  let titleLink = document.createElement("a");
  titleLink.setAttribute("href", "reviews.html#" + book.id);
  titleLink.innerText = book.title;
  let author = document.createElement("p");
  author.innerText = book.author;
  let pages = document.createElement("p");
  pages.innerText = book.pages;
  let score = document.createElement("p");
  score.innerText = book.score + "/5";
  let addToTbr = document.createElement("button");
  addToTbr.innerText = "+";
  listItem.append(titleLink, author, pages, score, addToTbr);
  return listItem;
}

fetch("./books.json", {})
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
        let currentRead = document.createElement("p");
        currentRead.innerText = book.title;
        let currentReadImg = document.createElement("img");
        currentReadImg.setAttribute("src", book.img);
        document
          .querySelector("#current-read-root")
          .append(currentRead, currentReadImg);
      }
    });
  })
  .catch((error) => {
    console.error(error);
  });
