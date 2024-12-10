const CountryList = ({ countries, onSelect }) => {
  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name.common}>
          {country.name.common}
          <button onClick={() => onSelect(country)}>Show</button>
        </li>
      ))}
    </ul>
  );
};

export default CountryList;
