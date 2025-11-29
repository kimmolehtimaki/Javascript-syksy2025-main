//Haetaan raakadata "Ivalo"
// luodaan funktio ja AJAX-olio datan hakemiseen

function fetchRawXml() {
    //tehdään API-kutsu
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "https://api.openweathermap.org/data/2.5/weather?q=Ivalo&lang=fi&units=metric&mode=xml&APPID=2d45a57e705bccf0e859e32fcfc0a798", true);
    xmlhttp.send();

    //luodaan vastauksen käsittelijä
    xmlhttp.onreadystatechange=function() {
            if (xmlhttp.readyState==4 && xmlhttp.status==200) {
                // Tellennetaan XML-data muuttujaan
                let xmlDoc = xmlhttp.responseXML;

                // haetaan <temperature>,<clouds> ja <humidity> -elementtien raakatiedot
                let temp = xmlDoc.getElementsByTagName("temperature")[0];
                let clouds = xmlDoc.getElementsByTagName("clouds")[0];
                let humidity = xmlDoc.getElementsByTagName("humidity")[0];
                                
                // console.log(temp);
                                
                //muutetaan XML-oliion sisällöstä raakadata
                let tempXml = new XMLSerializer().serializeToString(temp);
                let cloudsXml = new XMLSerializer().serializeToString(clouds);
                let humidityXml = new XMLSerializer().serializeToString(humidity);
                
                // //lisätään sisältö div:iin
                document.getElementById("weatherdata").textContent = 
                    tempXml +
                    cloudsXml +
                    humidityXml;                         
        }

    }
};

// luodaan funktio
//kokeillaan fetch-muotoista AJAX-kutsua
function parseRawXml() {
    // Haetaan data
    fetch("https://api.openweathermap.org/data/2.5/weather?q=Ivalo&lang=fi&units=metric&mode=xml&APPID=2d45a57e705bccf0e859e32fcfc0a798")
    .then(response => response.text()) // Muutetaan vastaus tekstiksi
    .then(xmlText => new DOMParser().parseFromString(xmlText, "text/xml")) // Parsitaan XML
    .then(xmlDoc => parseData(xmlDoc))
    .catch(error => console.error("Virhe haettaessa XML-syötettä:", error));

// Oma funktio joka poimii datat
function parseData(xmlDoc) {
    let temp = xmlDoc.getElementsByTagName("temperature")[0].getAttribute("value");
    let clouds = xmlDoc.getElementsByTagName("clouds")[0].getAttribute("value");
    let humidity = xmlDoc.getElementsByTagName("humidity")[0].getAttribute("value");
    let tableHTML = `
        <table border="1">
            <tr>
                <th>Lämpötila</th>
                <th>Pilvisyys</th>
                <th>Ilmankosteus</th>
            </tr>
            <tr>
                <td>${temp}</td>
                <td>${clouds}</td>
                <td>${humidity}</td>
            </tr>
        </table>`;

        
        // Asetetaan HTML-taulukko sivulle #data -nimiseen elementtiin
        document.querySelector("#weatherdata").innerHTML = tableHTML;  
    }
};

//Kaupungin valinta puotusvalikon kautta

