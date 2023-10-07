let form = document.querySelector(".form form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let nameLastname = document.querySelector("#name").value;
  let email = document.querySelector("#mail").value;
  let text = document.querySelector("#text").value;

  const result = await fetch("./api/sendMail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nameLastname, email, text }),
  }).then((response) => response.json());

  if (result.status === "ok") {
    alert("E-mail sent");
    location.reload();
  }
});
