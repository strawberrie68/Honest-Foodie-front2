import { sentenceCase } from "../../utils/formatHelper";
import PostBadge from "../PostBadge/PostBadge";
import { Link } from "react-router-dom";
const RecipePostCard = ({ recipe }) => {
  console.log(recipe);

  return (
    <article className="mb-6 w-full sm:w-[165px]">
      {/* image part */}
      <div className="profile-post m-auto h-auto w-full object-contain md:w-[165px]">
        <PostBadge>Recipe</PostBadge>

        <figure>
          <Link to={`/recipe/${recipe.id}`}>
            <img
              src={recipe.imageUrl}
              className="h-[220px] w-full rounded-3xl object-cover"
            />
          </Link>
        </figure>
      </div>

      <h3
        className="text-md mt-4 truncate font-semibold leading-4 tracking-wide"
        aria-label="Recipe Title"
      >
        {sentenceCase(recipe.title)}
      </h3>
      <p className="mt-1 line-clamp-3 text-[10px] text-gray-600">
        {recipe.description}
      </p>
    </article>
  );
};

export default RecipePostCard;
