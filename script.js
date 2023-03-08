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



// Function to fetch weather data from API
async function getWeather(searchTerm) {
  try {
    
    const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${API_KEY}&units=metric`);
    const currentWeatherData = await currentWeatherResponse.json();
    const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchTerm}&appid=${API_KEY}&units=metric`);
    const forecastData = await forecastResponse.json();
    displayWeather(currentWeatherData, forecastData);
    addToSearchHistory(searchTerm);
  } catch (error) {
    console.error(error);
  }
}

// Function to display weather data
function displayWeather(currentWeatherData, forecastData) {
  // Clear previous weather data
  currentWeatherContainer.innerHTML = '';
  forecastContainer.innerHTML = '';
  
  // Create current weather element
  const currentWeather = document.createElement('div');
  currentWeather.classList.add('weather-info');
  currentWeather.innerHTML = `
    <h2>${currentWeatherData.name}, ${currentWeatherData.sys.country}</h2>
    <p>${new Date().toLocaleDateString()}</p>
    <img src="https://openweathermap.org/img/w/${currentWeatherData.weather[0].icon}.png" alt="${currentWeatherData.weather[0].description}">
    <p>Temperature: ${currentWeatherData.main.temp} &deg;C</p>
    <p>Humidity: ${currentWeatherData.main.humidity}%</p>
    <p>Wind Speed: ${currentWeatherData.wind.speed} m/s</p>
  `;
  currentWeatherContainer.appendChild(currentWeather);

  // Create forecast element
  const forecast = document.createElement('div');
  forecast.classList.add('forecast-info');
  forecast.innerHTML = '<h2>5-Day Forecast</h2>';
  const forecastDataList = forecastData.list.filter(item => item.dt_txt.includes('12:00:00'));
  forecastDataList.forEach(item => {
    const forecastItem = document.createElement('div');
    forecastItem.classList.add('forecast-item');
    forecastItem.innerHTML = `
      <p>${new Date(item.dt_txt).toLocaleDateString()}</p>
      <img src="https://openweathermap.org/img/w/${item.weather[0].icon}.png" alt="${item.weather[0].description}">
      <p>Temperature: ${item.main.temp} &deg;C</p>
      <p>Humidity: ${item.main.humidity}%</p>
      <p>Wind Speed: ${item.wind.speed} m/s</p>
    `;
    forecast.appendChild(forecastItem);
  });
  forecastContainer.appendChild(forecast);
}

// Function to add search term to search history
function addToSearchHistory(searchTerm) {
  // Check if search term already exists in search history
//   if (searchHistory 
searchHistory.push(searchTerm)
localStorage.setItem("searchHistory",JSON.stringify(searchHistory)) 
}