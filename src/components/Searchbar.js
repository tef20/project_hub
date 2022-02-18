// Todo: 
//  - filter projects by name
//  - sort projects? different section?

const SearchBar = () => {
  return (
    <div>
      <input type="text" name='search-bar' className="search-bar"/>
      <button onClick={() => console.log('search')}>🔍</button>
    </div>
  )
}

export default SearchBar;