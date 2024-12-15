import React from "react";
import {
  DotsThree,
  CaretLeft,
  CaretDown,
  Envelope,
} from "@phosphor-icons/react/dist/ssr";
import { useNavigate } from "react-router";
import FollowButton from "./FollowButton/FollowButton";

const MobileNavigation = ({ username, onBack }) => (
  <nav className="relative flex h-14 w-full items-center border-b px-2 lg:hidden">
    <button
      onClick={onBack}
      className="absolute left-2 flex h-11 w-11 items-center justify-center"
    >
      <CaretLeft size={28} />
      <span className="sr-only">Go back</span>
    </button>
    <h1 className="w-full text-center font-bold">{username}</h1>
  </nav>
);

const ProfileActions = ({
  username,
  profilePicture,
  profileUser,
  onFollowChange,
}) => {
  return (
    <section className="flex w-full items-center gap-6 md:gap-1">
      <img
        src={profilePicture}
        className="h-20 w-20 min-w-[80px] rounded-full object-cover md:hidden"
        alt={`${username}'s profile`}
      />

      <div className="flex w-full flex-col gap-4 md:gap-6">
        <div className="flex items-center justify-between">
          <span className="flex h-7 items-center justify-center rounded-lg bg-black px-4 py-1 text-xxs font-medium tracking-wide text-white md:h-8">
            {username}
          </span>

          <button className="flex-shrink-0">
            <DotsThree size={24} />
            <span className="sr-only">More Options</span>
          </button>
        </div>

        <div className="flex justify-between gap-2">
          <FollowButton
            userToFollow={{
              id: profileUser.id,
              username: profileUser.username,
              profilePicture: profileUser.profilePicture,
            }}
            onFollowChange={onFollowChange}
          />

          <button className="flex h-8 basis-2 items-center justify-center gap-2 rounded-lg bg-primary-gray-50 px-2 py-1 text-xxs sm:px-3 md:h-7 md:px-4">
            <Envelope size={16} className="sm:mr-0" />
            <span className="hidden xs:block">Message</span>
            <span className="sr-only">Send Message</span>
          </button>
        </div>
      </div>
    </section>
  );
};

const DesktopUserStats = ({ recipes, followerCount, followingCount }) => (
  <section className="mt-6 hidden gap-10 md:flex">
    <div className="text-xs flex">
      <span className="font-bold" id="posts-num">
        {recipes?.length || 0}
      </span>
      <span className="ml-1">posts</span>
    </div>
    <div className="text-xs flex">
      <span className="font-bold" id="followers-num">
        {followerCount || 0}
      </span>
      <span className="ml-1">followers</span>
    </div>
    <div className="text-xs flex">
      <span className="font-bold" id="followings-num">
        {followingCount || 0}
      </span>
      <span className="ml-1">following</span>
    </div>
  </section>
);

const MobileUserStats = ({ recipes, followerCount, followingCount }) => (
  <section className="mt-4 grid h-16 w-full grid-cols-3 justify-center border-t md:hidden">
    <div className="flex flex-col items-center justify-center">
      <span className="font-bold" id="mobile-posts-num">
        {recipes?.length || 0}
      </span>
      <span className="text-neutral-400">posts</span>
    </div>
    <div className="flex flex-col items-center justify-center">
      <span className="font-bold" id="mobile-followers-num">
        {followerCount || 0}
      </span>
      <span className="text-neutral-400">followers</span>
    </div>
    <div className="flex flex-col items-center justify-center">
      <span className="font-bold" id="mobile-followings-num">
        {followingCount || 0}
      </span>
      <span className="text-neutral-400">following</span>
    </div>
  </section>
);

const ProfileHeader = ({ user, onFollowChange }) => {
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  const {
    username,
    profilePicture,
    bio,
    recipes,
    followerCount,
    followingCount,
    id,
  } = user.data;

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <header className="profile-header m-auto w-full border-b pb-2">
      <MobileNavigation username={username} onBack={handleBack} />

      <div className="left-0 ml-4 mt-10 flex w-full md:mx-auto md:mb-6 md:mt-10 md:pl-36">
        <img
          src={profilePicture}
          className="hidden h-36 w-36 min-w-[100px] rounded-full object-cover md:block"
          alt={`${username}'s profile`}
        />

        <div className="md:ml-20">
          <ProfileActions
            username={username}
            profilePicture={profilePicture}
            profileUser={{
              id,
              username,
              profilePicture,
            }}
            onFollowChange={onFollowChange}
          />

          <DesktopUserStats
            recipes={recipes}
            followerCount={followerCount}
            followingCount={followingCount}
          />

          <p className="mt-8 text-xxs">{bio}</p>
        </div>
      </div>

      <MobileUserStats
        recipes={recipes}
        followerCount={followerCount}
        followingCount={followingCount}
      />
    </header>
  );
};

export default ProfileHeader;
