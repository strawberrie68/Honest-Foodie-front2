import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authRedux";
import favoritesReducer from "../redux/favoriteSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    favorites: favoritesReducer,
  },
});
