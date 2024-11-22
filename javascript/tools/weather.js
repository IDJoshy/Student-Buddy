const API_KEY = "897a9818834be8879cfb0dbd29246a5c";
import {ShowError} from "./tools.js";

export function AddWeatherEvent(button)
{   
    button.addEventListener("click", async event => 
    {
        event.preventDefault();

        let value = RegEx(document.getElementById("weather-tool-input").value);
 
        if(!value[0] || !value[1])
        {
            ShowError("invalid input");
        }
    
        try
        {
            const weatherData = await GetData(value[0], value[1]);
            WeatherData(weatherData);
        }
        catch(error)
        {
            ShowError(error + " in AddWeatherEvent");
        }
    });    

}

async function GetData(city, country)
{
    const REQUEST_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`;
    const response = await fetch(REQUEST_URL);
    if(!response.ok)
    {
        ShowError(`Could not fetch data: ${response.status}`);
    }
    return await response.json();
}

function WeatherData(data)
{
  const {
    name: city,
    sys: { country },
    main: { temp, humidity }, 
    weather: [{ description, id }]
  } = data;

  let temps = ConvertUnit(temp);
  let emoji = WeatherEmoji(id);

  const WEATHER_PANEL = document.getElementById("weather-tool-panel");
  WEATHER_PANEL.innerHTML = "";

  const WEATHER_BUTTON = document.createElement("button");
  WEATHER_BUTTON.id = "weather-tool-button";
  WEATHER_BUTTON.className = "tool__button tool__button--weather";
  WEATHER_BUTTON.innerHTML = "Search";

  WEATHER_PANEL.innerHTML = `
  
    <strong class="tool__text tool__text--title">${city}, ${country}</strong>

    <div class="tool__wrapper display-flex--column">

        <p id="weather-tool-temperature" class="tool__text tool__text--weather">Temperature: ${temps[0]} °C, ${temps[1]} °F, ${temps[2]} K</p>
        <p id="weather-tool-humidity" class="tool__text tool__text--weather">Humidity: ${humidity}%</p>
        <p id="weather-tool-description" class="tool__text tool__text--weather">Description: ${description}</p>
        <p id="weather-tool-emoji" class="tool__text tool__text--emoji">${emoji}</p>

    </div>

    <input id="weather-tool-input" type="text" class="tool__input tool__input--weather" placeholder="${city}, ${country}">`
  ;

  WEATHER_PANEL.appendChild(WEATHER_BUTTON);
  AddWeatherEvent(WEATHER_BUTTON);
}

function RegEx(input)
{
    const result = input.split(/\s*,\s*/);
    result[1] = result[1].toUpperCase();
    console.log(result);
    return result;
}

export function ConvertUnit(celsius)
{
    let fahrenheit, kelvin;
    
    try
    {
        let fahrenheit_temp = (celsius * (9/5)) + 32
        let kelvin_temp = celsius + 273.15

        fahrenheit = fahrenheit_temp.toFixed(2);
        kelvin = kelvin_temp.toFixed(2);
    }
    catch(error)
    {
        ShowError(error + " in ConvertUnit");
    }

    return [celsius, fahrenheit, kelvin];

}

export function WeatherEmoji(weatherId)
{
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧";
        case (weatherId >= 600 && weatherId < 700):
            return "❄";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫";
        case (weatherId === 800):
            return "☀";
        case (weatherId >= 801 && weatherId < 810):
            return "☁";
        default:
            return "❓";
    }
}

