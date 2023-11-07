import { PushPin } from "@phosphor-icons/react";

const RecipeCard = ({ pinned, recipe }) => {
  const white = "#d4d4d4";
  const size = 18;
  return (
    <div>
      {recipe && (
        <div className="h-auto w-[165px] object-contain">
          <div className="relative">
            <div className="flex">
              <div className="absolute m-4 rounded-3xl px-4 py-1 text-white backdrop-blur-md">
                {/* TODO - figure out what makes a recipe trending */}
                <p className="text-xxs ">Trending</p>
              </div>
              {/* PIN for when user pins a recipe */}
              {pinned && (
                <div className="absolute right-4 top-4">
                  <PushPin size={size} color={white} weight="fill" />
                </div>
              )}
            </div>

            <img
              src={recipe.picturePath}
              className="h-full w-full rounded-3xl object-cover"
            />
            <div className="absolute bottom-2 ml-4 flex flex-col text-white">
              <div className="flex items-baseline">
                <img
                  src={recipe.userId.picturePath}
                  className="h-8 w-8 rounded-full border border-white"
                />
                <p className=" ml-2 text-xxxs">
                  by {`${recipe.userId.firstName} ${recipe.userId.lastName}`}
                </p>
              </div>
              <div className="ml-2 mt-1 flex items-baseline">
                <div className="text-xxxs ">{recipe.rating} ⭐️</div>
                <div className="ml-2 text-xxxs font-thin">
                  {recipe.review.length} Reviews
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2 flex justify-between">
            <div className="flex basis-4/5 flex-wrap">
              {recipe.tags?.map((tag, i) => (
                <div
                  key={i}
                  className="text-2.5xs mr-1 mt-1 flex flex-wrap rounded-md	border border-solid border-black px-2"
                >
                  {tag}
                </div>
              ))}
            </div>
            <div className="basis-1/6 text-xxs font-medium">
              {recipe.rating}
            </div>
          </div>
          <div className="mx-1 mt-5">
            <p className="text-sm font-semibold leading-4 tracking-wide">
              {recipe.title}
            </p>
            {!pinned && <p className="mt-1 text-xxs">{recipe.description}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeCard;
