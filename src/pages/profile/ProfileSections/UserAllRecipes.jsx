import RecipeCard from "../../../components/TypesOfRecipeCards/RecipeCard";

const UserAllRecipes = ({ recipes }) => {
  //Gather only users recipes
  return (
    <div className="recipe-card-container sm:grid">
      {recipes.map((recipe, i) => (
        <RecipeCard className="recipe-Card" key={i} recipe={recipe} />
      ))}
    </div>
  );
};

export default UserAllRecipes;
