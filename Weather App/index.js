const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const APIKey = 'ced188061b0e08fe69b68a542fee846e';
    const city = document.querySelector('.search-box input').value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/sunny.png';
                    image.alt = 'Clear weather';
                    break;
                case 'Rain':
                    image.src = 'images/rain.png';
                    image.alt = 'Rainy weather';
                    break;
                case 'Snow':
                    image.src = 'images/snow.png';
                    image.alt = 'Snowy weather';
                    break;
                case 'Clouds':
                    image.src = 'images/cloudy.png';
                    image.alt = 'Cloudy weather';
                    break;
                case 'Haze':
                    image.src = 'images/misty.png';
                    image.alt = 'Hazy weather';
                    break;
                default:
                    image.src = '';
                    image.alt = 'Unknown weather';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)} <span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)} km/h`;

            weatherBox.style.display = 'block';
            weatherDetails.style.display = 'flex';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
});
