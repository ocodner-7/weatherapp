const api = {
    key: "f4d8617eed412c2b1056f73246a5b822",
    baseurl: "https://api.openweathermap.org/data/2.5/"
}


const searchbar = document.querySelector('.search-bar');  
searchbar.addEventListener('keypress', setQuery)

function setQuery(evnt) {
    if (evnt.keyCode === 13) {
        getResults(searchbar.value);
        console.log(searchbar.value)
    }
}

// Gathers results and displays them on the page
function getResults(query) {
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`) 
    .then(weather => {
        return weather.json();
    }).then(displayResults);

}


function displayResults (weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .current-temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerHTML = weather.weather[0].main;

    let hi_low = document.querySelector('.hi-low');
    hi_low.innerText = `Hi: ${Math.round(weather.main.temp_max)}°c Lo: ${Math.round(weather.main.temp_min)}°c`
}


// displays the da
function dateBuilder (d) {
     let months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; 

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}
