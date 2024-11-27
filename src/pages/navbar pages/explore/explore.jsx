import React, { useEffect, useState } from "react";
import axios from "axios";

// Components
import NavBar from "../../../components/NavBar/NavBar";
import SearchBar from "../../../components/SearchBar";
import CategoryCard from "../../../components/CategoryCard";
import ProfilePost from "../../../components/TypesOfRecipeCards/ProfilePost";
import FeaturedRecipeCard from "../../../components/TypesOfRecipeCards/FeaturedRecipeCard";

// Shared Data
import { categoriesIcon } from "../../../shared/categoriesIcon";
import { featuredCategories } from "../../../shared/featuredCategories";

const apiUrl = import.meta.env.VITE_API_URL;

const Explore = () => {
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/recipe/`);
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <main className="min-h-screen">
      <NavBar />

      <div className="container mx-auto px-4 lg:pl-36">
        <header className="my-6 flex flex-col items-center justify-between xs:flex-row">
          <h1 className="mb-4 text-2xl font-bold xs:mb-0">Explore</h1>
          <SearchBar />
        </header>

        <section aria-labelledby="categories-heading" className="my-8">
          <h2 id="categories-heading" className="sr-only">
            Categories
          </h2>
          <nav className="grid grid-cols-4 gap-4 xs:grid-cols-4 sm:flex">
            {categoriesIcon.map((category, index) => (
              <CategoryCard
                key={`category-${index}`}
                icon={category.icon}
                name={category.name}
              />
            ))}
          </nav>
        </section>

        <section aria-labelledby="featured-heading" className="my-8">
          <h2 id="featured-heading" className="mb-2 ml-2 text-sm font-bold">
            Featured
          </h2>
          <div className="flex gap-4 overflow-x-auto">
            {featuredCategories.map((category, index) => (
              <FeaturedRecipeCard
                key={`featured-${index}`}
                category={category}
              />
            ))}
          </div>
        </section>

        <section aria-labelledby="trending-heading" className="my-8">
          <h2 id="trending-heading" className="text-lg mb-4 font-bold">
            Trending
          </h2>
          <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 sm:flex sm:grid-cols-4">
            {recipes?.map((recipe, index) => (
              <ProfilePost key={`trending-${index}`} post={recipe} />
            ))}
          </div>
        </section>

        <section aria-labelledby="browse-heading" className="my-8">
          <h2 id="browse-heading" className="text-lg mb-4 font-bold">
            Browse
          </h2>
          <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 sm:flex sm:grid-cols-4">
            {recipes?.map((recipe, index) => (
              <ProfilePost key={`browse-${index}`} post={recipe} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Explore;
