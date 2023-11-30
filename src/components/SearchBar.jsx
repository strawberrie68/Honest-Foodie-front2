import { MagnifyingGlass, SlidersHorizontal } from "@phosphor-icons/react";

const size = 18;

const SearchBar = () => {
  return (
    <div className="flex h-[40px] w-3/4 min-w-[200px] items-center  justify-between rounded-3xl bg-neutral-100 py-4	pl-6 pr-3">
      <MagnifyingGlass size={size} />
      <input
        type="text"
        className="w-3/4 bg-neutral-100 pl-2 text-xxs text-primary-gray-300 "
        placeholder="Search food, ingredients, users, cuisines, etc"
      ></input>
      <div className="ml-4 h-4 border	border-l-[1px] border-neutral-300"></div>
      <SlidersHorizontal size={size} color="#A3A3A3" className="mr-2" />
    </div>
  );
};

export default SearchBar;
