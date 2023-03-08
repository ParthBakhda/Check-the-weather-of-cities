// API key for OpenWeatherMap API
const API_KEY = 'b3138807eb6a49fbc3b62b0caac6601e';

// Select DOM elements
const form = document.querySelector('#search-form');
const input = document.querySelector('#city-name');
const currentWeatherContainer = document.querySelector('#weather-info');
const forecastContainer = document.querySelector('#forecast-info');
const searchHistoryContainer = document.querySelector('#search-history');

// Load search history from local storage
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

// Add event listener to form submit
form.addEventListener('submit', event => {
  event.preventDefault();
  const searchTerm = input.value.trim();
  if (!searchTerm) return;
  getWeather(searchTerm);
});
function clickhistory(event){
console.log(event.target.innerHTML)
getWeather(event.target.innerHTML)
}
// Display search history
displaySearchHistory();
function displaySearchHistory() {
    for (let i = 0; i < searchHistory.length; i++) {
        var Weatherbutton = document.createElement("BUTTON");
        Weatherbutton.innerHTML = searchHistory[i] 
        Weatherbutton.onclick= function(){
            clickhistory(event)
        }
        searchHistoryContainer.appendChild(Weatherbutton)
    }
}