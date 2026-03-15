//// APP METEO 

// Clé API OpenWeatherMap
// NOTE: Pour un projet professionnel, cette clé ne devrait pas être visible côté client.
// Elle devrait être sur un serveur backend pour des raisons de sécurité.
const API_KEY = '78a106156050a276395af614a77cd28d';

// Sélection des éléments HTML
const geolocateBtn = document.querySelector('#geolocate-btn');
const statusDiv = document.querySelector('#status');
const infoDiv = document.querySelector('#info');
const latitudeSpan = document.querySelector('#latitude');
const longitudeSpan = document.querySelector('#longitude');
const accuracySpan = document.querySelector('#accuracy');
const citySpan = document.querySelector('#city');
const temperatureSpan = document.querySelector('#temperature');
const descriptionSpan = document.querySelector('#description');
const weatherIcon = document.querySelector('#weatherIcon');
const weatherInfoDiv = document.querySelector('#weatherInfo');

// Fonction pour obtenir la géolocalisation
function getGeolocation() {
    if (navigator.geolocation) {
        statusDiv.textContent = "Recherche de votre position...";
        infoDiv.style.display = 'none';
        weatherInfoDiv.style.display = 'none';
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        statusDiv.textContent = "La géolocalisation n'est pas supportée par ce navigateur.";
    }
}

// Fonction pour afficher la position géographique
function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const accuracy = position.coords.accuracy;
    statusDiv.textContent = ""; // Efface le message de statut

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
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${API_KEY}`;
    
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
            statusDiv.textContent = "Impossible de récupérer les données météo. Vérifiez votre connexion ou la clé API.";
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

    statusDiv.textContent = errorMessage;
}

// Écouteur d'événement pour le bouton
geolocateBtn.addEventListener('click', getGeolocation);
