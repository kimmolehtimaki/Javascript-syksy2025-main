// Etsi eka nappi
let nappi = document.querySelector("button");
// Lisää nappiin kuuntelija
nappi.addEventListener("click", function () {
  alert("Hoi Maailma!");
});

// Etsi kenttä sivulta
let kentta = document.querySelector("input");
// Lisää kuuntelija
kentta.addEventListener("focus", function () {
  alert("Aktivoit kentän");
});
