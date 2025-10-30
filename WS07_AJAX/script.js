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
