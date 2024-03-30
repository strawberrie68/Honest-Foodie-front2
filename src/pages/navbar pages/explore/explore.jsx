import NavBar from "../../../components/NavBar/NavBar";
import { categoriesIcon } from "../../../shared/categoriesIcon";

import CategoryCard from "../../../components/CategoryCard";
import ProfilePost from "../../../components/TypesOfRecipeCards/ProfilePost";
import FeaturedRecipeCard from "../../../components/TypesOfRecipeCards/FeaturedRecipeCard";
import { featuredCategories } from "../../../shared/featuredCategories";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../../../components/SearchBar";

const Explore = () => {
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    const getRecipe = async () => {
      await axios
        .get(`${process.env.REACT_APP_SERVER_URL}/api/recipe/`)
        .then((response) => {
          setRecipes(response.data);
          return response.data;
        });
    };
    getRecipe();
  }, []);
  return (
    <div className="flex flex-col xs:flex-row h-screen w-full">
      <div className="w-full xs:w-10 order-last xs:order-first fixed bottom-0 z-10">
        <NavBar />
      </div>
      <div className="mt-8 m-auto xs:mt-10 flex h-full w-4/5 xs:w-3/4  xs:mr-12 md:ml-36 flex-col xs:p-4">
        <div className="flex justify-start flex-col w-full">
          <div className="flex flex-col xs:flex-row justify-between items-center">
            <h1 className="mt-6 font-bold text-xl text-start my-4 mr-2">
              Explore
            </h1>
            <div>
              <SearchBar />
            </div>
          </div>
        </div>
        <div className="mt-8 grid w-full grid-cols-4 xs:grid-cols-4 sm:flex">
          {categoriesIcon.map((category, i) => (
            <CategoryCard key={i} icon={category.icon} name={category.name} />
          ))}
        </div>
        <div className="mt-6 featured">
          <p className="ml-2 text-sm font-bold">Featured</p>
          <div className="mt-2 flex gap-4 overflow-scroll">
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
              <ProfilePost key={i} post={recipe} />
            ))}
          </div>
        </div>
        <div className="mt-4 browse">
          <h1 className="text-md mt-6 text-start font-bold">Browse</h1>
          <div className="mt-4 flex gap-4">
            {/* TODO: Figure out what recipe to show here and how to filter it*/}
            {recipes?.map((recipe, i) => (
              <ProfilePost key={i} post={recipe} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Explore;
