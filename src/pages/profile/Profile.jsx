import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { categoriesIcon } from "../../shared/categoriesIcon";
import { ProfileSection } from "../../shared/profileSection";

import NavBar from "../../components/NavBar/NavBar";
import CategoryCard from "../../components/CategoryCard";
import ProfileHeader from "../../components/ProfileHeader";
import UserCategoryNav from "../../components/UserCategoryNav";

import ProfileAllPosts from "./ProfileSections/ProfileAllPosts";
import UserTastebuds from "./ProfileSections/UserTastebuds";
import UserReviews from "./ProfileSections/UserReviews";
import UserAllRecipes from "./ProfileSections/UserAllRecipes";
import SearchBar from "../../components/SearchBar";

const Profile = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const params = useParams();
  const { userId } = params;
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProfileSection, setSelectedProfileSection] = useState(
    ProfileSection.ALL,
  );
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const getUser = async (userId) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${apiUrl}/api/users/${userId}/public`);
      setUser(response.data);
    } catch (error) {
      console.error("Could not get user", error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchUser = async () => {
    try {
      setIsLoading(true);
      const query = searchValue || selectedCategory || "";
      const { data } = await axios.get(
        `${apiUrl}/api/recipes/user/${userId}/search`,
        {
          params: {
            q: query,
            page,
            limit,
            sortBy,
            sortOrder,
            category: selectedCategory,
          },
        },
      );
      setSearchResults(data);
    } catch (error) {
      console.error("error searching users recipes", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryClick = (categoryName) => {
    setSearchValue("");
    setSelectedCategory(categoryName);
    setIsSearching(true);
    setPage(1); // Reset pagination when changing category
  };

  const handleSearchChange = (value) => {
    setSearchValue(value);
    setSelectedCategory(null);
    setIsSearching(true);
    setPage(1); // Reset pagination when searching
  };

  useEffect(() => {
    if (userId) {
      getUser(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (isSearching) {
      searchUser();
    }
  }, [searchValue, selectedCategory, page, sortBy, sortOrder]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSort = (field) => {
    setSortBy(field);
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  if (isLoading && !isSearching) {
    return <div>Loading</div>;
  }

  const profileSectionComponents = {
    [ProfileSection.ALL]: (
      <ProfileAllPosts
        recipes={user?.data.recipes || []}
        reviews={user?.data.Review || []}
      />
    ),
    [ProfileSection.RECIPES]: (
      <UserAllRecipes recipes={user?.data.recipes || []} />
    ),
    [ProfileSection.REVIEWS]: (
      <UserReviews user={user} reviews={user?.data.Review || []} />
    ),
    [ProfileSection.TASTE_ID]: <UserTastebuds user={user} />,
  };

  return (
    <div className="flex">
      <NavBar />
      <div className="w-full">
        <ProfileHeader user={user} />
        <div className="m-auto mt-2 flex w-full flex-col p-4 lg:w-4/5">
          <UserCategoryNav
            activeLabel={selectedProfileSection}
            onNavItemClick={(section) => {
              setSelectedProfileSection(section);
              setIsSearching(false);
              setSearchValue("");
              setSelectedCategory(null);
            }}
          />

          {/* Food category filter */}
          {selectedProfileSection !== ProfileSection.TASTE_ID && (
            <nav className="mb-8 mt-8 flex justify-start gap-1 overflow-x-scroll">
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
          )}

          <div className="flex w-full flex-col justify-start">
            <div className="flex flex-col  justify-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="profile-title mt-6 text-start text-xl font-bold">
                {selectedProfileSection}
              </h1>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <span className="text-neutral-500 sm:basis-24">Sort by</span>
                <div className="flex items-center gap-4">
                  <select
                    className="rounded-full bg-neutral-100 px-3 py-2"
                    value={sortBy}
                    onChange={(e) => handleSort(e.target.value)}
                  >
                    <option className="text-sm" value="createdAt">
                      Date
                    </option>
                    <option className="text-sm" value="title">
                      Title
                    </option>
                  </select>
                  <SearchBar onSearchChange={handleSearchChange} />
                </div>
              </div>
            </div>

            {/* Search Results or Default Content */}
            {isSearching ? (
              <div className="mb-6 mt-8">
                {isLoading ? (
                  <div>Searching...</div>
                ) : (
                  <>
                    <h2 className="mb-4">Search Results</h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {searchResults.recipes?.map((recipe) => (
                        <UserAllRecipes key={recipe.id} recipes={[recipe]} />
                      ))}
                      {searchResults.recipes?.length === 0 && <p>No results</p>}
                    </div>
                    {searchResults.hasMore && (
                      <button
                        onClick={handleLoadMore}
                        className="bg-primary mt-4 rounded-md px-4 py-2 text-white"
                      >
                        Load More
                      </button>
                    )}
                  </>
                )}
              </div>
            ) : (
              <div className="mb-6 mt-8 flex gap-2">
                {profileSectionComponents[selectedProfileSection]}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
