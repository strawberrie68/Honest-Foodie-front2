import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MagnifyingGlass,
  SlidersHorizontal,
  Plus,
} from "@phosphor-icons/react";

import { categoriesIcon } from "../../../shared/categoriesIcon";
import NavBar from "../../../components/NavBar/NavBar";
import CategoryCard from "../../../components/CategoryCard";
import ProfilePost from "../../../components/TypesOfRecipeCards/ProfilePost";

// Constants
const ICON_SIZE = 18;
const ICON_BG_COLOR = "#A7A7A7";
const INACTIVE_COLOR = "#F0F0F0";
const ACTIVE_COLOR = "#9aaac2";

const MyRecipe = () => {
  const [plusIconColor, setPlusIconColor] = useState(INACTIVE_COLOR);

  const user = useSelector((state) => state.auth.user);
  const recipes = useSelector((state) => state.auth.user?.recipes);
  console.log(recipes);
  console.log(user);

  return (
    <div className="flex">
      <NavBar />
      <div className="m-auto  mt-10 flex h-full w-3/4 flex-col p-4">
        <div className="flex w-full flex-col justify-start">
          <div className="flex flex-col items-center justify-between xs:flex-row">
            <h1 className="mt-6 text-start text-xl font-bold">My recipes</h1>
            <div className="mt-4 flex h-10 w-[250px] items-center justify-between rounded-3xl bg-primary-gray-100 px-4">
              <div className="flex gap-4">
                <MagnifyingGlass size={ICON_SIZE} />
                <div className="text-xxs text-primary-gray-200">Search</div>
              </div>
              <div className="flex gap-2">
                <div className="border-px h-4 w-0 border-l border-primary-gray-200"></div>
                <SlidersHorizontal size={ICON_SIZE} color={ICON_BG_COLOR} />
              </div>
            </div>
          </div>
          <div className="fade-right mt-8 flex justify-start gap-1 overflow-x-scroll">
            {categoriesIcon.map((category) => (
              <CategoryCard
                key={category.id}
                icon={category.icon}
                name={category.name}
              />
            ))}
          </div>
        </div>

        <div className="my-recipes-container mt-4">
          {user && recipes?.length > 0 ? (
            <div>
              {recipes?.map((recipe) => {
                return (
                  <div>
                    <ProfilePost post={recipe} />
                  </div>
                );
              })}
            </div>
          ) : (
            <Link to="/add/recipe">
              <div
                className="before:ease border-grey-500 bg-grey-500 hover:shadow-grey-500 relative mt-4 flex h-[500px] w-full transform flex-col items-center justify-center overflow-hidden rounded-lg border border-dashed px-4 pt-4 shadow-2xl transition-all duration-500  ease-in-out before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:scale-105 hover:shadow-lg hover:before:-translate-x-40"
                onMouseEnter={() => setPlusIconColor(ACTIVE_COLOR)}
                onMouseLeave={() => setPlusIconColor(INACTIVE_COLOR)}
              >
                <p className="text-lg font-medium tracking-wide">
                  No recipes yet
                </p>
                <p className="mt-1 text-xxs text-gray-500 ">Let's add some!</p>
                <Plus className="mt-8" size={80} color={plusIconColor} />
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default MyRecipe;
