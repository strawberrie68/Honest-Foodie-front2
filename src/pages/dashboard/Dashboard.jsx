import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import NavBar from "../../components/NavBar/NavBar";
import SearchBar from "../../components/SearchBar";
import CategoryCard from "../../components/CategoryCard";
import { categoriesIcon } from "../../shared/categoriesIcon";
import ProfilePost from "../../components/TypesOfRecipeCards/ProfilePost";
import { ingredientCategories } from "../../shared/ingredientCategories";

const PopularRecipes = ({ recipes }) => (
  <div className="flex w-full flex-col justify-start">
    <h2 className="mt-6 text-start text-xl font-bold">Popular</h2>
    <div className="mt-2 flex w-full flex-wrap gap-4 xs:grid xs:grid-cols-3 sm:gap-10">
      {recipes.slice(0, 3).map((recipe, id) => (
        <ProfilePost key={id} post={recipe} />
      ))}
    </div>
  </div>
);

const TrendingRecipes = ({ recipes }) => (
  <div className="flex w-full flex-col justify-start">
    <h2 className="text-md mt-4 text-start font-medium">Explore</h2>
    <div className="mt-2 grid grid-cols-3 gap-5">
      {recipes.slice(0, 3).map((recipe) => (
        <ProfilePost key={recipe._id} post={recipe} />
      ))}
    </div>
  </div>
);

const Dashboard = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  const getRecipes = async () => {
    try {
      const result = await axios.get(`${apiUrl}/api/recipes/feed`);
      console.log(result);
      setRecipes(result.data.recipes || []);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  const handleSearchChange = (value) => {
    setSearchValue(value);
    setSelectedCategory(null);
    setIsSearching(true);
  };

  const handleCategoryClick = (categoryName) => {
    setSearchValue("");
    setSelectedCategory(categoryName);
    setIsSearching(true);
  };

  useEffect(() => {
    let filtered = recipes;

    if (searchValue) {
      filtered = filtered.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          recipe.sections.some((section) =>
            section.ingredients.some((ingredient) =>
              ingredient.name.toLowerCase().includes(searchValue.toLowerCase()),
            ),
          ) ||
          recipe.tags.some((tag) =>
            tag.tag.name.toLowerCase().includes(searchValue.toLowerCase()),
          ),
      );
    } else if (selectedCategory) {
      if (selectedCategory === "Trending" || selectedCategory === "Popular") {
        // No filtering for trending or popular
        return;
      }

      if (ingredientCategories[selectedCategory]) {
        filtered = filtered.filter(
          (recipe) =>
            recipe.sections.some((section) =>
              section.ingredients.some((ingredient) =>
                ingredientCategories[selectedCategory].some(
                  (categoryIngredient) =>
                    ingredient.name
                      .toLowerCase()
                      .includes(categoryIngredient.toLowerCase()),
                ),
              ),
            ) ||
            recipe.tags.some((tag) =>
              ingredientCategories[selectedCategory].some(
                (categoryIngredient) =>
                  tag.tag.name
                    .toLowerCase()
                    .includes(categoryIngredient.toLowerCase()),
              ),
            ),
        );
      }
    }

    setFilteredRecipes(filtered);
  }, [searchValue, selectedCategory, recipes]);

  const showDefault = !isSearching || filteredRecipes.length === 0;

  return (
    <div className="flex">
      <NavBar />
      <main className="m-auto mb-0 mt-16 flex w-full max-w-2xl flex-col items-center px-4 pb-0 pt-4">
        <div className="w-3/4">
          <SearchBar onSearchChange={handleSearchChange} />
        </div>

        <section className="h-50 m-auto mb-8 mt-10 flex w-full max-w-xl rounded-3xl bg-black bg-hero-ramen p-4 text-white ">
          <Link to="/explore">
            <div className="w-full p-2 sm:w-1/2">
              <h1 className="text-2xl font-semibold">Trending Pages</h1>
              <p className="w-full text-xxs font-thin xs:w-2/4 sm:w-full">
                Check out some of the most popular recipes that are trending.
              </p>
              <button className="mt-2 flex w-1/2 items-center justify-center rounded-3xl bg-white p-1 transition duration-100 sm:mt-6">
                <span className="text-sm font-semibold text-black">
                  Explore
                </span>
              </button>
            </div>
          </Link>
        </section>

        <nav className="grid w-full grid-cols-4 gap-1 overflow-x-scroll sm:flex sm:w-[500px] sm:grid-cols-5">
          {categoriesIcon.map(({ name, icon }) => (
            <button
              key={name}
              onClick={() => handleCategoryClick(name)}
              className={`CategoryCard ${
                selectedCategory === name ? "border-white" : ""
              }`}
              keyTab="0"
            >
              <CategoryCard icon={icon} name={name} />
            </button>
          ))}
        </nav>

        {isSearching && filteredRecipes.length === 0 && (
          <div className="w-full p-4">
            <p className="mt-4 text-gray-500">No recipes found</p>
          </div>
        )}
        {showDefault && (
          <>
            <PopularRecipes recipes={recipes} />
            <TrendingRecipes recipes={recipes} />
          </>
        )}

        {isSearching && (
          <section className="flex w-full flex-col">
            <h2 className="mb-2 mt-6 text-start text-xl font-bold">
              Search Results
            </h2>
            <div className="mt-2 flex flex-col justify-start gap-2 sm:flex-row">
              {filteredRecipes.map((recipe, id) => (
                <ProfilePost key={recipe._id || id} post={recipe} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
