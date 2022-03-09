import React from "react";

export default function SortSelector({ sortField, setSortField }) {
  return (
    <>
      <label htmlFor='filters'>Sort by: </label>
      <select
        name='filters'
        id='filters'
        value={sortField}
        onChange={(e) => setSortField(e.target.value)}
      >
        <option value='name'>Name</option>
        <option value='author'>Author</option>
        <option value='createdAt'>Date</option>
        <option value='likes'>Likes</option>
      </select>
    </>
  );
}
