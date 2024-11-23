const API_KEY = `7abde5ec31326a28576fced7684b04af`;

const search_btn = document.querySelector("#search-btn");
const weather_description = document.querySelector("#weather-decription");
const temperature_header = document.querySelector("#weather-temperature-header");
const date_description_one = document.querySelector("#date-1");
const date_description_two = document.querySelector("#date-2");
const city_name = document.querySelector("#searched-city");
const city_name_two = document.querySelector("#city-name-2");
const weather_img = document.querySelector("#weather-image");
const wind = document.querySelector("#wind");
const wind_direction = document.querySelector("#wind-direction");
const humadity = document.querySelector("#humadity");
const real_feel = document.querySelector("#real-feel");
const pressure = document.querySelector("#pressure");
const sea_level = document.querySelector("#sea-level");
const max_temp = document.querySelector("#max-temp");
const min_temp = document.querySelector("#min-temp");


const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const date = new Date();
const time = (date.getHours()>12) ? "PM" : "AM";
date_description_one.innerText = date.getDay()+"-"+months[date.getMonth()-1]+"-"+date.getFullYear();
date_description_two.innerText = days[date.getDay()-1]+","+date.getHours()+"."+date.getMinutes()+time;



search_btn.addEventListener("click",()=>{
    const data = document.querySelector("#input-information").value;
    city_name.innerText = data;
    city_name_two.innerText = data;
    async function getWeather(){
        try{
            const fetch_data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${data}&appid=${API_KEY}`);
            const json_data = await fetch_data.json();
            weather_description.innerText = json_data.weather[0].description;
            temperature_header.innerText = Math.floor(json_data.main.temp-273)+"°C";
            if(json_data.weather[0].main == "Clouds"){
                weather_img.src = "images/clouds.png";
            }
            else if(json_data.weather[0].main == "Clear"){
                weather_img.src = "images/clear.png";
            }
            else if(json_data.weather[0].main == "Rain"){
                weather_img.src = "images/rain.png";
            }
            else if(json_data.weather[0].main == "Drizzle"){
                weather_img.src = "images/drizzle.png";
            }
            else if(json_data.weather[0].main == "Mist"){
                weather_img.src = "images/mist.png";
            }
            wind.innerText = Math.floor(json_data.wind.speed)+" km/h";
            if(json_data.wind.deg>0 && json_data.wind.deg<90){
                wind_direction.innerText = "North East";
            }
            else if(json_data.wind.deg>90 && json_data.wind.deg<180){
                wind_direction.innerText = "South East";
            }
            else if(json_data.wind.deg>180 && json_data.wind.deg<270){
                wind_direction.innerText = "South West";
            }
            else if(json_data.wind.deg>270 && json_data.wind.deg<360){
                wind_direction.innerText = "North West";
            }
            else if(json_data.wind.deg==0 || json_data.wind.deg==360){
                wind_direction.innerText = "North";
            }
            else if(json_data.wind.deg==90){
                wind_direction.innerText = "East";
            }
            else if(json_data.wind.deg==180){
                wind_direction.innerText = "South";
            }
            else if(json_data.wind.deg==270){
                wind_direction.innerText = "West";
            }
            humadity.innerText = json_data.main.humidity+"%";
            real_feel.innerText = Math.floor(json_data.main.temp-273)+"°C";
            pressure.innerText = json_data.main.pressure+"mb";
            sea_level.innerText = json_data.main.sea_level+"m";
            max_temp.innerText = Math.floor(json_data.main.temp_max-273)+"°C"
            min_temp.innerText = Math.floor(json_data.main.temp_min-273)+"°C";
        }
        catch(err){
            console.log(err);
        }
    }
    getWeather();
})
