import { MagnifyingGlass, SlidersHorizontal } from "@phosphor-icons/react";

const size = 18;

const SearchBar = () => {
  return (
    <div className="focus-within:outline-primary mx-auto flex h-[40px] w-full items-center justify-between rounded-3xl bg-neutral-100 py-4 pl-6 pr-3 focus-within:outline focus-within:outline-offset-2  sm:min-w-[400px]">
      <MagnifyingGlass size={size} />
      <input
        type="text"
        className="w-full bg-neutral-100 pl-2 text-xxs text-primary-gray-300 focus:outline-none"
        placeholder="Search food, ingredients, users, cuisines, etc"
      />
      <div className="ml-4 h-4 border border-l-[1px] border-neutral-300"></div>
      <SlidersHorizontal size={size} color="#A3A3A3" className="mr-2" />
    </div>
  );
};

export default SearchBar;
