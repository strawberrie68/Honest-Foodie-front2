import ReviewPostCard from "../../../components/TypesOfRecipeCards/ReviewPostCard";

const UserReviews = ({ reviews }) => {
  const hasReviews = reviews.length > 0;

  return (
    <div>
      <div className="user-reviews m-auto mt-4 grid grid-cols-3 gap-2 sm:max-w-4xl sm:grid-cols-4">
        {reviews.map((review, i) => (
          <ReviewPostCard className="recipe-Card" key={i} review={review} />
        ))}
      </div>
      {!hasReviews && <div className="empty-reviews">No reviews yet</div>}
    </div>
  );
};

export default UserReviews;
