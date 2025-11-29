// luodaan funktio ja AJAX-olio datan hakemiseen
function fetchRawWeather() {
    var xmlhttp = new XMLHttpRequest();
    //lisätään API-kutsuun lang=fi , jotta saadaan suomenkieliset kaupunkien nimet
    xmlhttp.open("GET", "https://api.openweathermap.org/data/2.5/weather?q=London&lang=fi&units=metric&mode=JSON&APPID=2d45a57e705bccf0e859e32fcfc0a798", true);
    xmlhttp.send();

    //luodaan vastauksen käsittelijä
    xmlhttp.onreadystatechange=function() {
            if (xmlhttp.readyState==4 && xmlhttp.status==200) {
                let jsonwe = xmlhttp.responseText;
                //lisätään sisältö div:iin
                document.getElementById("weatherdata").innerHTML = jsonwe;
            
                
        }

    }
};

//Kaupungin valinta puotusvalikon kautta

function selectCity() {
    //muuttuja kaupungille
    let city = document.getElementById("city").value;
            
    var xmlhttp = new XMLHttpRequest();
    //määritetään dynaamisesti muuttuja URL:lle, jotta saadaan API-kutsu muuttumaan käyttäjän valinnan mukaisesti
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=fi&units=metric&mode=JSON&APPID=2d45a57e705bccf0e859e32fcfc0a798`;

    xmlhttp.open("GET", url, true);
    //lähetetään kutsu
    xmlhttp.send();

    //luodaan vastauksen käsittelijä
    xmlhttp.onreadystatechange=function() {
            if (xmlhttp.readyState==4 && xmlhttp.status==200) {
                const jsonwe = JSON.parse(xmlhttp.responseText);
                
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
                                    <td>${jsonwe.name}</td>
                                    <td>${Math.round(jsonwe.main.temp)}°C</td> 
                                    <td>${jsonwe.weather[0].description}</td>
                                    <td>${jsonwe.main.humidity}%</td>
                                    <td><img src="https://openweathermap.org/img/w/${jsonwe.weather[0].icon}.png"></td>
                                    
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
        const urlSearch = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&lang=fi&units=metric&mode=JSON&APPID=2d45a57e705bccf0e859e32fcfc0a798`;

        xmlhttp.open("GET", urlSearch, true);
        xmlhttp.send();

        //vastauksen käsittelijä
        xmlhttp.onreadystatechange=function() {
            if (xmlhttp.readyState==4 && xmlhttp.status==200) {
                const jsonwe = JSON.parse(xmlhttp.responseText);
                
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
                                    <td>${jsonwe.name}</td>
                                    <td>${Math.round(jsonwe.main.temp)}°C</td> 
                                    <td>${jsonwe.weather[0].description}</td>
                                    <td>${jsonwe.main.humidity}%</td>
                                    <td><img src="https://openweathermap.org/img/w/${jsonwe.weather[0].icon}.png"></td>
                                    
                                </tr>
                                </table>`;
                
                //lisätään sisältö div:iin
                document.getElementById("weatherdata").innerHTML = table;
            } //if päättyy
        }
    });


        

        
