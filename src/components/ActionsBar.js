// Todo:
//  - searchbar
//  - sort projects
//  - add new project

import AddProjectButton from "./AddProjectButton";
import SearchBar from "./Searchbar";
import SortSelector from "./SortSelector";

const ActionsBar = ({
  user,
  filterString,
  setFilterString,
  sortField,
  setSortField,
}) => {
  const handleAddNewProject = () => {
    console.log("add new project");
  };
  return (
    <section className='actions-bar'>
      <SearchBar
        filterString={filterString}
        setFilterString={setFilterString}
      />
      <SortSelector sortField={sortField} setSortField={setSortField} />
      {/* todo: conditional on user signed in */}
      {<AddProjectButton handleAddNewProject={handleAddNewProject} />}
    </section>
  );
};

export default ActionsBar;
