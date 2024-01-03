const FeaturedRecipeCard = ({ category }) => {
  return (
    <div className="h-auto w-[180px] object-contain">
      <div className="relative">
        <div className="flex">
          <div className="absolute m-4 rounded-3xl px-4 py-1 text-white backdrop-blur-md">
            <p className="text-xxs">Trending</p>
          </div>
        </div>
        <img
          src={category.picturePath}
          className="h-[150px] w-full rounded-3xl object-cover"
        />
      </div>
      <div className="mx-1 mt-2">
        <p className="featured-recipe-title text-sm">{category.title}</p>
      </div>
    </div>
  );
};
export default FeaturedRecipeCard;
