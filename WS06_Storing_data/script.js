//Tehtävä 1: Määritetään funktio,  haetaan arvot ja tallennetaan kentän arvot localstorageen

function getData() {
    //haetaan arvot
    const destinationCity = document.querySelector("#destination").value;
    const arrivalDate = document.querySelector("#arrival").value;
    const checkboxes = document.querySelectorAll("#services input[type='checkbox']"); //haetaan kaikki checkboxit

    //luodaan niistä taulukko
    let selectedServices = [];

    //luodaan forEach-silmukka jossa käydään läpi onko palvelu valittu => lisätään taulukkoon
    checkboxes.forEach(box => {
        if (box.checked) {
            selectedServices.push(box.value);
        }
    });

    //tallennetaan kenttien arvot localstorageen
    localStorage.setItem("destination", destinationCity);
    localStorage.setItem("arrival", arrivalDate);
    localStorage.setItem("checkboxes", selectedServices);
    
}




