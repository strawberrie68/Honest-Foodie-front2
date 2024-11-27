import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import NavBar from "../../components/NavBar/NavBar";
import SearchBar from "../../components/SearchBar";
import CategoryCard from "../../components/CategoryCard";
import { categoriesIcon } from "../../shared/categoriesIcon";

import ProfilePost from "../../components/TypesOfRecipeCards/ProfilePost";

const Dashboard = () => {
  const [recipes, setRecipes] = useState([]);

  const getRecipes = async () => {
    try {
      const result = await axios.get("http://localhost:3003/api/recipe/");
      setRecipes(result.data || []);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  console.log(recipes);
  return (
    <div className="flex">
      <NavBar />
      <div className="w-full">
        <div className="m-auto mb-0 mt-16 flex w-auto max-w-2xl flex-col items-center px-4 pb-0 pt-4">
          <div className="w-3/4">
            <SearchBar />
          </div>
          <div className="h-50 m-auto mb-8 mt-10 flex w-full max-w-xl rounded-3xl bg-black bg-hero-ramen p-4 text-white">
            <Link to="/explore">
              <div className="w-full p-2 sm:w-1/2">
                <p className="text-2xl font-semibold">Trending Pages</p>
                <p className="w-full text-xxs	font-thin xs:w-2/4 sm:w-full">
                  Checkout some of the most popular recipes that are trending.
                </p>
                <div className="mt-2 flex w-1/2 items-center justify-center rounded-3xl bg-white p-1 transition duration-100 hover:bg-primary-blue-500 hover:text-white sm:mt-6">
                  <p className="text-sm font-semibold text-black">Explore</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="grid w-full grid-cols-4 gap-1 overflow-x-scroll sm:flex sm:w-[500px] sm:grid-cols-5 ">
            {categoriesIcon.map((category) => (
              <CategoryCard
                key={category.id}
                icon={category.icon}
                name={category.name}
              />
            ))}
          </div>
          <div className="flex w-full flex-col justify-start">
            <h1 className="mt-6 text-start text-xl font-bold">Popular</h1>
            <div className="mt-2 flex w-full flex-wrap gap-4  xs:grid  xs:grid-cols-3 sm:gap-10">
              {/* TODO filter so that - show popular recipes */}
              {recipes &&
                recipes
                  .slice(0, 3)
                  .map((recipe, id) => <ProfilePost key={id} post={recipe} />)}
            </div>
          </div>
          <div className="flex w-full flex-col justify-start">
            <h1 className="text-md mt-4 text-start font-medium">Explore</h1>
            {/* TODO filter so that - show random recipes from different categories */}
            {/* TODO limit only 3 recipes */}
            <div className="mt-2 grid grid-cols-3 gap-5">
              {recipes.slice(0, 3).map((recipe) => (
                <ProfilePost key={recipe._id} post={recipe} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
