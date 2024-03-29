import {
  MagnifyingGlass,
  SlidersHorizontal,
  Plus,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";
const iconSize = 18;
const iconColor = "#A3A3A3";

const SearchBar = () => {
  return (
    <div className="flex w-full gap-2">
      <div className="bg-neutral-100 w-full max-w-lg h-[40px] rounded-2xl pl-6 pr-3 flex items-center justify-between py-4 md:w-[350px]">
        <MagnifyingGlass size={iconSize} />
        <input
          type="text"
          className="bg-neutral-100 text-primary-gray-300 text-xxs pl-2 w-3/4"
          placeholder="Search Food, ingredients, users, cuisines, etc"
        ></input>
        <div className="border border-l-[1px] border-neutral-300 h-4 ml-4"></div>
        <SlidersHorizontal size={iconSize} color={iconColor} className="mr-2" />
      </div>
      <Link to="/add/recipe">
        <div className="flex bg-neutral-100 w-14  h-[40px] rounded-2xl items-center px-2 justify-center hover:gap-4 hover:scale-110 transition-all duration-200  hover:shadow-lg">
          <Plus size={iconSize} color={iconColor} />
        </div>
      </Link>
    </div>
  );
};

export default SearchBar;
