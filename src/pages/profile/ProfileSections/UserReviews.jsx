import CommentCard from "../../../components/TypesOfRecipeCards/CommentCard";
const UserReviews = ({ user, reviews }) => {
  //Show only user's reviews
  const isEmptyReviews = reviews.length === 0 ? true : false;

  return (
    <div className="mt-4 grid grid-cols-3">
      {reviews && !isEmptyReviews && (
        <>
          {reviews.map((review, i) => (
            <CommentCard key={i} user={user} review={review} />
          ))}
        </>
      )}
      {isEmptyReviews && <div>No reviews yet</div>}
    </div>
  );
};

export default UserReviews;
