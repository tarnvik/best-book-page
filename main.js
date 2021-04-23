"use strict";

let button2021 = document.querySelector("#btn-2021");
let button2020 = document.querySelector("#btn-2020");
let readBooks2021 = document.querySelector("#read-books-2021");
let readBooks2020 = document.querySelector("#read-books-2020");

button2021.addEventListener("click", () => {
  readBooks2021.classList.remove("hide");
  readBooks2020.classList.add("hide");
});

button2020.addEventListener("click", () => {
  readBooks2020.classList.remove("hide");
  readBooks2021.classList.add("hide");
});
