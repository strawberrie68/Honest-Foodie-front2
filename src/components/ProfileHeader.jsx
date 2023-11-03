import User1 from "../assets/user/user1.svg";
import { DotsThree } from "@phosphor-icons/react/dist/ssr";

const ProfileHeader = ({ user }) => {
  const totalPosts = user.recipes?.length + user.reviews?.length;
  const followers = user.followers?.length;
  const following = user.following?.length;
  return (
    <div className="profile-header m-auto h-60 w-full border-b">
      <div className="m-auto  mt-16 flex w-3/4">
        {/* Left Side */}
        <div>
          <img src={User1} className="h-36 w-36" />
        </div>

        {/* Right Side */}
        <div className=" ml-20">
          {/* user name */}
          <div className="flex gap-4 ">
            <div className="flex gap-4">
              <div className=" rounded-lg bg-black px-4  py-1 text-xxs font-medium tracking-wide text-white">
                {user.username}
              </div>
              <div className="following-number mx-4 rounded-lg bg-primary-gray-50 px-4 py-1  text-xxs">
                Following
              </div>
              <div className=" rounded-lg bg-primary-gray-50 px-4 py-1  text-xxs">
                Message
              </div>
            </div>
            <div className="mx-4">
              <DotsThree size={24} />
            </div>
          </div>

          {/* user info */}
          <div className="mt-6 grid grid-cols-3 gap-10">
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
            <div className="text-xs flex ">
              <div className="text-xs flex ">
                <div id="followings-num" className="font-bold">
                  {following}
                </div>
                <div className="ml-1">following</div>
              </div>
            </div>
          </div>

          {/* user description */}
          <div className="mt-8 text-xxs">
            <div className="font-semibold">{user.firstName}</div>
            <div>{user.caption}</div>
          </div>

          {/* user taste id */}
          <div className="mt-4 text-xxs">
            <div className="font-medium text-primary-gray-500">taste id</div>
            <div id="flavor-profile-tags" className="mt-1 flex gap-2">
              {user &&
                user.flavorProfile?.map((flavor, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center rounded-xl border border-primary-gray-500 px-2 text-xxxs"
                  >
                    {flavor}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
