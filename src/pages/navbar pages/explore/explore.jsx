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
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const [searchResults, setSearchResults] = useState({
    recipes: [],
    hasMore: false,
  });
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/recipes/feed`);
        setRecipes(response.data.recipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  const searchCategory = async () => {
    try {
      setIsLoading(true);

      let endpoint = `${apiUrl}/api/recipes/search/category`;
      let params = {
        category: selectedCategory,
        page,
        limit,
        sortBy,
        sortOrder,
      };

      const { data } = await axios.get(endpoint, { params });
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching recipe:", error.response || error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchRecipe = async () => {
    try {
      setIsLoading(true);

      let endpoint = `${apiUrl}/api/recipes/search`;
      let params = {
        query: searchValue,
        page,
        limit,
        sortBy,
        sortOrder,
      };

      const { data } = await axios.get(endpoint, { params });
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching recipe:", error.response || error);
    } finally {
      setIsLoading(false);
    }
  };
  const getPopularRecipes = async () => {
    try {
      setIsLoading(true);

      let endpoint = `${apiUrl}/api/recipes/search`;
      let params = {
        sortBy: "rating",
        sortOrder: "desc",
        limit: 10,
      };

      const { data } = await axios.get(endpoint, { params });
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching popular recipe:", error.response || error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTrendingRecipes = async () => {
    try {
      setIsLoading(true);

      let endpoint = `${apiUrl}/api/recipes/feed`;
      let params = {
        limit: 10,
        sortBy: "createdAt",
        sortOrder: "desc",
      };

      const { data } = await axios.get(endpoint, { params });
      setSearchResults(data);
    } catch (error) {
      console.error(
        "Error searching trending recipe:",
        error.response || error,
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchValue) {
      searchRecipe();
    }
  }, [searchValue, page, sortBy, sortOrder]);

  useEffect(() => {
    if (selectedCategory === "Popular") {
      getPopularRecipes();
    } else if (selectedCategory === "Trending") {
      getTrendingRecipes();
    } else {
      searchCategory();
    }
  }, [selectedCategory, page]);

  const handleCategoryClick = (categoryName) => {
    console.log("Category clicked:", categoryName);
    setSearchValue("");
    setSelectedCategory(
      categoryName === selectedCategory ? null : categoryName,
    );
    setIsSearching(true);
    setPage(1);
  };

  const handleSearchChange = (value) => {
    setSearchValue(value);
    setSelectedCategory(null);
    setIsSearching(true);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <main className="min-h-screen">
      <NavBar />

      <div className="container mx-auto px-4 lg:pl-36">
        <header className="my-6 flex flex-col items-center justify-between gap-9 xs:flex-row">
          <h1 className="mb-4 text-2xl font-bold xs:mb-0">Explore</h1>
          <SearchBar onSearchChange={handleSearchChange} />
        </header>

        <section aria-labelledby="categories-heading" className="my-8">
          <h2 id="categories-heading" className="sr-only">
            Categories
          </h2>

          <nav className="grid grid-cols-4 gap-4 xs:grid-cols-4 sm:flex">
            {categoriesIcon.map(({ name, icon }) => (
              <button
                key={name}
                onClick={() => handleCategoryClick(name)}
                className={`CategoryCard ${
                  selectedCategory === name ? "border-primary border-2" : ""
                }`}
                tabIndex="0"
              >
                <CategoryCard icon={icon} name={name} />
              </button>
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

        <section aria-labelledby="browse-heading">
          <h2 className="text-xl font-bold">Browse</h2>

          <div className="mb-6 mt-4">
            {isLoading ? (
              <div>Searching...</div>
            ) : searchValue || selectedCategory ? (
              <div className="mb-6 mt-8">
                <h2 className="mb-4">Search Results</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {searchResults.recipes?.map((recipe) => (
                    <ProfilePost key={recipe.id} post={recipe} />
                  ))}
                  {searchResults.recipes?.length === 0 && (
                    <p>No results found</p>
                  )}
                </div>
                {searchResults.hasMore && (
                  <button
                    onClick={handleLoadMore}
                    className="bg-primary mt-4 rounded-md px-4 py-2 text-white"
                  >
                    Load More
                  </button>
                )}
              </div>
            ) : (
              <section aria-labelledby="trending-heading" className="">
                <h2 id="trending-heading" className="text-lg my-2 font-medium">
                  Trending
                </h2>
                <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 sm:flex sm:grid-cols-4">
                  {recipes?.map((recipe, index) => (
                    <ProfilePost key={`trending-${index}`} post={recipe} />
                  ))}
                </div>
              </section>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Explore;
