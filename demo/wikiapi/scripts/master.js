function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
var showPosition = function (position) {

    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    var linkWeather =
        "https://fcc-weather-api.glitch.me/api/current?lat=" +
        latitude +
        "&lon=" +
        longitude;


    let loadJSON = function (url) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let res = JSON.parse(this.responseText);
                console.log(res);
                document.getElementById('position').innerHTML = res.name + " , ";
                document.getElementById('weather').innerHTML = res.weather[0].main;
                document.getElementById('temp').innerHTML = (res.main.temp).toFixed(2) + "°";
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    };
    loadJSON(linkWeather);
};
getLocation();
let enter =
    document.getElementById("search").addEventListener("keypress", function () {
        let keycode = event.keyCode;
        if(keycode==13){
        document.getElementById('res-list-container').innerHTML = "";
        document.getElementById('res-list-container').classList.remove("hidden");
        document.getElementById('res-list-container').classList.add("visible");
        wiki();
    }
    },false);

let search =
    document.getElementById("go").addEventListener("click", function () {
        document.getElementById('res-list-container').innerHTML = "";
        document.getElementById('res-list-container').classList.remove("hidden");
        document.getElementById('res-list-container').classList.add("visible");
        wiki();
    }, false);

var wiki = function () {

    let input = document.getElementById("search").value;

    let wikiUrl = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&origin=*&srsearch=" + input;

    let loadJSON = function (url) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", url, true);
        xhttp.send();
        xhttp.onload = function () {
            if (this.status == 200) {
                let res = JSON.parse(this.responseText);

                if(res.query.search.length <= 0){
                   alert('nothing found with the keyword '+input);
                }
                for (let i = 0; i < res.query.search.length; i++) {



                    //transform each div in a clickable link

                    var resultLink = document.createElement('a');
                    resultLink.id = 'resultLink' + i;
                    resultLink.className = 'resultLink';
                    resultLink.setAttribute("href", "https://en.wikipedia.org/wiki/" + res.query.search[i].title);
                    resultLink.setAttribute("target","_blank");
                    document.getElementById("res-list-container").appendChild(resultLink);


                    //create container div for the results
                    var resultDiv = document.createElement("DIV");
                    resultDiv.id = "result" + i;
                    resultDiv.className = "result";
                    document.getElementById("resultLink" + i).appendChild(resultDiv);

                    //create title for each result

                    var resultTitle = document.createElement("H2");
                    resultTitle.innerHTML = res.query.search[i].title;
                    resultTitle.id = "resultTitle" + i;
                    resultTitle.className = "resultTitle";
                    document.getElementById('result' + i).appendChild(resultTitle);

                    //create snippet for each result

                    var resultSnippet = document.createElement("P");
                    resultSnippet.innerHTML = res.query.search[i].snippet;
                    resultSnippet.id = "resultSnippet" + i;
                    resultSnippet.className = "resultSnippet";
                    document.getElementById('result' + i).appendChild(resultSnippet);

                }
            }
            
        }

    };
    loadJSON(wikiUrl);
};

let randomArticle = function () {
    window.open('https://en.wikipedia.org/wiki/Special:Random');
}
let random = document.getElementById("random").addEventListener('click', function () {
    randomArticle();
});

//random quotes

let urlQuote = "https://random-quote-generator.herokuapp.com/api/quotes/";

let quotes = document.getElementById("quote").addEventListener("click",function (){
    document.getElementById('quote-container').classList.remove("visible");
    document.getElementById('quote-container').classList.add("hidden");
    document.getElementById('quote-container').innerHTML="";
    document.getElementById('quote-container').classList.remove("hidden");
    document.getElementById('quote-container').classList.add("visible") ;
    getQuote(urlQuote);
});


let getQuote = function(url) { 
    let xhttp = new XMLHttpRequest();
        xhttp.open("GET",url,true);
        xhttp.send();
        xhttp.onload = function () {

            if(this.status == 200){
                let res = JSON.parse(this.responseText);

                function getRandomInt(min, max) {
                    min = Math.ceil(min);
                    max = Math.floor(max);
                    return Math.floor(Math.random() * (max - min)) + min;
                  }
                let r = getRandomInt(0,res.length);

                //append result quote to html div

                let quote = document.createElement("P");
                let author = document.createElement("P");
                author.innerHTML = "   - " + res[r].author;
                author.style.fontStyle="italic";
                quote.innerHTML = res[r].quote;
                document.getElementById('quote-container').appendChild(quote);
                document.getElementById('quote-container').appendChild(author);


            }

        };
};