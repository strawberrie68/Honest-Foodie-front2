import RecipeCard from "../../../components/TypesOfRecipeCards/RecipeCard";

const ProfileAllPosts = ({ user, recipes, reviews }) => {
  //TODO
  //Gather newest recipes and reviews from user
  //with sections of best recipe
  //popular recipe
  //newest recipe
  // and eveything else
  // const allPosts = [...recipes, ...reviews].sort({ createdAt: "desc" }).exec();
  const allPosts = [...recipes, ...reviews];
  console.log(allPosts);

  return (
    <div>
      <div className="mt-4 grid grid-cols-3">
        {allPosts.map((post, i) => (
          <RecipeCard key={i} recipe={post} />
        ))}
      </div>
    </div>
  );
};

export default ProfileAllPosts;
