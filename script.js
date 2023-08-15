// Get references to HTML elements
var section_weather_search = document.getElementById('weather-search');
var section_weather_info = document.getElementById('Weather-info');
const cityName = document.getElementById('cityName');
let geolocationbtn = document.getElementById('geolocation');
const APIKEY = '';//Paste your API key here => Go to the OpenWeatherMap website and sign up for an account and grab your key.

// API URL for weather data
let url = `https://api.openweathermap.org/data/2.5/weather?q=${''}&appid=${APIKEY}&units=metric`;

// Event listener for the 'Enter' key press in the cityName input field
cityName.addEventListener('keyup', e => {
    // Check if the 'Enter' key is pressed and cityName value is not empty
    if (e.key === 'Enter' && cityName.value != '') {
        // Fetch weather data for the entered city
        fetchWeatherData(cityName.value);
    }
    // If 'Enter' key is pressed, but cityName is empty, show an alert
    if (e.key == 'Enter' && cityName.value == '') {
        alert('Please Enter a valid city name')
    }
});

// Event listener for the 'click' event on the 'search-location-btn' button
var search_location_btn = document.getElementById('search-location-btn').addEventListener('click', () => {
    // Check if the cityName input field is not empty
    if (cityName.value == '') {
        // If cityName is empty, show an alert
        alert('Please Enter a valid city name')
    } else {
        // Fetch weather data for the city entered in the cityName input field
        fetchWeatherData(cityName.value)
    }
});

// Event listener for the 'click' event on the 'back-button' button
let backbutton = document.getElementById('back-button').addEventListener('click', () => {
    // Hide weather info section and show weather search section again
    section_weather_info.classList.add('d-none')
    section_weather_search.classList.remove('d-none')
});

// Event listener for the 'click' event on the 'geolocation' button
geolocationbtn.addEventListener('click', () => {
    // Check if the browser supports geolocation
    if (navigator.geolocation) {
        // If supported, get the user's geolocation coordinates
        navigator.geolocation.getCurrentPosition((position) => {
            // Extract latitude and longitude from the geolocation data
            const { latitude, longitude } = position.coords;
            // Fetch weather data based on the retrieved latitude and longitude
            getLocationByLatLon(latitude, longitude);
        });
    } else {
        // If geolocation is not supported, show an alert
        alert("Your browser doesn't support geolocation")
    }
});

// Function to fetch weather data for a city
async function fetchWeatherData(city) {
    // Construct the API URL with the city name
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`;
    // Fetch weather data using the API URL and handle the response
    await fetch(url).then(response => response.json()).then(result => GetWeatherDetails(result));
}

// Function to fetch weather data based on latitude and longitude
async function getLocationByLatLon(lat, lon) {
    // Construct the API URL with latitude and longitude
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric`;
    // Fetch weather data using the API URL and handle the response
    await fetch(url).then(response => response.json()).then(result => GetWeatherDetails(result));
}

// Function to display weather information on the page
function GetWeatherDetails(result) {
    // Get references to HTML elements for displaying weather details
    let temperature = document.getElementById('temperature');
    let feelLike = document.getElementById('FeelsLike');
    let weatherType = document.getElementById('weather-type');
    let location = document.getElementById('location');
    let humidity = document.getElementById('Humidity');
    let img = document.getElementById('weatherimg');

    // Check if the API response contains a valid city (cod 200) or not found (cod 404)
    if (result.cod == '404') {
        // If city not found, show an alert
        alert('Enter a valid city name');
    }
    if (result.cod == '200') {
        // If city found, update the HTML elements with weather details
        temperature.innerHTML = result.main.temp;
        weatherType.innerHTML = result.weather[0].description;
        location.innerHTML = result.sys.country + ', ' + result.name;
        feelLike.innerHTML = result.main.feels_like;
        humidity.innerHTML = result.main.humidity;
        img.src = `https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`;

        // Show weather info section and hide weather search section
        section_weather_info.classList.remove('d-none');
        section_weather_search.classList.add('d-none');

       
    }
}
