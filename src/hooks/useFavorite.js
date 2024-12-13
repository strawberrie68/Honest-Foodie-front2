import { useSelector, useDispatch } from "react-redux";
import { toggleFavoriteThunk } from "../redux/favoriteSlice";

const useFavorite = (recipeId) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { recipes: favorites, isLoading } = useSelector(
    (state) => state.favorites,
  );

  const isFavorite = favorites.some((fav) => fav.id === recipeId);

  const toggleFavorite = (recipe) => {
    if (!user || isLoading) return;

    dispatch(
      toggleFavoriteThunk({
        userId: user.id,
        recipe,
      }),
    );
  };

  return { user, isFavorite, isLoading, toggleFavorite };
};

export default useFavorite;
