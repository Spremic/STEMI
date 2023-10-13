let trenutnaPutanja = window.location.pathname;
if (trenutnaPutanja === "/stolarija") {
  let catalog = document.querySelector("#catalog");
  catalog.innerHTML = `<a href="test.docx" download="test.docx"><button>Catalog</button></a> 
   `;
}
