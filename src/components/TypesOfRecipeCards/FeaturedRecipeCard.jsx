import PostBadge from "../PostBadge/PostBadge";
const FeaturedRecipeCard = ({ category, onHandleFeatureRecipe }) => {
  const handleFeatureRecipe = (keyword) => {
    onHandleFeatureRecipe(keyword);
  };
  return (
    <div
      className="h-auto w-[180px] object-contain"
      onClick={() => handleFeatureRecipe(category.keyword)}
    >
      <div className="relative">
        <PostBadge>Trending</PostBadge>
        <img
          src={category.picturePath}
          className="h-[150px] w-full rounded-3xl object-cover"
          alt={category.title}
        />
      </div>
      <span className="featured-recipe-title mx-1 mt-2 text-sm">
        {category.title}
      </span>
    </div>
  );
};
export default FeaturedRecipeCard;
