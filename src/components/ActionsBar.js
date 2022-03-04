import React, { useState } from "react";
import ProjectForm from "./ProjectForm";
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
      {user?.uid && <button onClick={firePopup}>Add project</button>}
    </section>
  );
};

export default ActionsBar;
