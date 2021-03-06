function onLoadEvents() {
    httpRequest();
    document.getElementById("first").onclick = function () { httpRequest(1); };
    document.getElementById("previous").onclick = function () { httpRequest(window.currentxkcd - 1); };
    document.getElementById("random").onclick = function () { httpRequest(Math.round(Math.random() * window.xkcdlatest + 1)); };
    document.getElementById("next").onclick = function () { httpRequest(window.currentxkcd + 1); };
    document.getElementById("last").onclick = function () { httpRequest(); };
    document.getElementById("alt").onclick = function () { window.alert(window.xkcdinfo.alt); };
}

/*
load() function directs Element with the id "comic" to
window.xkcdinfo.img which contains the current image location
*/
function load() {
    window.currentxkcd = window.xkcdinfo.num;
    document.getElementById("comic").innerHTML = "<img src=" + window.xkcdinfo.img + ">";
}

/*
httpRequest function creates a new information request to send to the XKCD Server
for the most current JSON file containing the Image and alternate information
for the current XKCD comic which it then strips and assigns to window.xkcdinfo.num
for later use with load function.
*/

function httpRequest(strip) {
    var reqxkcd;
    reqxkcd = new XMLHttpRequest({mozSystem: true});
    reqxkcd.onreadystatechange = function loadState() {
        if (reqxkcd.readyState === 4 && reqxkcd.status === 200) {
            window.xkcdinfo = JSON.parse(reqxkcd.responseText);
            if (!strip) {
                window.xkcdlatest = window.xkcdinfo.num;
            }
            load();
        } else {
            document.getElementById("comic").innerHTML = reqxkcd.readyState + " " + reqxkcd.status;
        }
    };
    if (!strip) {
        reqxkcd.open("GET", "http://xkcd.com/info.0.json", true);
    } else {
        reqxkcd.open("GET", "http://xkcd.com/" + strip + "/info.0.json", true);
    }
    reqxkcd.send(null);
}

/* Event Listeners*/
window.onload = function () { onLoadEvents(); };




/*
function getRandomNumber() {
    return 4; //chosen by fair dice roll
              //guaranteed to be random
}
*/

