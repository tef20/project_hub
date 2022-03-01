// Todo:
//  - searchbar
//  - sort projects
//  - add new project

import SearchBar from "./Searchbar";
import SortSelector from "./SortSelector";

const ActionsBar = ({
  filterString,
  setFilterString,
  sortField,
  setSortField,
}) => {
  return (
    <section className='actions-bar'>
      <SearchBar
        filterString={filterString}
        setFilterString={setFilterString}
      />
      <SortSelector sortField={sortField} setSortField={setSortField} />
      {/* add */}
    </section>
  );
};

export default ActionsBar;
