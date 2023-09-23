let openPageBtn = document.querySelector("#open-page-button");

openPageBtn.addEventListener("click", () => {
  let welcomeContainer = document.querySelector(".welcome-container");
  let pageContent = document.querySelector("#page-content");
  welcomeContainer.classList.add("animate__fadeOutDown");
  setInterval(() => {
    welcomeContainer.style.display = "none"
    pageContent.classList.add("animate__slideInUp");
    pageContent.style.display = "block";
  }, 700);
});
