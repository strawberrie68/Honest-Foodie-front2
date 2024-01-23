import { PushPin } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { pinWhite, pinSize } from "../../shared/style";

//RecipeCard is now able to take in recipe and review, and render the correct information
//Things updated
// click an it navigates to recipe
const RecipeCard = ({ pinned, recipe }) => {
  const recipeData = recipe.recipeId ? recipe.recipeId : recipe;

  const cardType = recipe.recipeId ? "Review" : "Recipe";

  return (
    <div className="recipe-card mb-6 w-full">
      {recipeData && (
        <div className="h-auto w-full m-auto xs:w-[155px] sm:w-[165px] object-contain">
          <div className="relative">
            <div className="flex">
              <div className="absolute m-4 rounded-3xl px-4 py-1 text-white backdrop-blur-md">
                {/* TODO - figure out what makes a recipe trending */}
                <p className="text-xxs ">{cardType}</p>
              </div>
              {/* PIN for when user pins a recipe */}
              {pinned && (
                <div className="pinned absolute right-4 top-4">
                  <PushPin size={pinSize} color={pinWhite} weight="fill" />
                </div>
              )}
            </div>

            <Link to={`/recipe/${recipe._id}`}>
              <img
                src={recipe?.picturePath}
                className="h-[220px] w-full rounded-3xl object-cover"
              />
            </Link>
            <Link to={`/profile/${recipeData.userId.id}`}>
              <div className="absolute bottom-2 ml-4 flex flex-col text-white">
                <div className="flex items-baseline ">
                  <img
                    src={recipeData.userId?.picturePath}
                    className="h-8 w-8 rounded-full border border-white"
                  />
                  <p className=" ml-2 text-xxxs">
                    by{" "}
                    {`${recipeData.userId.firstName} ${recipeData.userId.lastName}`}
                  </p>
                </div>
                <div className="ml-2 mt-1 flex items-baseline">
                  <div className="text-xxxs ">{recipeData.rating} ⭐️</div>
                  <div className="ml-2 text-xxxs font-thin">
                    {recipeData.review?.length} Reviews
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="mt-2 flex justify-between">
            <div className="flex basis-4/5 flex-wrap">
              {recipeData.tags?.map((tag, i) => (
                <div
                  key={i}
                  className="mr-1 mt-1 flex flex-wrap rounded-md border	border-solid border-black px-2 text-2.5xs"
                >
                  {tag}
                </div>
              ))}
            </div>
            <div className="basis-1/6 text-xxs font-medium">
              {recipeData.rating}
            </div>
          </div>
          <div className="mx-1 mt-5">
            <p className="text-sm font-semibold leading-4 tracking-wide truncate">
              {recipeData.title}
            </p>
            {!pinned && (
              <p className="mt-1 text-[10px] text-gray-600 line-clamp-3">
                {recipeData.recipeId
                  ? recipeData.userReview
                  : recipeData.description}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeCard;
