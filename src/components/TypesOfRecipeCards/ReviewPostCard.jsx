import PostBadge from "../PostBadge/PostBadge";
import { Link } from "react-router-dom";

const ReviewPostCard = ({ review }) => {
  return (
    <article className="mb-6 w-full lg:w-[165px]">
      {/* image part */}
      <div className="profile-post m-auto h-auto w-full object-contain md:w-[165px]">
        <PostBadge>Review</PostBadge>

        <figure>
          <Link to={`/recipe/${review.recipe.id}`}>
            <img
              src={review.imageUrl}
              className="h-[220px] w-full rounded-3xl object-cover"
              alt={review.recipe.title}
              loading="lazy"
            />
          </Link>
        </figure>
      </div>
      <h3
        className="text-md mt-4 truncate font-semibold leading-4 tracking-wide"
        aria-label="Recipe Title"
      >
        {review.recipe.title}
      </h3>
      <p className="mt-1 line-clamp-3 text-[10px] text-gray-600">
        {review.reviewText}
      </p>
    </article>
  );
};

export default ReviewPostCard;
