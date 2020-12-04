window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./sw.js')
             .then(function() { console.log('Service Worker Registered'); });
  }

function notifyMe() {
  // Sprawdzamy czy przeglądarka obsługuje powiadomienia.
  if (!("Notification" in window)) {
    alert("Ta przeglądarka nie obsługuje powiadomień");
  }

  // Sprawdźmy czy uprawnienia dla powiadomienia zostały nadane
  else if (Notification.permission === "granted") {
    // jeżeli są tworzymy powiadomienie
    var notification = new Notification("Hi there!");
  }

  // W innym przypadku tworzymy zapytanie o uprawnienia
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      //Jeżeli użytkownik zaakceptuje tworzymy powiadomienie
      if (permission === "granted") {
        var notification = new Notification("Hi there!");
      }
    });
  }

  // Na koniec, jeżeli użytkownik odmówił powiadomień i chcesz szanować go
  // nie ma potrzeby dręczyć go zapytaniami
}

// Code to handle install prompt on desktop

let deferredPrompt;
const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = 'block';

  addBtn.addEventListener('click', (e) => {
    // hide our user interface that shows our A2HS button
    addBtn.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
  });
});

}
