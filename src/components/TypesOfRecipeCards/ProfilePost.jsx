import { PushPin } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { pinWhite, pinSize } from "../../shared/style";

const ProfilePost = ({ pinned, post, reviewer }) => {
  //TO DO - need to add function to pin recipe

  const isReview = post && post.reviewerId;
  const recipe = isReview ? post.recipeId : post;

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) {
      return 0;
    }

    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return totalRating / reviews.length;
  };

  return (
    <div className=" mb-6 w-full lg:w-[165px]">
      {post && (
        <div className="profile-post m-auto h-auto w-full object-contain md:w-[165px]">
          <div className="relative">
            <div className="flex">
              <div className="absolute m-4 rounded-3xl px-4 py-1 text-white backdrop-blur-md">
                {/* TODO - figure out what makes a recipe trending */}
                <p className="text-xxs ">{isReview ? "Review" : "Recipe"}</p>
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
            <Link to={`/profile/${recipe.userId?._id}`}>
              <div className="absolute bottom-2 ml-4 flex flex-col text-white">
                <div className="flex items-baseline">
                  <img
                    src={recipe.userId?.picturePath}
                    className="h-8 w-8 rounded-full border border-white"
                  />
                  <p className="ml-2 text-xxxs">
                    by{" "}
                    {`${recipe.userId?.firstName} ${recipe.userId?.lastName}`}
                  </p>
                </div>
                <div className="ml-2 mt-1 flex items-baseline">
                  <div className="text-xxxs">
                    {calculateAverageRating(post.reviews) || 0} ⭐️
                  </div>
                  <div className="ml-2 text-xxxs font-thin">
                    {recipe.reviews.length || 0} Reviews
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
            {calculateAverageRating(recipe.reviews) !== 0 && (
              <div className="basis-1/6 text-xxs font-medium">
                {calculateAverageRating(recipe.reviews) + "⭐️"}
              </div>
            )}
          </div>
          <div className="mx-1 mt-5">
            <p className="truncate text-sm font-semibold leading-4 tracking-wide">
              {recipe.title}
            </p>
            <p className="ml-2 mt-1 h-4 text-xxxs tracking-wide text-primary-gray-200">
              {isReview && post.isRecommend
                ? `${reviewer.firstName} Recommends this recipe`
                : " "}
            </p>
            {!pinned && (
              <p className="user-review mt-1 line-clamp-3 text-[10px] text-gray-600">
                {isReview ? post.userReview : post.description}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePost;
