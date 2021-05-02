"use strict";

let button2021 = document.querySelector("#btn-2021");
let button2020 = document.querySelector("#btn-2020");
let readBooks2021 = document.querySelector("#read-books-2021");
let readBooks2020 = document.querySelector("#read-books-2020");

function hide(hide, show) {
  hide.classList.add("hide");
  show.classList.remove("hide");
}

button2020.addEventListener("click", hide(readBooks2021, readBooks2020));
button2021.addEventListener("click", hide(readBooks2020, readBooks2021));
