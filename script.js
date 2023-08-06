var section_weather_search = document.getElementById('weather-search');
var section_weather_info = document.getElementById('Weather-info');
const cityName = document.getElementById('cityName');


var search_location_btn = document.getElementById('search-location-btn').addEventListener('click', () => {
    section_weather_info.classList.remove('d-none')
    section_weather_search.classList.add('d-none')
});


let backbutton = document.getElementById('back-button').addEventListener('click', () => {
    section_weather_info.classList.add('d-none')
    section_weather_search.classList.remove('d-none')
});