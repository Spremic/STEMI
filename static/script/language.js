let languageBtn = document.querySelectorAll(".language-dropdown a");

window.addEventListener("load", async () => {
  let language = localStorage.getItem("language");
  console.log(language);
  try {
    const result = await fetch("./api/language", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ language }),
    });

    const data = await result.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
});

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

    localStorage.setItem("language", language);
    location.reload()
  });
});
