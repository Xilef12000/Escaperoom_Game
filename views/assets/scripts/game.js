function check_progression() {
    if (location.pathname != "/game") {
        if (document.cookie == "" || document.cookie.match(new RegExp('(^| )' + "end" + '=([^;]+)'))[2] == "true") {
            location.href = "/";
        }
        console.log(document.cookie.match(new RegExp('(^| )' + "end" + '=([^;]+)'))[2] == "true");
    }
}
check_progression();
window.onpageshow = function(event) {
    check_progression();
};
function start() {
    document.cookie = "raetsel01=false; path=/";
    document.cookie = "raetsel02=false; path=/";
    document.cookie = "raetsel03=false; path=/";
    document.cookie = "end=false; path=/";
    document.cookie = `start=${new Date()}; path=`;
    location.href = "/home";
}
function check() {
    document.cookie = "end=true; path=/";
    let right = 0;
    right += document.cookie.match(new RegExp('(^| )' + "raetsel01" + '=([^;]+)'))[2] == "true" ? 1 : 0;
    right += document.cookie.match(new RegExp('(^| )' + "raetsel02" + '=([^;]+)'))[2] == "true" ? 1 : 0;
    right += document.cookie.match(new RegExp('(^| )' + "raetsel03" + '=([^;]+)'))[2] == "true" ? 1 : 0;
    if (right == 3){
        location.href = "/win";
    }
    else {
        location.href = "/lose";
    }
}
function check_raetsel01() {
    let solution = document.getElementById("solution_out")
    if (document.getElementById("solution").value.trim().toLowerCase() == "läufer f8, springer h3, turm h4") {
        solution.innerHTML = "Richtige Antwort!";
        solution.className = "solution_right";
        document.cookie = "raetsel01=true; path=/";
    }
    else {
        solution.innerHTML = "Falsche Antwort...";
        solution.className = "solution_wrong";
    }
}
function check_raetsel02() {
    let solution = document.getElementById("solution_out");
    if (document.getElementById("solution").value.trim().toLowerCase() == "leibspeise") {
        solution.innerHTML = "Passwort correct <br> booting up STARFLEET COMMAND SYSTEM<";
        document.getElementById("submit").style.display = 'none';
        solution.className = "solution_right";
        document.cookie = "raetsel02=true; path=/";
    }
    else {
        solution.innerHTML = "incorrect password";
        solution.className = "solution_wrong";
    }
}
function check_raetsel03() {
    let right = 0;
    right += document.getElementById("solution_a").value.trim().toLowerCase() == "deilenschraube" ? 1 : 0;
    right += document.getElementById("solution_b").value.trim().toLowerCase() == "bohrschraube" ? 1 : 0;
    right += document.getElementById("solution_c").value.trim().toLowerCase() == "holzbauschraube" ? 1 : 0;
    right += document.getElementById("solution_d").value.trim().toLowerCase() == "sprenglerschraube" ? 1 : 0;
    right += document.getElementById("solution_e").value.trim().toLowerCase() == "justierschraube" ? 1 : 0;
    let solution = document.getElementById("solution_out");
    if (right == 5){
        solution.innerHTML = "Richtige Antwort!";
        solution.className = "solution_right";
        document.cookie = "raetsel03=true; path=/";
    }
    else {
        solution.innerHTML = "Falsche Antwort...";
        solution.className = "solution_wrong";
    }
}
function set_timer() {
    let timer = document.getElementById("timer");
    let start = document.cookie.match(new RegExp('(^| )' + "start" + '=([^;]+)'))[2];
    let time_passed = (Date.now() - Date.parse(start))/1000;
    let time_frame = 45*60 // allowed time in seconds
    let time_left = time_frame - Math.floor(time_passed);
    let time_left_str = new Date(null);
    time_left_str.setSeconds(time_left);
    timer.innerHTML = time_left_str.toISOString().slice(11, 19);
    if (time_left <= 1) {
        timer.classList.add("red");
        timer.innerHTML = "Time's up!";
    }
    else if (time_left <= 5*60) {
        timer.classList.add("red");
    }
    else if (time_left <= 10*60) {
        timer.classList.add("yellow");
    }
    if (time_left < 0) {
        check();
    }
}
set_timer();
var timerId = window.setInterval(function() {
    set_timer();
}, 1000);
/*
// Funktion, um den Timer zu aktualisieren
function startTimer(duration, display) {
    var start = Date.now(),
        diff,
        hours,
        minutes,
        seconds;
    function timer() {
        // Zeitdifferenz berechnen
        diff = duration - (((Date.now() - start) / 1000) | 0);

        // Stunden, Minuten und Sekunden berechnen
        hours = (diff / 3600) | 0;
        minutes = ((diff % 3600) / 60) | 0;
        seconds = (diff % 60) | 0;

        // Formatieren und im Display anzeigen
        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = hours + ":" + minutes + ":" + seconds;

        // Timer beenden, wenn die Zeit abgelaufen ist
        if (diff <= 0) {
            clearInterval(interval);
            display.textContent = "Time's up!";
            // Optionale Umleitung oder Aktion hinzufügen
            setTimeout(function () {
                window.location.href = "{{ url_for('views.restart') }}";
            }, 2000);
        }
    };
    timer();
    var interval = setInterval(timer, 1000);
}

window.onload = function () {
    // Dauer des Timers in Sekunden (1 Stunde = 3600 Sekunden)
    var oneHour = 60 * 45,
        display = document.querySelector('#timer');

    // Startzeit aus der Session
    var startTime = "{{ session['start_time'] }}";
    var startDate = new Date(startTime).getTime();
    var now = new Date().getTime();

    // Verstrichene Zeit seit dem Start in Sekunden
    var elapsed = Math.floor((now - startDate) / 1000);

    // Verbleibende Zeit in Sekunden
    var remaining = oneHour - elapsed;

    // Timer starten
    startTimer(remaining, display);
};
*/