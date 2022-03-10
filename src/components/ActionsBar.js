import React from "react";
import SearchBar from "./Searchbar";
import SortSelector from "./SortSelector";

const ActionsBar = ({
  user,
  filterString,
  setFilterString,
  sortField,
  setSortField,
  firePopup,
}) => {
  return (
    <section className='actions-bar'>
      <SearchBar
        filterString={filterString}
        setFilterString={setFilterString}
      />
      <SortSelector sortField={sortField} setSortField={setSortField} />
      {user?.uid && (
        <button
          onClick={firePopup}
          className='new-project-button material-icons-outlined'
        >
          add
        </button>
      )}
    </section>
  );
};

export default ActionsBar;
