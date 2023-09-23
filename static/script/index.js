//loader
let loaderInterval = setInterval(() => {
  let body = document.querySelector("#body");
  let header = document.querySelector("header");
  let welcomeTXT = document.querySelector(".welcomeTXT");
  let loader = document.querySelector(".loader");
  header.style.display = "block";
  welcomeTXT.style.display = "block";
  loader.classList.add("animate__fadeOut");
  body.style.overflowY = "auto"
  clearInterval(loaderInterval);
}, 2000);

//pokazuje dodatni paragraf za mobilnu verziju
let readMoreWhyUsBTN = document.querySelector("#read-more-why-us");
readMoreWhyUsBTN.addEventListener("click", () => {
  let paragraph = document.querySelector(".pc");
  if (readMoreWhyUsBTN.innerHTML === "Vidi vise") {
    paragraph.style.display = "block";
    paragraph.classList.add("animate__fadeInLeft");
    readMoreWhyUsBTN.innerHTML = "Smanji";
  } else {
    paragraph.style.display = "none";
    readMoreWhyUsBTN.innerHTML = "Vidi vise";
  }
});
