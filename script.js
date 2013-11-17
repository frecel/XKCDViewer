function load() {
    window.currentxkcd = window.xkcdinfo.num;
    document.getElementById("comic").innerHTML = "<img src=" + window.xkcdinfo.img + ">";
    
}

function httpRequest(strip) {
    var reqxkcd;
    reqxkcd = new XMLHttpRequest({mozSystem: true});
    reqxkcd.onreadystatechange = function loadState() {
        if (reqxkcd.readyState === 4 && reqxkcd.status === 200) {
            window.xkcdinfo = JSON.parse(reqxkcd.responseText);
            window.xkcdlatest = window.xkcdinfo.num;
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