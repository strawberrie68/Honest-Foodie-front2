import RecipeCard from "../../../components/TypesOfRecipeCards/RecipeCard";
import ReviewCard from "../../../components/TypesOfRecipeCards/ReviewCard";
const ProfileAllPosts = ({ recipes, reviews }) => {
  //TODO
  //Sort by date

  return (
    <div className="profile-all-posts mt-4 grid grid-cols-3">
      {[...recipes, ...reviews].map((item, i) =>
        "recipeId" in item ? (
          <ReviewCard key={i} recipe={item.recipeId} review={item} />
        ) : (
          <RecipeCard key={i} recipe={item} />
        )
      )}
    </div>
  );
};

export default ProfileAllPosts;
