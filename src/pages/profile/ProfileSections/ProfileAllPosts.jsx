import ReviewPostCard from "../../../components/TypesOfRecipeCards/ReviewPostCard";
import RecipePostCard from "../../../components/TypesOfRecipeCards/RecipePostCard";

const ProfileAllPosts = ({ recipes, reviews }) => {
  const allPosts = [...recipes, ...reviews].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  return (
    <div className="profile-all-posts mt-4 grid grid-cols-3 gap-2">
      {allPosts.map((post) =>
        post.reviewText ? (
          <ReviewPostCard key={post.id} review={post} />
        ) : (
          <RecipePostCard key={post.id} recipe={post} />
        ),
      )}
    </div>
  );
};

export default ProfileAllPosts;
