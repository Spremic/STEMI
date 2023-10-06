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
