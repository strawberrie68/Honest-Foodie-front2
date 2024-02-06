import ProfilePost from "../../../components/TypesOfRecipeCards/ProfilePost";

const UserReviews = ({ user, reviews }) => {
  const hasReviews = reviews.length > 0;
  return (
    <div>
      <div className="user-reviews mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 sm:max-w-4xl m-auto">
        {reviews && hasReviews && (
          <>
            {reviews.map((review, i) => (
              <ProfilePost key={i} post={review} reviewer={user} />
            ))}
          </>
        )}
      </div>
      {!hasReviews && <div className="empty-reviews">No reviews yet</div>}
    </div>
  );
};

export default UserReviews;
