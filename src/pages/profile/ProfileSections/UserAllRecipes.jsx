import ProfilePost from "../../../components/TypesOfRecipeCards/ProfilePost";

const UserAllRecipes = ({ recipes }) => {
  return (
    <div className="recipe-card-container sm:grid">
      {recipes.map((recipe, i) => (
        <ProfilePost className="recipe-Card" key={i} post={recipe} />
      ))}
    </div>
  );
};

export default UserAllRecipes;
