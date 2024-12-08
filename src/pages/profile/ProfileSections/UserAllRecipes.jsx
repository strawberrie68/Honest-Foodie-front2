import RecipePostCard from "../../../components/TypesOfRecipeCards/RecipePostCard";

const UserAllRecipes = ({ recipes }) => {
  const hasRecipes = recipes.length > 0;

  return (
    <div className="recipe-card-container sm:grid">
      {recipes.map((recipe, i) => (
        <RecipePostCard className="recipe-Card" key={i} recipe={recipe} />
      ))}
      {!hasRecipes && <p className="empty-recipes">No recipes yet</p>}
    </div>
  );
};

export default UserAllRecipes;
