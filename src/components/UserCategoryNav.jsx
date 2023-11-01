import {GridFour, CookingPot, NotePencil, Brain} from "@phosphor-icons/react";

const UserCategoryNav = () => {
  return (
    <div className="flex gap-8">
      <div className="flex  flex-col ">
        <div className="bg-black w-full h-1 "></div>
        <div className="flex flex-row gap-2 text-xxs font-semibold items-center mt-2 w-3/4 px-2">
          <div>
            <GridFour size={20} />
          </div>
          <div>ALL</div>
        </div>
      </div>
      <div className="flex  flex-col">
        <div className="w-full h-1 "></div>
        <div className="flex flex-row gap-2 text-xxs font-semibold items-center mt-2 w-3/4 px-2">
          <div>
            <CookingPot size={20} />
          </div>
          <div>RECIPES</div>
        </div>
      </div>
      <div className="flex  flex-col">
        <div className=" w-full h-1 "></div>
        <div className="flex flex-row gap-2 text-xxs font-semibold items-center mt-2 w-3/4 px-2">
          <div>
            <NotePencil size={20} />
          </div>
          <div>REVIEWS</div>
        </div>
      </div>
      <div className="flex  flex-col">
        <div className="w-full h-1 "></div>
        <div className="flex flex-row gap-2 text-xxs font-semibold items-center mt-2 w-3/4 px-2">
          <div>
            <Brain size={20} />
          </div>
          <div>TASTEBUDS</div>
        </div>
      </div>
    </div>
  );
};

export default UserCategoryNav;
