import Pizza from "../../assets/pizza.jpg";
import User1 from "../../assets/user/User2.svg";

/*
 * CommentCard grabs all the reviews created by the user
 * Still need to connect to backend
 */

const CommentCard = ({ user, review }) => {
  const reviewContent = review ? review : null;

  const recipe = reviewContent?.recipeId;

  const reviewRating = reviewContent?.rating?.toFixed(1);

  return (
    <div className="comment-card ">
      {reviewContent && (
        //if review not empty render review
        <div className="h-[380px] w-[180px] object-contain">
          <div className="relative">
            <div className="absolute m-4 rounded-3xl px-4 py-1 text-white backdrop-blur-md">
              {/* TODO what is does it mean to be trending */}
              <p className="text-xxs">Trending</p>
            </div>
            {/* TODO get image from backend */}
            <img
              src={Pizza}
              className="h-full w-full rounded-3xl object-cover"
            />
            <div className="absolute bottom-2 ml-4 flex flex-col text-white">
              <div className="flex items-baseline">
                {/* TODO get user image from backend */}
                <img src={User1} className="h-8 w-8 rounded-full" />
                <p className=" ml-2 text-xxxs">
                  by
                  {`${recipe?.userId.firstName} ${recipe?.userId.lastName}`}
                </p>
              </div>
              <div className="ml-2 mt-1 flex items-baseline">
                <div className="text-xxxs">{recipe?.rating} ⭐️</div>
                <div className="ml-2 text-xxxs font-thin">
                  {recipe.review?.length} Reviews
                </div>
              </div>
            </div>
          </div>
          <div className="ml-1 mr-2 mt-4 flex justify-between">
            <div className="flex">
              {recipe.tags?.map((tag, i) => (
                <div className="mr-2 items-center	 justify-center	rounded-md border border-solid border-black px-4 text-xxs">
                  {tag}
                </div>
              ))}
            </div>

            <div className="text-xxs font-medium">{reviewRating}</div>
          </div>
          <div className="mx-1 mt-4">
            <p className="ml-2 text-sm font-semibold">{recipe.title}</p>
            <p className="ml-2 mt-1 h-4 text-xxxs tracking-wide text-primary-gray-200">
              {review.isRecommend
                ? `${user.firstName} Recommends this recipe`
                : " "}
            </p>
            {/* TODO toggle comment, when clicked see the entire comment */}
            <div className="mb-1 mt-1	max-h-[60px] min-h-[60px] rounded-xl bg-primary-gray-50 p-2 text-xxxs">
              <div className="user-review line-clamp-3">
                {reviewContent.userReview}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentCard;
