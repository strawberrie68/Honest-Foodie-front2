import RecipeCard from "../../../components/TypesOfRecipeCards/RecipeCard";

const ProfileAllPosts = ({ recipes, reviews }) => {
  //TODO
  //Sort by date

  const allPosts = [...recipes, ...reviews];

  return (
    <div className="profile-all-posts mt-4 grid grid-cols-3">
      {allPosts.map((post, i) => (
        <RecipeCard key={i} recipe={post} />
      ))}
    </div>
  );
};

export default ProfileAllPosts;
