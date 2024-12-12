import { Heart } from "@phosphor-icons/react";
import useFavorite from "../../hooks/useFavorite";
import React from "react";

const FavoriteButton = React.memo(({ recipeId }) => {
  const { user, isFavorite, isLoading, toggleFavorite } = useFavorite(recipeId);

  if (!user) return null;

  return (
    <button
      type="button"
      onClick={toggleFavorite}
      disabled={isLoading}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? <Heart size={20} weight="fill" /> : <Heart size={20} />}
    </button>
  );
});

export default FavoriteButton;
