// Todo:
//  - filter projects by name
//  - sort projects? different section?

const SearchBar = ({ filterString, setFilterString }) => {
  const handleSearchInput = (e) => {
    setFilterString(e.target.value);
  };
  return (
    <>
      <label htmlFor='search-bar' className='material-icons-outlined'>
        <input
          id='search-bar'
          type='text'
          name='search-bar'
          className='search-bar'
          value={filterString}
          onChange={handleSearchInput}
        />
        search
      </label>
    </>
  );
};

export default SearchBar;
