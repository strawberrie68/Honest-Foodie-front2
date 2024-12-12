import { useSelector, useDispatch } from "react-redux";
import { toggleFavoriteThunk } from "../redux/favoriteSlice";

const useFavorite = (recipeId) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { recipes: favorites, isLoading } = useSelector(
    (state) => state.favorites,
  );

  const isFavorite = favorites.includes(Number(recipeId));

  const toggleFavorite = () => {
    if (!user || isLoading) return;
    dispatch(
      toggleFavoriteThunk({
        userId: user.id,
        recipeId,
      }),
    );
  };

  return { user, isFavorite, isLoading, toggleFavorite };
};

export default useFavorite;
