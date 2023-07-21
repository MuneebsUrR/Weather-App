const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '58ce39cc1amsha4354a3355d61d5p15a347jsn0f6c11dcc7da',
        'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
};

var cityName = document.getElementById('cityName');

function getWeather(city){


fetch(url + cityName.value, options)
    .then(response => response.json())
    .then(response => {
        console.log(response);
       // cloud_pct = response.cloud_pct;
        document.getElementById('temp').innerHTML = response.temp;
        // feels_like = response.feels_like;
        // humidity = response.humidity;
        // min_temp = response.min_temp;
        // max_temp = response.max_temp;
        // wind_speed = response.wind_speed;
        // wind_degrees = response.wind_degrees;
        // sunrise = response.sunrise;
        // sunset = response.sunset;
    })
    .catch(err => console.error(err));

}

submitButton.addEventListener('click', ()=>{
    if (cityName === '') return alert("Please enter a valid City Name");
    else{
        getWeather(cityName);
    }
})
