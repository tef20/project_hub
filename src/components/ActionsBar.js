// Todo:
//  - searchbar
//  - sort projects
//  - add new project

import SearchBar from "./Searchbar";

const ActionsBar = ({filterString, setFilterString}) => {
  return (
    <section className='actions-bar'>
      <SearchBar filterString={filterString} setFilterString={setFilterString} />
      <select name='filters' id='filters'>
        <option value='name'>Name</option>
        <option value='date'>Date</option>
      </select>
      {/* add */}
    </section>
  );
};

export default ActionsBar;
