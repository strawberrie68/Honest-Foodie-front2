import { PushPin } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { pinWhite, pinSize } from "../../shared/style";

const ReviewCard = ({ recipe, review, pinned }) => {
  //TO DO - need to add function to pin recipe

  return (
    <div className="recipe-card mb-6 w-full">
      {review && (
        <div className="h-auto w-full m-auto xs:w-[155px] sm:w-[165px] object-contain">
          <div className="relative">
            <div className="flex">
              <div className="absolute m-4 rounded-3xl px-4 py-1 text-white backdrop-blur-md">
                {/* TODO - figure out what makes a recipe trending */}
                <p className="text-xxs ">Review</p>
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
            <Link to={`/profile/${recipe.userId.id}`}>
              <div className="absolute bottom-2 ml-4 flex flex-col text-white">
                <div className="flex items-baseline ">
                  <img
                    src={recipe.userId?.picturePath}
                    className="h-8 w-8 rounded-full border border-white"
                  />
                  <p className=" ml-2 text-xxxs">
                    by
                    {`${recipe.userId.firstName} ${recipe.userId.lastName}`}
                  </p>
                </div>
                <div className="ml-2 mt-1 flex items-baseline">
                  <div className="text-xxxs ">{recipe.rating} ⭐️</div>
                  <div className="ml-2 text-xxxs font-thin">
                    {recipe.reviews?.length} Reviews
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="mt-2 flex justify-between">
            <div className="flex basis-4/5 flex-wrap">
              {recipe.tags?.map((tag, i) => (
                <div
                  key={i}
                  className="mr-1 mt-1 flex flex-wrap rounded-md border	border-solid border-black px-2 text-2.5xs"
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
            <p className="text-sm font-semibold leading-4 tracking-wide truncate">
              {recipe.title}
            </p>
            {!pinned && (
              <p className="mt-1 text-[10px] text-gray-600 line-clamp-3">
                {review.userReview}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
