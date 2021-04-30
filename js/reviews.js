"use strict";

let showMore = document.querySelector("#show-more");
let moreText = document.querySelector("#more-text");
let test = document.querySelector("#test");

showMore.addEventListener("click", () => {
  moreText.classList.remove("hide");
  showMore.classList.add("hide");
  test.classList.toggle("span-3");
});
