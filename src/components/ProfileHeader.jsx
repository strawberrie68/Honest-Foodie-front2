import {
  DotsThree,
  CaretLeft,
  CaretDown,
  Envelope,
} from "@phosphor-icons/react/dist/ssr";

const ProfileHeader = ({ user }) => {
  const totalPosts = (user.recipes?.length ?? 0) + (user.reviews?.length ?? 0);
  const followers = user.followers?.length ?? 0;
  const following = user.following?.length ?? 0;
  return (
    <div className="profile-header m-auto w-full border-b pb-2">
      {/* TOP NAV BAR when on mobile, hidden on desktop */}
      <div className="flex h-14 w-full border-b px-2 py-4 md:hidden">
        <div className="basis-1/5">
          <CaretLeft size={28} />
        </div>
        <div className="flex basis-3/5 justify-center font-bold">
          {user.username}
        </div>
      </div>

      {/* PROFILE INFO */}
      <div className="left-0 ml-4 mt-10 flex w-[360px] md:m-auto md:mb-6 md:mt-10 md:w-3/4">
        {/* User profile img when on desktop, hidden on mobile */}
        <div className="hidden md:block">
          <img src={user.picturePath} className="h-36 w-36 min-w-[100px]" />
        </div>
        <div className="md:ml-20">
          <div className="flex gap-1">
            <img src={user.picturePath} className="h-20 w-20 md:hidden" />
            <div className="ml-4 flex flex-wrap gap-4 md:ml-0 md:w-[500px] md:gap-6">
              <div className="flex h-7 basis-3 items-center justify-center rounded-lg bg-black px-4 py-1  text-xxs font-medium tracking-wide text-white md:h-8">
                {user.username}
              </div>
              <div className="following-number order-3 flex h-8 basis-3/4 items-center justify-center rounded-lg bg-primary-gray-50 px-4 py-1 text-xxs font-bold  md:h-7 md:basis-1">
                Following
                <CaretDown size={16} className="ml-2" />
              </div>
              <div className="order-4 flex h-8 basis-1 items-center justify-center rounded-lg bg-primary-gray-50 px-4 py-1 text-xxs md:h-7">
                <Envelope size={16} />
              </div>
              <div className="order-2 mx-4 basis-10 md:order-4 md:mx-1">
                <DotsThree size={24} />
              </div>
            </div>
          </div>

          {/* user stats for desktop */}
          <div className="mt-6 hidden gap-10 md:flex">
            <div className="text-xs flex">
              <div id="posts-num" className="font-bold">
                {totalPosts}
              </div>
              <div className="ml-1">posts</div>
            </div>
            <div className="text-xs flex">
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

      {/* user stats for mobile*/}
      <div className="mt-4 grid h-16 w-full grid-cols-3 justify-center border-t md:hidden">
        <div className="flex flex-col items-center justify-center">
          <div id="posts-num" className="font-bold">
            {totalPosts}
          </div>
          <div className="text-neutral-400">posts</div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div id="followers-num" className="font-bold">
            {followers}
          </div>
          <div className="text-neutral-400">followers</div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div id="followings-num" className="font-bold">
            {following}
          </div>
          <div className="text-neutral-400">following</div>
        </div>

      </div>

    </div>
  );
};

export default ProfileHeader;
