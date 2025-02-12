//// APP METEO 

// let et lng ici juste pour l'exemple
let lat = 48.848660863167254 
let lng = 2.3875675502735265
let aPIKey = "78a106156050a276395af614a77cd28d"

let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${"78a106156050a276395af614a77cd28d"}&units=metric`


// Vous allez réaliser une application de type Météo

// Première requete de test
fetch(url)
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.log(err))

// OBJECTIFS :

// 1) Vous allez faire une première version de l'app ou l'on peut se géolocaliser en cliquant sur un bouton 
// 2) Afin de se géolocaliser vous allez utiliser la fonction geolocate (https://www.w3schools.com/html/html5_geolocation.asp)
// 3) Quand on clique sur le bouton vous devez récupérer latitude et longitude de votre position et inclure ces infos 
// dans le lien de la requete
// 4) On va vouloir afficher une image du temps qu'il fait via des icones prévues (https://openweathermap.org/weather-conditions)
// 5) On voudra afficher également l atempérature en degrés, la ville et le pays

// ETAPES A SUIVRE : 
// Coder les éléments HTML (le bouton geolocate, les div - ou autre - destinés à recevoir les infos depuis le JS)
// Dans le JS on récupère ces éléments (querySelector tout ca), on écoute le bouton Geolocate qui lors du click
// viendra déclencher la fonction de geolocalisation (cf le lien plus haut) et la requete API avec les bonnes lat et lng
// Enfin vous afficherez les éléments pertinents que vous recevez de l'API dans le HTML (depuis le JS)
// Pourquoi pas styliser le tout eà la fin
 // Sélection des éléments HTML
// Sélection des éléments HTML
const geolocateBtn = document.querySelector('#geolocate-btn');
const infoDiv = document.querySelector('#info');
const latitudeSpan = document.querySelector('#latitude');
const longitudeSpan = document.querySelector('#longitude');
const accuracySpan = document.querySelector('#accuracy');
const citySpan = document.querySelector('#city');
const temperatureSpan = document.querySelector('#temperature');
const descriptionSpan = document.querySelector('#description');
const weatherIcon = document.querySelector('#weatherIcon');
const weatherInfoDiv = document.querySelector('#weatherInfo');

// Remplace 'VOTRE_API_KEY' par ta clé API OpenWeatherMap
const apiKey = '78a106156050a276395af614a77cd28d';  // Mets ici ta clé API valide

// Fonction pour obtenir la géolocalisation
function getGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("La géolocalisation n'est pas supportée par ce navigateur.");
    }
}

// Fonction pour afficher la position géographique
function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const accuracy = position.coords.accuracy;

    // Mettre à jour les éléments HTML avec les informations de la géolocalisation
    latitudeSpan.textContent = latitude;
    longitudeSpan.textContent = longitude;
    accuracySpan.textContent = accuracy;

    // Afficher immédiatement la div des informations de géolocalisation
    infoDiv.style.display = 'block'; // Afficher la section avec les infos de géolocalisation

    // Appeler la fonction pour récupérer la météo avec la géolocalisation actuelle
    getWeatherFromApi(latitude, longitude);
}

// Fonction pour récupérer les données météo via l'API OpenWeatherMap
function getWeatherFromApi(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${'78a106156050a276395af614a77cd28d'}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Affichage des informations météo dans la page
            citySpan.textContent = `${data.name}, ${data.sys.country}`;
            temperatureSpan.textContent = `${data.main.temp} °C`;
            descriptionSpan.textContent = data.weather[0].description;

            // Construction de l'URL de l'icône météo
            const iconCode = data.weather[0].icon;
            weatherIcon.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
            weatherIcon.alt = data.weather[0].description;

            // Afficher la div avec les informations météo
            weatherInfoDiv.style.display = 'block';
        })
        .catch(error => {
            console.error('Erreur:', error);
            alert("Impossible de récupérer les données météo.");
        });
}

// Fonction pour gérer les erreurs de géolocalisation
function showError(error) {
    let errorMessage = "Erreur de géolocalisation : ";

    switch (error.code) {
        case error.PERMISSION_DENIED:
            errorMessage += "L'utilisateur a refusé la demande de géolocalisation.";
            break;
        case error.POSITION_UNAVAILABLE:
            errorMessage += "Les informations de position sont indisponibles.";
            break;
        case error.TIMEOUT:
            errorMessage += "La demande de géolocalisation a expiré.";
            break;
        case error.UNKNOWN_ERROR:
            errorMessage += "Une erreur inconnue est survenue.";
            break;
    }

    alert(errorMessage);
}
geolocateBtn.addEventListener('click', getGeolocation);

