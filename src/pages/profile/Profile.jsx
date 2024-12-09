import React, { useEffect, useState } from "react";

import NavBar from "../../components/NavBar/NavBar";
import ProfileHeader from "../../components/ProfileHeader";
import UserCategoryNav from "../../components/UserCategoryNav";

import ProfileAllPosts from "./ProfileSections/ProfileAllPosts";
import UserTastebuds from "./ProfileSections/UserTastebuds";
import UserReviews from "./ProfileSections/UserReviews";
import UserAllRecipes from "./ProfileSections/UserAllRecipes";

import CategoryCard from "../../components/CategoryCard";
import { categoriesIcon } from "../../shared/categoriesIcon";
import { MagnifyingGlass, SlidersHorizontal } from "@phosphor-icons/react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ProfileSection } from "../../shared/profileSection";

const Profile = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const params = useParams();
  const { userId } = params;
  const [user, setUser] = useState(null);

  const [selectedProfileSection, setselectedProfileSection] = useState(
    ProfileSection.RECENT,
  );

  const getUser = async (userId) => {
    try {
      const response = await axios.get(`${apiUrl}/api/users/${userId}`);
      console.log(response.data);
      setUser(response.data);
    } catch (error) {
      console.error("Could not get user", error);
    }
  };

  useEffect(() => {
    if (userId) {
      getUser(userId);
    }
  }, [userId]);

  function handleProfilePage(section) {
    setselectedProfileSection(section);
  }

  const profileSectionComponents = {
    [ProfileSection.RECENT]: (
      <ProfileAllPosts
        user={user}
        recipes={user?.recipes || []}
        reviews={user?.reviews || []}
      />
    ),
    [ProfileSection.RECIPES]: (
      <UserAllRecipes
        user={user}
        recipes={user?.recipes || []}
        reviews={user?.reviews || []}
      />
    ),
    [ProfileSection.REVIEWS]: (
      <UserReviews user={user} reviews={user?.reviews || []} />
    ),
    [ProfileSection.TASTE_ID]: <UserTastebuds user={user} />,
  };

  return (
    <div className="flex">
      <NavBar />
      <div className="w-full">
        <div className="ProfileHeader">
          <ProfileHeader user={user} />
        </div>
        <div className="m-auto mt-2 flex w-full flex-col p-4 lg:w-3/4">
          <div className="UserCategoryNav m-auto flex items-center justify-center">
            <UserCategoryNav
              handleClick={(section) => handleProfilePage(section)}
            />
          </div>
          {/* Food category filter */}
          {selectedProfileSection !== ProfileSection.TASTE_ID && (
            <div className="mb-8 mt-8 flex justify-start gap-1 overflow-x-scroll ">
              {categoriesIcon.map((category, i) => (
                <CategoryCard
                  key={i}
                  icon={category.icon}
                  name={category.name}
                />
              ))}
            </div>
          )}

          <div className="flex w-full flex-col justify-start">
            <div className="flex items-center justify-between gap-4">
              <h1 className="profile-title mt-6 text-start text-xl font-bold">
                {selectedProfileSection}
              </h1>
              <div className="flex h-10 w-[250px] items-center justify-between rounded-3xl bg-primary-gray-100 px-4">
                <div className="flex gap-4">
                  <MagnifyingGlass size={18} />
                  <div className="text-xxs text-primary-gray-200">Search</div>
                </div>
                <div className="flex gap-2">
                  <div className="border-px h-4 w-0 border-l border-primary-gray-200"></div>
                  <SlidersHorizontal size={18} color="#A7A7A7" />
                </div>
              </div>
            </div>
            {/* Switch between user profile sections */}
            <div className="mb-6 mt-2">
              {profileSectionComponents[selectedProfileSection]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
