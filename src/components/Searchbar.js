// Todo:
//  - filter projects by name
//  - sort projects? different section?

const SearchBar = ({ filterString, setFilterString }) => {
  const handleSearchInput = (e) => {
    // console.log(e.target.value);
    setFilterString(e.target.value);
  };
  return (
    <div>
      <input
        type='text'
        name='search-bar'
        className='search-bar'
        value={filterString}
        onChange={handleSearchInput}
      />
    </div>
  );
};

export default SearchBar;
