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