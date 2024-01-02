import CommentCard from "../../../components/TypesOfRecipeCards/CommentCard";
const UserReviews = ({ user, reviews }) => {
  //Show only user's reviews
  const isEmptyReviews = reviews.length === 0 ? true : false;
  return (
    <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 sm:max-w-4xl m-auto">
      {reviews && !isEmptyReviews && (
        <>
          {reviews.map((review, i) => (
            <CommentCard key={i} reviewer={user} review={review} />
          ))}
        </>
      )}
      {isEmptyReviews && <div>No reviews yet</div>}
    </div>
  );
};

export default UserReviews;
