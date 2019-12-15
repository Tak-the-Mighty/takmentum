const weather = document.querySelector(".js-weather");

const API_KEY = "fbd983ea0c79b5dc93501e91948237c4";
const COORDS = "coords";

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      const temperature = json.main.temp;
      const place = json.name;
      const span = document.createElement("span");
      const region = document.createElement("span");

      span.classList.add("degree");
      region.classList.add("region");

      span.innerText = `${temperature} °C`;
      region.innerText = `${place}`;
      weather.appendChild(span);
      weather.appendChild(region);
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordObj = {
    latitude,
    longitude
  };
  saveCoords(coordObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Can't Access GeoLocation");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
