import React, { useState } from "react";

const SearchValidation = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (searchInput.length >= 3 && /^[a-zA-Z0-9\s]+$/.test(searchInput)) {
      onSearch(searchInput);
    } else {
      alert(
        "INVALID INPUT.\nPlease provide a correct movie name.\nInput must be atleast 3 characters long and only numbers and numbers are allowed"
      );
    }
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <input
        type="text"
        value={searchInput}
        onChange={handleInputChange}
        placeholder="Enter a keyword to search for movies"
        className="border p-2 w-80"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded"
      >
        Search
      </button>
    </form>
  );
};

export default SearchValidation;
