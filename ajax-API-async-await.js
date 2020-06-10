const woeidCalifornia = 2487956;
const woeidLondon = 44418;

async function getWeather(woeid) {
  const rawData = await fetch(
    `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`
  )
  const weatherData = await rawData.json();
  const locationType = weatherData.parent.location_type;
  const location = weatherData.parent.title;
  const weather = weatherData.consolidated_weather[0].weather_state_name;
  const minTemp = Math.floor(weatherData.consolidated_weather[0].min_temp);
  const maxTemp = Math.floor(weatherData.consolidated_weather[0].max_temp);

  console.log(`Good morning beautiful ${locationType} of ${location}! Today you can expect ${weather} weather with the temperature ranging from ${minTemp}°C to ${maxTemp}°C.`);
  };

getWeather(woeidCalifornia);