function selectCity() {
    //muuttuja kaupungille
    let city = document.getElementById("city").value;
            
    var xmlhttp = new XMLHttpRequest();
    //määritetään dynaamisesti muuttuja URL:lle, jotta saadaan API-kutsu muuttumaan käyttäjän valinnan mukaisesti
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=fi&units=metric&mode=xml&APPID=2d45a57e705bccf0e859e32fcfc0a798`;

    xmlhttp.open("GET", url, true);
    //lähetetään kutsu
    xmlhttp.send();

    //luodaan XML-vastauksen käsittelijä
    xmlhttp.onreadystatechange=function() {
            if (xmlhttp.readyState==4 && xmlhttp.status==200) {
                // Tellennetaan XML-data muuttujaan
                let xmlDoc = xmlhttp.responseXML;

                // haetaan <temperature>,<clouds> ja <humidity> -elementtien raakatiedot
                let name = xmlDoc.getElementsByTagName("city")[0].getAttribute("name");
                let temp = xmlDoc.getElementsByTagName("temperature")[0].getAttribute("value");
                let clouds = xmlDoc.getElementsByTagName("clouds")[0].getAttribute("name");
                let humidity = xmlDoc.getElementsByTagName("humidity")[0].getAttribute("value");
                let icon = xmlDoc.getElementsByTagName("weather")[0].getAttribute("icon");
                   
                //Math.round()-funktio pyöristämiseen
                const table = `
                                <table border="1">
                                <tr>
                                    <th>Kaupunki</th>
                                    <th>Lämpötila</th>
                                    <th>Säätila</th>
                                    <th>Ilman kosteus</th>
                                    <th>Ikoni</th>
                                </tr>
                                <tr>
                                    <td>${name}</td>
                                    <td>${Math.round(temp)}°C</td> 
                                    <td>${clouds}</td>
                                    <td>${humidity}%</td>
                                    <td><img src="https://openweathermap.org/img/w/${icon}.png"></td>
                                    
                                </tr>
                                </table>`;
                
                //lisätään sisältö div:iin
                document.getElementById("weatherdata").innerHTML = table;
            } //if päättyy
        }
    };

    //kaupungin valinta search-input kentän kautta
    
    //määritetään muuttujat
    const searchInput = document.getElementById("citysearch");
    const searchBtn = document.getElementById("search");

    //lisätään dynaaminen kuuntelija
    searchBtn.addEventListener("click", function() {
        const searchQuery = searchInput.value;

        var xmlhttp = new XMLHttpRequest();
        //dynaaminen määritys haku URL:lle
        const urlSearch = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&lang=fi&units=metric&mode=xml&APPID=2d45a57e705bccf0e859e32fcfc0a798`;

        xmlhttp.open("GET", urlSearch, true);
        xmlhttp.send();

        //luodaan XML-vastauksen käsittelijä
    xmlhttp.onreadystatechange=function() {
            if (xmlhttp.readyState==4 && xmlhttp.status==200) {
                // Tellennetaan XML-data muuttujaan
                let xmlDoc = xmlhttp.responseXML;

                // haetaan <temperature>,<clouds> ja <humidity> -elementtien raakatiedot
                let name = xmlDoc.getElementsByTagName("city")[0].getAttribute("name");
                let temp = xmlDoc.getElementsByTagName("temperature")[0].getAttribute("value");
                let clouds = xmlDoc.getElementsByTagName("clouds")[0].getAttribute("name");
                let humidity = xmlDoc.getElementsByTagName("humidity")[0].getAttribute("value");
                let icon = xmlDoc.getElementsByTagName("weather")[0].getAttribute("icon");
                   
                //Math.round()-funktio pyöristämiseen
                const table = `
                                <table border="1">
                                <tr>
                                    <th>Kaupunki</th>
                                    <th>Lämpötila</th>
                                    <th>Säätila</th>
                                    <th>Ilman kosteus</th>
                                    <th>Ikoni</th>
                                </tr>
                                <tr>
                                    <td>${name}</td>
                                    <td>${Math.round(temp)}°C</td> 
                                    <td>${clouds}</td>
                                    <td>${humidity}%</td>
                                    <td><img src="https://openweathermap.org/img/w/${icon}.png"></td>
                                    
                                </tr>
                                </table>`;
                
                //lisätään sisältö div:iin
                document.getElementById("weatherdata").innerHTML = table;
                
            } else if (xmlhttp.readyState == 4 && xmlhttp.status == 404) {
                alert("Annetuilla hakuehdoilla ei löytynyt tuloksia, tarkista hakusana!")
            }
            
        }
    });


        

        
