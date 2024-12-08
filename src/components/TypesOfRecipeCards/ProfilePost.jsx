import { PushPin } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { pinWhite, pinSize } from "../../shared/style";
import { calculateAverageRating, sentenceCase } from "../../utils/formatHelper";
import PostBadge from "../PostBadge/PostBadge";
const ProfilePost = ({ pinned, post, reviewer }) => {
  const isReview = post && post.reviewText;
  const recipe = isReview ? post.recipeId : post;

  if (!recipe) return null;

  const averageRating = calculateAverageRating(recipe.reviews);
  const reviewCount = recipe.reviews?.length || 0;

  return (
    <article className="mb-6 w-full lg:w-[165px]">
      {post && (
        <div className="profile-post m-auto h-auto w-full object-contain md:w-[165px]">
          <figure className="relative">
            {/* Badge */}
            <PostBadge isReview>Recipe</PostBadge>
            {/* TODO: figure out pinned */}
            {/* Pinned Icon */}
            {pinned && (
              <div
                className="pinned absolute right-4 top-4"
                aria-label="Pinned Recipe"
              >
                <PushPin size={pinSize} color={pinWhite} weight="fill" />
              </div>
            )}

            {/* Recipe Image */}
            <figure>
              <Link to={`/recipe/${recipe.id}`}>
                <img
                  src={recipe.imageUrl}
                  className="h-[220px] w-full rounded-3xl object-cover"
                />
              </Link>
            </figure>
            {/* Recipe's author */}
            <Link to={`/profile/${recipe.user.id}`}>
              <div className="absolute bottom-2 ml-4 flex flex-col text-white">
                <figure className="flex items-baseline">
                  <img
                    src={recipe.user.profilePicture}
                    className="h-8 w-8 rounded-full border border-white object-cover"
                  />
                  <figcaption className="ml-2 text-xxxs">
                    by {recipe.user.username}
                  </figcaption>
                </figure>
                {/* Rating Information */}
                <div className="ml-2 mt-1 flex items-baseline">
                  <span
                    className="gap-2 text-xxxs"
                    aria-label={`Average rating: ${averageRating} out of 5`}
                  >
                    {averageRating || 0} ⭐️
                  </span>
                  <p
                    className="ml-2 text-xxxs font-thin"
                    aria-label={`Total number of reviews: ${reviewCount}`}
                  >
                    {reviewCount} Reviews
                  </p>
                </div>
              </div>
            </Link>
          </figure>

          {/* Recipe Details */}
          {/* Recipe Details */}
          <section className="mx-2 mt-1 flex flex-col">
            <header className="flex items-center justify-between">
              <h2
                className="text-md mt-4 truncate font-semibold leading-4 tracking-wide"
                aria-label="Recipe Title"
              >
                {recipe.title && sentenceCase(recipe.title)}
              </h2>

              {averageRating !== 0 && (
                <p
                  className="mt-1 min-w-[40px] text-sm font-medium"
                  aria-label={`Overall rating: ${averageRating} stars`}
                >
                  {averageRating} ⭐️
                </p>
              )}
            </header>

            {/* Description or Review */}
            {!pinned && (
              <p
                className="user-review mt-1 line-clamp-3 text-[10px] text-gray-600"
                aria-label="Post description or review"
              >
                {isReview ? post.userReview : recipe.description}
              </p>
            )}

            {/* Tags */}
            <div
              className="mt-2 flex min-h-[50px] flex-wrap"
              aria-label="Recipe tags"
            >
              {recipe.tags?.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className="mr-1 mt-1 flex max-h-[20px] rounded-md border border-solid border-black px-2 text-2.5xs"
                  aria-label={`Tag: ${tag.tag.name}`}
                >
                  {tag.tag.name}
                </span>
              ))}
            </div>
          </section>
        </div>
      )}
    </article>
  );
};

export default ProfilePost;
