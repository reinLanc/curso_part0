const CountryList = ({ countries, onSelect }) => {
  return (
    <ul>
      {countries.map((country) => (
        <li
          key={country.name.common}
          onClick={() => onSelect(country)}
        >
          {country.name.common}
        </li>
      ))}
    </ul>
  );
};

export default CountryList;
