import User1 from "../assets/user/user1.svg";
import {
  DotsThree,
  CaretLeft,
  CaretDown,
  Envelope,
} from "@phosphor-icons/react/dist/ssr";
import useMediaQuery from "../hooks/useMediaQuery";

const ProfileHeader = ({ user }) => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 730px)");
  const totalPosts = user.recipes?.length + user.reviews?.length;
  const followers = user.followers?.length;
  const following = user.following?.length;
  return (
    <div className="profile-header m-auto  w-full border-b pb-2">
      {/* DESKTOP MENU */}
      {isAboveMediumScreens && (
        <div className="m-auto mt-16 flex w-3/4">
          {/* Left div with user profile picture */}
          <div>
            <img src={User1} className="h-36 w-36 min-w-[100px]" />
          </div>
          {/* Right div with user info */}
          <div className="ml-10 md:ml-20">
            {/* user name and action buttons */}
            <div className="flex gap-2">
              <div className=" rounded-lg bg-black px-4  py-1 text-xxs font-medium tracking-wide text-white">
                {user.username}
              </div>
              <div className="following-number mx-4 rounded-lg bg-primary-gray-50 px-4 py-1  text-xxs">
                Following
              </div>
              <div className=" rounded-lg bg-primary-gray-50 px-4 py-1 text-xxs">
                Message
              </div>
              <div className="mx-4">
                <DotsThree size={24} />
              </div>
            </div>
            {/* user stats*/}
            <div className="mt-6 flex gap-10">
              <div className="text-xs flex ">
                <div id="posts-num" className="font-bold">
                  {totalPosts}
                </div>
                <div className="ml-1">posts</div>
              </div>
              <div className="text-xs flex ">
                <div id="followers-num" className="font-bold">
                  {followers}
                </div>
                <div className="ml-1">followers</div>
              </div>
              <div className="text-xs flex">
                <div id="followings-num" className="font-bold">
                  {following}
                </div>
                <div className="ml-1">following</div>
              </div>
            </div>
            {/* user description */}
            <div className="mt-8 text-xxs">
              <div className="font-semibold">{user.firstName}</div>
              {user.caption}
            </div>

            {/* user taste id */}
            <div className="mt-4 text-xxs">
              {user.flavorProfile?.length > 0 && (
                <div>
                  <div className="font-medium text-primary-gray-500">
                    taste id
                  </div>
                  <div id="flavor-profile-tags" className="mt-1 flex gap-2">
                    {user.flavorProfile?.map((flavor, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-center rounded-xl border border-primary-gray-500 px-2 text-xxxs"
                      >
                        {flavor}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;
