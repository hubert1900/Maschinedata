// script.js

// Funktion um bei Klick ein Fenster zu öffnen
function onButtonclickID() {
    var userInput = document.getElementById('userInput').value.trim();
    var allowedMachineTypes = ["UG39BE-47H8UJ", "4558N-ZZLOP", "ZDSJ88-112HH", "DFFBN-99148", "Z7ZU8-NNJK1"];   

    if (allowedMachineTypes.includes(userInput)) {      //überprüft ob die Eingabe in der Liste der erlaubten Id-Nr ist
        alert("Diese Identifikation-Nr gehört zu einer, in unserer Produktion befindlichen Maschine");
    } else {
        alert("Bitte überprüfe deine Eingabe");
    }
    document.getElementById('userInput').value = '';    //leert das Eingabefeld
}
// Funktion um bei Klick ein Fenster zu öffnen
function onButtonclickMN() {
    var userInput1 = document.getElementById('userInput1').value;
    var allowedMachineTypes = ["1", "2", "3", "4", "5"];
    if (allowedMachineTypes.includes(userInput1)) {       //überprüft ob die Eingabe in der Liste der erlaubten Maschinen ist
        alert("Diese Maschine befindet sich in unserer Produktion");
    } else {
        alert("Bitte überprüfe deine Eingabe");
    }
    document.getElementById('userInput1').value = '';  //leert das Eingabefeld
}

// Funktion um bei Klick auf den Button ein Video einzufügen
function onButtonClickVD() {
    // Videoquelle festlegen
    if (!document.getElementById('video')) {
    var videoQuelle = "c:/Hubert/Studium/WS2023/WTS/Exercise1/Abgabe1/Maschinenmotor.mp4";
    
    // Video-Element erstellen
    var video = document.createElement('video');
    video.id = 'video';
    
    // Videoquelle setzen
    video.src = videoQuelle;
    video.controls = true;      // Füge Steuerelemente für Wiedergabe hinzu
    video.autoplay = true;      // Starte Video automatisch
    content.appendChild(video);
    }   else{
            alert("Video ist bereits vorhanden - Mehr Motivation kann ich dir nicht geben!");
    }
}

// Funktion, um das aktuelle Datum zu erhalten und in das HTML-Dokument einzufügen
function setCurrentDate() {
    var currentDate = new Date();
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    var formattedDate = currentDate.toLocaleDateString('de-DE', options);

    // Das Datum in das HTML-Element mit der ID "currentDate" einfügen
    document.getElementById('currentDate').innerText = formattedDate;
}

// Die Funktion aufrufen, sobald das HTML-Dokument geladen ist
document.addEventListener('DOMContentLoaded', setCurrentDate);