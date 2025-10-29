// Tehtävä 1 ratkaisut
var text = '{ "employees" : [' +
			'{ "firstName":"John" , "lastName":"Doe" },' +
			'{ "firstName":"Anna" , "lastName":"Smith" },' +
			'{ "firstName":"Peter" , "lastName":"Jones" } ]}';

//parsitaan JSON-data
var names = JSON.parse(text);

// haetaan molemmat halutu napit
var getNames = document.getElementById("getNames");
var getAllData = document.getElementById("getAllData");

// haetaan haluttu div-elementti
var jsondata = document.getElementById("jsondata");

//luodaan kuuntelija napillle 1
getNames.addEventListener("click", function() {

    // luodaan funktio joka yhdistää etu- ja sukunimen
    function combineName(employee) {
        return employee.firstName + " " + employee.lastName;
    }

    //käydään työntekijöät läpi silmukalla ja tulostetaan koko nimet
    for (let i = 0; i < names.employees.length; i++) {
        let employee = names.employees[i];
        let fullName = combineName(employee);
        jsondata.innerHTML += "<br>" + fullName;
    }
    });

// //luodaan kuuntelija napille 2:
getAllData.addEventListener("click", function() {
    //käydään läpi työntekijöiden tiedot for-silmukalla
    for (let i = 0; i < names.employees.length; i++) {
        let emp = names.employees[i];
        //käydään läpi kaikki avain-arvoparit
        for (let key in emp) {
            jsondata.innerHTML += "<br>" + key + ": " + emp[key] +" ";
        }
        jsondata.innerHTML += "<br>";
    }
});

// Tehtävä 2 ratkaisut
