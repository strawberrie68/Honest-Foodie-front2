import {MagnifyingGlass, SlidersHorizontal} from "@phosphor-icons/react";

const SearchBar = () => {
  return (
    <div className="bg-neutral-100 w-3/4 h-[40px] rounded-3xl pl-6  pr-3 flex items-center justify-between	min-w-[200px] py-4">
      <MagnifyingGlass size={18} />
      <input
        type="text"
        className="bg-neutral-100 text-primary-gray-300 text-xxs pl-2 w-3/4 "
        placeholder="Search Food, ingredients, users, cuisines, etc"
      ></input>
      <div className="border border-l-[1px] border-neutral-300	h-4 ml-4"></div>
      <SlidersHorizontal size={18} color="#A3A3A3" className="mr-2" />
    </div>
  );
};

export default SearchBar;
