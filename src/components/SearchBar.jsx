import React, { useState } from "react";
import { MagnifyingGlass, SlidersHorizontal } from "@phosphor-icons/react";

const size = 18;

const SearchBar = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    onSearchChange(e.target.value);
  };
  return (
    <form
      role="search"
      aria-label="Search food and more"
      className="focus-within:outline-primary mx-auto flex h-[40px] w-full max-w-3xl items-center justify-between rounded-3xl bg-neutral-100 py-4 pl-6 pr-3 focus-within:outline focus-within:outline-offset-2 sm:min-w-[400px]"
    >
      <MagnifyingGlass size={size} aria-hidden="true" />
      <label htmlFor="search-input" className="sr-only">
        Search food, ingredients, users, cuisines, etc
      </label>
      <input
        id="search-input"
        type="text"
        className="w-full bg-neutral-100 pl-2 text-xxs text-neutral-700 focus:outline-none"
        placeholder="Search food, ingredients, users, cuisines, etc"
        value={searchTerm}
        onChange={handleChange}
      />
      <div className="ml-4 h-4 border border-l-[1px] border-neutral-300"></div>
      <SlidersHorizontal
        size={size}
        color="#A3A3A3"
        className="mr-2"
        aria-hidden="true"
      />
    </form>
  );
};

export default SearchBar;
