import { Heart } from "@phosphor-icons/react";
import useFavorite from "../../hooks/useFavorite";
import React from "react";

const FavoriteButton = React.memo(({ recipe }) => {
  if (!recipe) return null;

  const { user, isFavorite, isLoading, toggleFavorite } = useFavorite(
    recipe.id,
  );
  if (!user) return null;

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(recipe)}
      disabled={isLoading}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? <Heart size={20} weight="fill" /> : <Heart size={20} />}
    </button>
  );
});

export default FavoriteButton;
