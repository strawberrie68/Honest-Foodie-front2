import CommentCard from "../../../components/TypesOfRecipeCards/CommentCard";
const UserReviews = ({ user, reviews }) => {
  //Show only user's reviews
  const hasReviews = reviews.length > 0;
  return (
    <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 sm:max-w-4xl m-auto">
      {reviews && !hasReviews && (
        <>
          {reviews.map((review, i) => (
            <CommentCard key={i} reviewer={user} review={review} />
          ))}
        </>
      )}
      {hasReviews && <div>No reviews yet</div>}
    </div>
  );
};

export default UserReviews;
