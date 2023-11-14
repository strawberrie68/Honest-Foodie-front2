import Pizza from "../../assets/pizza.jpg";
import User1 from "../../assets/user/User2.svg";

const CommentCard = ({ user, review }) => {
  //CommentCard grabs all the reviews created by the user
  // user is the reviewer

  const reviewContent = review ? review : null;

  const orginalRecipe = reviewContent?.recipeId;

  const reviewRating = reviewContent?.rating?.toFixed(1);
  const recipeReview = reviewContent
    ? reviewContent.userReview?.length > 100
      ? reviewContent.userReview.slice(0, 105) + "..."
      : reviewContent.userReview
    : null;

  return (
    <div>
      {reviewContent ? (
        //if review not empty render review
        <div className="h-[240px] w-[180px] object-contain">
          <div className="relative">
            <div className="absolute m-4 rounded-3xl px-4  py-1 text-white backdrop-blur-md">
              {/* TODO what is does it mean to be trending */}
              <p className="text-xxs ">Trending</p>
            </div>
            <img
              src={Pizza}
              className="h-full w-full rounded-3xl object-cover"
            />
            <div className="absolute bottom-2 ml-4 flex flex-col text-white">
              <div className="flex items-baseline	">
                <img src={User1} className="h-8 w-8 rounded-full" />
                <p className=" ml-2  text-xxxs">
                  by
                  {` ${orginalRecipe?.userId.firstName} ${orginalRecipe?.userId.lastName}`}
                </p>
              </div>
              <div className="ml-2  mt-1	flex	items-baseline">
                <div className="text-xxxs ">{orginalRecipe?.rating} ⭐️</div>
                <div className="ml-2 text-xxxs font-thin">
                  {orginalRecipe.review?.length} Reviews
                </div>
              </div>
            </div>
          </div>
          <div className="ml-1 mr-2 mt-4 flex justify-between">
            <div className="flex ">
              {orginalRecipe.tags?.map((tag, i) => (
                <div className="mr-2 items-center	 justify-center	rounded-md border  border-solid border-black px-4 text-xxs ">
                  {tag}
                </div>
              ))}
            </div>

            <div className="text-xxs font-medium">{reviewRating}</div>
          </div>
          <div className="mx-1 mt-4">
            <p className="ml-2 text-sm font-semibold">{orginalRecipe.title}</p>
            {review.isRecommend ? (
              <p className="ml-2 mt-1 text-xxxs tracking-wide text-primary-gray-200	">
                {user.firstName} Recommends this recipe
              </p>
            ) : (
              <p className="h-4	"> </p>
            )}
            {/* TODO toggle comment, when clicked see the entire comment */}
            <div className="mt-1 max-h-[60px] min-h-[40px] rounded-xl bg-primary-gray-50 p-2 text-xxxs">
              {recipeReview}
            </div>
          </div>
        </div>
      ) : (
        //if review empty render empty div
        <div className="empty"></div>
      )}
    </div>
  );
};

export default CommentCard;
