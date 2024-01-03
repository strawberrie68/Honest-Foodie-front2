import { PushPin } from "@phosphor-icons/react";

//RecipeCard is now able to take in recipe and review, and render the correct information

const RecipeCard = ({ pinned, recipe }) => {
  const white = "#d4d4d4";
  const size = 18;
  const orginalRecipe = recipe.recipeId ? recipe.recipeId : recipe;

  const formattedReview =
    recipe.userReview?.slice(0, 50) +
    (recipe.userReview?.length > 50 ? "..." : "");

  const cardType = recipe.recipeId ? "Review" : "Recipe";

  return (
    <div className="mb-6">
      {recipe && (
        <div className="h-auto w-[165px] object-contain">
          <div className="relative">
            <div className="flex">
              <div className="absolute m-4 rounded-3xl px-4 py-1 text-white backdrop-blur-md">
                {/* TODO - figure out what makes a recipe trending */}
                <p className="text-xxs ">{cardType}</p>
              </div>
              {/* PIN for when user pins a recipe */}
              {pinned && (
                <div className="absolute right-4 top-4">
                  <PushPin size={size} color={white} weight="fill" />
                </div>
              )}
            </div>

            <img
              src={orginalRecipe?.picturePath}
              className="h-full w-full rounded-3xl object-cover"
            />
            <div className="absolute bottom-2 ml-4 flex flex-col text-white">
              <div className="flex items-baseline">
                <img
                  src={orginalRecipe.userId?.picturePath}
                  className="h-8 w-8 rounded-full border border-white"
                />
                <p className=" ml-2 text-xxxs">
                  by{" "}
                  {`${orginalRecipe.userId.firstName} ${orginalRecipe.userId.lastName}`}
                </p>
              </div>
              <div className="ml-2 mt-1 flex items-baseline">
                <div className="text-xxxs ">{orginalRecipe.rating} ⭐️</div>
                <div className="ml-2 text-xxxs font-thin">
                  {orginalRecipe.review.length} Reviews
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2 flex justify-between">
            <div className="flex basis-4/5 flex-wrap">
              {orginalRecipe.tags?.map((tag, i) => (
                <div
                  key={i}
                  className="mr-1 mt-1 flex flex-wrap rounded-md border	border-solid border-black px-2 text-2.5xs"
                >
                  {tag}
                </div>
              ))}
            </div>
            <div className="basis-1/6 text-xxs font-medium">
              {orginalRecipe.rating}
            </div>
          </div>
          <div className="mx-1 mt-5">
            <p className="text-sm font-semibold leading-4 tracking-wide">
              {orginalRecipe.title}
            </p>
            {!pinned && (
              <p className="mt-1 text-xxs">
                {recipe.recipeId ? formattedReview : orginalRecipe.description}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeCard;
