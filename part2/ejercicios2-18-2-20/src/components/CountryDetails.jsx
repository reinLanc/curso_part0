import axios from "axios";
import { useEffect, useState } from "react";

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const api_key = import.meta.env.VITE_WEATHER_API_KEY;
  const capital = country.capital?.[0];

  useEffect(() => {
    if (capital) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`
        )
        .then((response) => {
          setWeather(response.data);
        })
        .catch((error) => {
          console.error("error fetching data", error);
          setError("Unable to fetch weather data");
        });
    }
  }, [capital, api_key]);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital?.[0]}</p>
      <p>Area: {country.area}</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages || {}).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`flag of ${country.name.common}`} />
      {weather ? (
        <div>
          <h1>Weather in {capital}</h1>
          <p>Temperature: {weather.main.temp} celsius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default CountryDetails;
