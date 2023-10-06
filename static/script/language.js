let languageBtn = document.querySelectorAll(".language-menu a");

const languageMap = {
  Serbian: "srb",
  English: "eng",
  German: "ger",
  French: "fr",
};

languageBtn.forEach((e) => {
  e.addEventListener("click", async (event) => {
    let targetEl = event.target.innerHTML;
    let language = languageMap[targetEl];
    console.log(language);
    document.cookie =
      "language=" +
      language +
      "; expires=" +
      new Date(Date.now() + 100 * 365 * 24 * 60 * 60 * 1000).toUTCString() +
      "; path=/";

    location.reload();
  });
});



//loader 

const loadingScreen = document.querySelector('.loading-container');

window.addEventListener('load', () => {
    loadingScreen.style.display = 'none';
});