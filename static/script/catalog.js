let trenutnaPutanja = window.location.pathname;
if (trenutnaPutanja === "/stolarija") {
  let catalog = document.querySelector("#catalog");
  catalog.innerHTML = `<a href="/paneli.pdf" download="/paneli.pdf"><button>Catalog</button></a> 
   `;
}
