import { GridFour, CookingPot, NotePencil, Brain } from "@phosphor-icons/react";

const UserCategoryNav = () => {
  const iconSize = 20;
  return (
    <div className="flex gap-8">
      <div className="flex flex-col ">
        <div className="h-1 w-full bg-black "></div>
        <div className="mt-2 flex w-3/4 flex-row items-center gap-2 px-2 text-xxs font-semibold">
          <div>
            <GridFour size={iconSize} />
          </div>
          <div>ALL</div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="h-1 w-full "></div>
        <div className="mt-2 flex w-3/4 flex-row items-center gap-2 px-2 text-xxs font-semibold">
          <div>
            <CookingPot size={iconSize} />
          </div>
          <div>RECIPES</div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className=" h-1 w-full "></div>
        <div className="mt-2 flex w-3/4 flex-row items-center gap-2 px-2 text-xxs font-semibold">
          <div>
            <NotePencil size={iconSize} />
          </div>
          <div>REVIEWS</div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="h-1 w-full "></div>
        <div className="mt-2 flex w-3/4 flex-row items-center gap-2 px-2 text-xxs font-semibold">
          <div>
            <Brain size={iconSize} />
          </div>
          <div>TASTEBUDS</div>
        </div>
      </div>
    </div>
  );
};

export default UserCategoryNav;
