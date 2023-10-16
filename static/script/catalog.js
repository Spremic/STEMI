let trenutnaPutanja = window.location.pathname;
if (trenutnaPutanja === "/stolarija") {
  let catalog = document.querySelector("#catalog");
  catalog.innerHTML = `<a href="/catalog/paneli.pdf" download="/catalog/paneli.pdf"><button>Catalog</button></a> 
   `;
}
