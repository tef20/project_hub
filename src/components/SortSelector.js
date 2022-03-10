import React from "react";

export default function SortSelector({ sortField, setSortField }) {
  return (
    <>
      <label htmlFor='filters' className="material-icons-outlined">
        <select
          name='filters'
          className="sort-selector"
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value='name'>Name</option>
          <option value='author'>Author</option>
          <option value='createdAt'>Date</option>
          <option value='likes'>Likes</option>
        </select>
        sort
      </label>
    </>
  );
}
