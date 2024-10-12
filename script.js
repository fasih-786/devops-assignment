document.getElementById('weather-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form from reloading the page

    const city = document.getElementById('city-input').value;
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    fetch(`/weather?city=${city}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                displayError(data.error);
            } else {
                displayWeather(data);
            }
        })
        .catch(err => {
            displayError("Error fetching weather data.");
        });
});

function displayWeather(data) {
    document.getElementById('city-name').textContent = data.city;
    document.getElementById('country').textContent = data.country;
    document.getElementById('temperature').textContent = data.temperature;
    document.getElementById('description').textContent = data.description;
    document.getElementById('humidity').textContent = data.humidity;
    document.getElementById('wind-speed').textContent = data.wind_speed;
    document.getElementById('timestamp').textContent = data.timestamp;

    // Display weather icon
    const iconUrl = `http://openweathermap.org/img/wn/${data.icon}@2x.png`;
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.src = iconUrl;
    weatherIcon.classList.remove('hidden');

    document.getElementById('weather-info').classList.remove('hidden');
    document.getElementById('error-message').classList.add('hidden');
}

function displayError(message) {
    document.getElementById('error-message').textContent = message;
    document.getElementById('error-message').classList.remove('hidden');
    document.getElementById('weather-info').classList.add('hidden');
}
