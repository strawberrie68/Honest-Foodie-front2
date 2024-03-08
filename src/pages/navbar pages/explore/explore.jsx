import NavBar from "../../../components/NavBar/NavBar";
import { categoriesIcon } from "../../../shared/categoriesIcon";
import { MagnifyingGlass, SlidersHorizontal } from "@phosphor-icons/react";

import CategoryCard from "../../../components/CategoryCard";
import ProfilePost from "../../../components/TypesOfRecipeCards/ProfilePost";
import FeaturedRecipeCard from "../../../components/TypesOfRecipeCards/FeaturedRecipeCard";
import { featuredCategories } from "../../../shared/featuredCategories";
import { useEffect, useState } from "react";
import axios from "axios";

const iconSize = 18;
const iconBgColor = "#A7A7A7";

const Explore = () => {
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    const getRecipe = async () => {
      const result = await axios
        .get(`${process.env.REACT_APP_SERVER_URL}/api/recipe/`)
        .then((response) => {
          setRecipes(response.data);
          return response.data;
        });
    };
    getRecipe();
  }, []);
  return (
    <div className="flex">
      <NavBar />
      <div className="m-auto mt-10 flex h-full w-3/4 flex-col p-4">
        <div className="flex w-full flex-col justify-start">
          <div className="flex flex-col items-center justify-between xs:flex-row">
            <h1 className="mt-6 text-start text-xl font-bold">Explore</h1>
            <div className="search mt-4 flex h-10 w-[250px] items-center justify-between rounded-3xl bg-primary-gray-100 px-4">
              <div className="flex gap-4">
                <MagnifyingGlass size={iconSize} />
                <div className="text-xxs text-primary-gray-200">Search</div>
              </div>
              <div className="flex gap-2">
                <div className="border-px h-4 w-0 border-l border-primary-gray-200"></div>
                <SlidersHorizontal size={iconSize} color={iconBgColor} />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 grid w-full grid-cols-3 xs:grid-cols-4 sm:flex">
          {categoriesIcon.map((category, i) => (
            <CategoryCard key={i} icon={category.icon} name={category.name} />
          ))}
        </div>
        <div className="mt-6 featured">
          <p className="ml-2 text-sm font-bold">Featured</p>
          <div className="mt-2 flex gap-4">
            {featuredCategories.map((category, i) => (
              <FeaturedRecipeCard key={i} category={category} />
            ))}
          </div>
        </div>
        <div className="mt-4 trending">
          <h1 className="text-md mt-6 text-start font-bold">Trending</h1>
          <div className="mt-4 flex gap-4">
            {/* TODO: Figure out how to filter by trending or find the trending recipes */}
            {recipes?.map((recipe, i) => (
              <ProfilePost key={i} recipe={recipe} />
            ))}
          </div>
        </div>
        <div className="mt-4 browse">
          <h1 className="text-md mt-6 text-start font-bold">Browse</h1>
          <div className="mt-4 flex gap-4">
            {/* TODO: Figure out what recipe to show here and how to filter it*/}
            {recipes?.map((recipe, i) => (
              <ProfilePost key={i} recipe={recipe} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Explore;
