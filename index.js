

const apiKey = 'dbf30cd26bd5d20808c817d9451e1acd'; 
const url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q='


const inputField = document.getElementById('search');
const searchIcon = document.getElementById('search-icon');


inputField.addEventListener("keypress", function (event) {
  
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("search-icon").click();
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const date = document.getElementById('date');
    const time = document.getElementById('time');
    const greetText = document.getElementById('greetText');


    console.log(new Date());
    const d = new Date();
    const dates = d.getDate();
    console.log(dates);
    const month = d.getMonth() + 1;
    console.log(month);
    const year = d.getFullYear();
    console.log(year);

    let hours = d.getHours();
    console.log(hours);
    const minutes = d.getMinutes();
    console.log(minutes);
    const seconds = d.getSeconds();
    console.log(seconds);

    const currentTime = hours + ":" + minutes + ":" + seconds;
    console.log(currentTime);

    const todaysDate = dates + "." + month + "." + year;
    console.log(todaysDate);
    date.innerHTML = todaysDate;

    time.innerHTML = currentTime;

    if (hours >= 0 && hours < 12) {
        greetText.innerText = 'Good Morning!';
    } else if (hours >= 12 && hours < 17) {
        greetText.innerText = 'Good Afternoon!';
    } else if (hours >= 17 && hours <= 24) {
        greetText.innerText = 'Good Evening!';
    }


})

searchIcon.addEventListener('click', function () {
    const city = inputField.value;
    if (city == '') {
        document.getElementById('error').style.display = 'block';
      
        setTimeout(function () {
            document.getElementById('error').style.display = 'none';
        }, 3000);
        return;
    }
    checkWeatherCity(city);
})

async function checkWeatherCity(city) {
    hourlyUpdate(city);
    const response = await fetch(url + city + "&appid=" + apiKey);
    console.log(response);
    response.json()
        .then(data => {
            console.log(data);

            if (data.cod == 404) {
                document.getElementById('error').style.display = 'block';
               
                setTimeout(function () {
                    document.getElementById('error').style.display = 'none';
                }, 6000);
                return;
            }


            const icon = document.getElementsByClassName('icon')[0];

            icon.removeChild(icon.firstElementChild);
            var i = document.createElement('i');

            if (data.weather[0].main == 'Clouds') {
                i.classList.add('fa-brands', 'fa-cloudflare');
            }
            else if (data.weather[0].main == 'Clear') {
                i.classList.add('fa-solid', 'fa-cloud-sun');
            }
            else if (data.weather[0].main == 'Rain') {
                i.classList.add('fa-solid', 'fa-cloud-moon-rain');
            }
            else if (data.weather[0].main == 'Thunderstorm ') {
                i.classList.add('fa-solid', 'fa-cloud-bolt');
            }
            else if (data.weather[0].main == 'Drizzle') {
                i.classList.add('fa-solid', 'fa-cloud-rain');
            }
            else if (data.weather[0].main == 'Snow') {
                i.classList.add('fa-solid', 'fa-snowflake');
            }
            else if (data.weather[0].main == 'Atmosphere') {
                i.classList.add('fa-solid', 'fa-cloud');
            }
            else if (data.weather[0].main == 'Mist') {
                i.classList.add('fa-solid', 'fa-tornado');
            }
            else if (data.weather[0].main == 'Sun') {
                i.classList.add('fa-solid', 'fa-sun');
            }
            i.style.fontSize = '140px';
            icon.appendChild(i);

            console.log(data.weather[0].main);
            document.getElementById('temp').innerHTML = Math.round(data.main.temp) + "°C";
            document.getElementById('message').innerHTML = data.weather[0].description;
            document.getElementById('wind').innerHTML = data.wind.speed + " km/h";
            document.getElementById('humidity').innerHTML = data.main.humidity + "%";
            document.getElementById('rain').innerHTML = data.clouds.all + "%";
        });
}



const url2 = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&q='

async function hourlyUpdate(city) {
    const response = await fetch(url2 + city + "&appid=" + apiKey);
    console.log(response);
    const temp_hour = document.getElementsByClassName('temp_hour');
    const weathertypeHour = document.getElementsByClassName('weathertype_hour');
  
    const timeHour = document.getElementsByClassName('time_hour');

    response.json()
        .then(data => {
            console.log(data);
            for (let i = 0; i < 8; i++) {

            
                console.log(data.list[i].weather[0].main + " " + data.list[i].main.temp + " " + data.list[i].dt_txt);
                
                const date = data.list[i].dt_txt;

                const d = new Date(date);

                const hours = d.getHours();
                console.log(hours);
                timeHour[i].innerHTML = hours + ":00";
                temp_hour[i].innerHTML = Math.round(data.list[i].main.temp) + "°C";
                weathertypeHour[i].innerHTML = data.list[i].weather[0].main; 

            }
        });

}


function nextFiveDays() {
    const weekname = document.getElementsByClassName('weekname');
    let now = new Date();
    let days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const currentIndex = now.getDay();
    let dayString = days[now.getDay()];
    
    var n = 6;
    for (let i = 0; i < n; i++) {
        console.log(days[(currentIndex + i + 1) % 7]);
        weekname[i].innerHTML = days[(currentIndex + i) % 7];
    }

}

function nextfiveDate() {
    let dates = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
    const d = new Date();
    const date = d.getDate(); 
    var arr = [];
    for (let i = 0; i < 5; i++) {
        arr.push(dates[(date + i) % 31]);
        console.log(dates[(date + i) % 31]);
    }
    return arr;
}

function nextfiveDate30() {
    let dates = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];
    const d = new Date();
    
    const date = d.getDate(); 
    var arr = [];
    for (let i = 0; i < 5; i++) {
        arr.push(dates[(date + i) % 30]);
        console.log(dates[(date + i) % 30]);
    }
    return arr;
}

async function fiveDaysForecast(city) {
    const response = await fetch(url2 + city + "&appid=" + apiKey);
    response.json()
        .then(data => {
            console.log(data);

            const d = new Date();
           
            const months = d.getMonth() + 1;
            if (months == 1 || months == 3 || months == 5 || months == 7 || months == 8 || months == 10 || months == 12) {
                console.log("31 days");
                console.log(nextfiveDate());
            }
            else {
                console.log("30 days");
                console.log(nextfiveDate30());
            }
            const dates = d.getDate();
            console.log(dates + 1);
           
        });
}

fiveDaysForecast('kanpur');

nextFiveDays();

let date = new Date();
let curr_date = date.getDate();
j = 1;
const tempdays = document.getElementsByClassName('tempdays') ; 
for(let i = 0; i<40; i++) {
    if(list[i].dt_txt == curr_date + j){
        tempdays[j].innerHTML = list[i].main.temp;
        j++
    }
}