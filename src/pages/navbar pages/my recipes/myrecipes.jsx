import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "@phosphor-icons/react";

import { categoriesIcon } from "../../../shared/categoriesIcon";
import NavBar from "../../../components/NavBar/NavBar";
import CategoryCard from "../../../components/CategoryCard";
import ProfilePost from "../../../components/TypesOfRecipeCards/ProfilePost";
import SearchBar from "../../../components/SearchBar";

const INACTIVE_COLOR = "#F0F0F0";
const ACTIVE_COLOR = "#9aaac2";

const MyRecipe = () => {
  const [plusIconColor, setPlusIconColor] = useState(INACTIVE_COLOR);

  const user = useSelector((state) => state.auth.user);
  const recipes = useSelector((state) => state.auth.user?.recipes);

  return (
    <div className="flex flex-col xs:flex-row h-screen w-full">
      <div className="w-full xs:w-10 order-last xs:order-first fixed bottom-0 z-10">
        <NavBar />
      </div>
      <div className="mt-8 m-auto xs:mt-10 flex h-full w-4/5 xs:w-3/4  xs:mr-12 md:ml-36 flex-col xs:p-4">
        <div className="flex justify-start flex-col w-full">
          <div className="flex flex-col xs:flex-row justify-between items-center">
            <h1 className="mt-6 font-bold text-xl text-start my-4 mr-2">
              My recipes
            </h1>
            <div>
              <SearchBar />
            </div>
          </div>
          <div className="mt-8 flex justify-start gap-1 overflow-x-scroll fade-right">
            {categoriesIcon.map((category) => (
              <CategoryCard
                key={category.id}
                icon={category.icon}
                name={category.name}
              />
            ))}
          </div>
        </div>

        <div className="mt-4 my-recipes-container">
          {user && recipes?.length > 0 ? (
            <div>
              {recipes?.map((recipe, i) => {
                return (
                  <div key={i + recipe.title}>
                    <ProfilePost post={recipe} />
                  </div>
                );
              })}
            </div>
          ) : (
            <Link to="/add/recipe">
              <div
                className="w-full flex flex-col mt-4 border px-4 pt-4 rounded-lg border-dashed h-[350px] items-center justify-center duration-500 ease-in-out transform hover:scale-105 hover:shadow-lg before:ease relative overflow-hidden border-grey-500 bg-grey-500  shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-grey-500 hover:before:-translate-x-40"
                onMouseEnter={() => setPlusIconColor(ACTIVE_COLOR)}
                onMouseLeave={() => setPlusIconColor(INACTIVE_COLOR)}
              >
                <p className="font-medium text-lg tracking-wide">
                  No recipes yet
                </p>
                <p className="text-xxs mt-1 text-gray-500">
                  &apos;Let&apos;s add some!
                </p>
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
