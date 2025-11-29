// Tehtävä 1 ratkaisut
var text = '{ "employees" : [' +
			'{ "firstName":"John" , "lastName":"Doe" },' +
			'{ "firstName":"Anna" , "lastName":"Smith" },' +
			'{ "firstName":"Peter" , "lastName":"Jones" } ]}';

//parsitaan JSON-data
const obj = JSON.parse(text);

// haetaan molempien <button> HTML-elementit
const getNames = document.getElementById("getNames");
const getAllData = document.getElementById("getAllData");
// muuttuja, jolla lisätään data div-elementtiin
const jsondata = document.getElementById("jsondata");

//luodaan kuuntelija napille
getNames.addEventListener("click", function() {
    //luodaan FOR-silmukka jolla käydään kaikki työntekijät läpi
    for (let i = 0; i < obj.employees.length; i++) {
        let employee = obj.employees[i];
        jsondata.innerHTML += "<br>" + employee.firstName + " " + employee.lastName;
    }
});

//luodaan kuuntelija napille 2:
getAllData.addEventListener("click", function() {
    //käydään läpi työntekijöiden tiedot for-silmukalla
    for (let i = 0; i < obj.employees.length; i++) {
        let emp = obj.employees[i];
        //käydään läpi kaikki avain-arvoparit
        for (let key in emp) {
            jsondata.innerHTML += "<br>" + key + ": " + emp[key] +" ";
        }
        jsondata.innerHTML += "<br>";
    }
});

// Tehtävä 2 ratkaisut

// Luodaan kuuntelijan funktio raakadata-napille ja AJAX kysely
function downloadRawData() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "https://www.omdbapi.com/?s=star+wars&apikey=cbbc6750", true);
    //lähetetään pyyntö
    xmlhttp.send();

    // vastauksen käsittely ja "onreadystatechange" -kuuntelin lisääminen
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            let json = xmlhttp.responseText;
            // lisätään sisältö div:iin
            document.getElementById("rawdata").innerHTML = json;
        }
    }
    
};

// haetaan ja parsitaan data
function parseRawData() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "https://www.omdbapi.com/?s=star+wars&apikey=cbbc6750", true);
    xmlhttp.send();

    // vastauksen käsittely ja "onreadystatechange" -kuuntelin lisääminen
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            let json = xmlhttp.responseText;
            
            //parsitaan data
            let data = JSON.parse(json);
            let movies = data.Search;
            
            //litätään rivit taulukkoon
            let rows = '<table border="1">';
            
            // käydään jokainen elokuva läpi for-silmukalla
            for (let i = 0; i < movies.length; i++) {
                let title = movies[i].Title;
                let year = movies[i].Year;
                let type = movies[i].Type;
                let imdb = movies[i].imdbID;
                let poster = movies[i].Poster;
                
            // luodaan silmukan jokaisella kierroksella uusi rivi
                rows += `<tr>
                            <td>${title}</td>
                            <td>${year}</td>
                            <td>${type}</td>
                            <td>${imdb}</td>
                            <td><a target='_blank' href='${poster}'>Poster</a></td>
                            <td><img src="${poster}" height="50px"></td>
                        </tr>`;
            } //for silmukka päätty
            
            // lisätään sisältö div:iin
            document.getElementById("rawdata").innerHTML = rows;
        }
    }
};

// Tehtävä 3 ratkaisut

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
                                    <td>${Math.round(jsonwe.main.temp)}°C</td> Math.round()-funktio pyöristämiseen
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

    //haku search-kentän kautta
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
                
            } else if (xmlhttp.readyState == 4 && xmlhttp.status == 404) {
                alert("Annetuilla hakuehdoilla ei löytynyt tuloksia, tarkista hakusana!")
            }
            
        }
    });