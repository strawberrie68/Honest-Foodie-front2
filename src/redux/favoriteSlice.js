// favoriteSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (userId, { rejectWithValue }) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.get(
        `${apiUrl}/api/users/${userId}/favorites`,
      );
      console.log("fav fetched", response);
      console.log("Fetched favorites response:", response.data);

      return response.data.data?.map((fav) => Number(fav.id)) || [];
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const toggleFavoriteThunk = createAsyncThunk(
  "favorites/toggleFavorite",
  async ({ userId, recipeId }, { rejectWithValue }) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(
        `${apiUrl}/api/users/${userId}/favorites`,
        { recipeId },
      );
      return { recipeId: Number(recipeId) };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: {
    // Use an array instead of Set
    recipes: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Favorites
    builder.addCase(fetchFavorites.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchFavorites.fulfilled, (state, action) => {
      // Simply set the array of favorite recipe IDs
      state.recipes = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchFavorites.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Toggle Favorite
    builder.addCase(toggleFavoriteThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(toggleFavoriteThunk.fulfilled, (state, action) => {
      const recipeId = action.payload.recipeId;
      state.isLoading = false;

      // Use array methods instead of Set methods
      const index = state.recipes.indexOf(recipeId);
      if (index > -1) {
        // If found, remove it
        state.recipes.splice(index, 1);
      } else {
        // If not found, add it
        state.recipes.push(recipeId);
      }
    });
    builder.addCase(toggleFavoriteThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default favoriteSlice.reducer;
