import RecipeCard from "../../../components/TypesOfRecipeCards/RecipeCard";

const UserAllRecipes = ({ recipes }) => {
  //Gather only users recipes
  return (
    <div className="recipe-card-container mt-4 grid grid-cols-3">
      {recipes.map((recipe, i) => (
        <RecipeCard className="recipe-Card" key={i} recipe={recipe} />
      ))}
    </div>
  );
};

export default UserAllRecipes;
