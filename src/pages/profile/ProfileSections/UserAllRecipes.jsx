import ProfilePost from "../../../components/TypesOfRecipeCards/ProfilePost";

const UserAllRecipes = ({ recipes }) => {
  //Gather only users recipes
  return (
    <div className="recipe-card-container sm:grid">
      {recipes.map((recipe, i) => (
        <ProfilePost className="recipe-Card" key={i} post={recipe} />
      ))}
    </div>
  );
};

export default UserAllRecipes;
