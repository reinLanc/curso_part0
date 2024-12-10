import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import CountryList from "./components/CountryList";
import CountryDetails from "./components/CountryDetails";

const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (query) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then((response) => {
          const filtered = response.data.filter((country) =>
            country.name.common.toLowerCase().includes(query.toLowerCase())
          );

          if (filtered.length > 10) {
            setError("Too many matches, specify another filter");
            setCountries([]);
            setSelectedCountry(null);
          } else if (filtered.length === 1) {
            setError("");
            setSelectedCountry(filtered[0]);
            setCountries([]);
          } else {
            setError("");
            setSelectedCountry(null);
            setCountries(filtered);
          }
        })
        .catch((error) => {
          console.error("Error fetching countries:", error);
          setError("Error fetching data");
        });
    } else {
      setCountries([]);
      setSelectedCountry(null);
      setError("");
    }
  }, [query]);

  return (
    <div>
      <SearchBar query={query} setQuery={setQuery} />
      {error && <p>{error}</p>}
      {countries.length > 0 && !selectedCountry && (
        <CountryList countries={countries} onSelect={setSelectedCountry} />
      )}
      {selectedCountry && <CountryDetails country={selectedCountry} />}
    </div>
  );
};

export default App;
