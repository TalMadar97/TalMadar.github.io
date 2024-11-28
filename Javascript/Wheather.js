const API_KEY = "0acd26e6f7d3098235d4fa124634bba6";
const URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric&q=`;
const query = document.getElementById("inputCity");
const city = document.getElementById("city");
const button = document.querySelector("button");
const description = document.getElementById("description");
const temp = document.getElementById("temp");
const img = document.querySelector("img");
const errorMessage = document.getElementById("errorMessage");

async function getWeather(city) {
    try {
        const response = await fetch(URL + city); // 1.5 s respone = undefind
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error(error);
    }
}

function displayWeather(weatherData) {
    if (weatherData.cod === 200) {
        errorMessage.innerText = "";
        city.innerText = query.value;
        description.innerText = weatherData.weather[0].description;
        temp.innerText = weatherData.main.temp;
        img.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

        document.getElementById('weatherInfo').classList.add('show');

    } else {
        errorMessage.innerText = "city not found...";
        city.innerText = "";
        description.innerText = "";
        temp.innerText = "";
        img.src = "";


        document.getElementById('weatherInfo').classList.remove('show');
    }

}

button.addEventListener("click", () => {
    getWeather(query.value);
});
