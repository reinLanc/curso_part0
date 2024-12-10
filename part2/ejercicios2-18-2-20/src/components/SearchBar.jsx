const SearchBar = ({ query, setQuery }) => {
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      Search for a country: <input value={query} onChange={handleChange} />
    </form>
  );
};

export default SearchBar;
