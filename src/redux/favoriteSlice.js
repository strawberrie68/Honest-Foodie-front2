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

      return response.data.data || [];
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const toggleFavoriteThunk = createAsyncThunk(
  "favorites/toggleFavorite",
  async ({ userId, recipe }, { rejectWithValue }) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      await axios.post(`${apiUrl}/api/users/${userId}/favorites`, {
        recipeId: recipe.id,
      });
      return recipe; // Return the full recipe object
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: {
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
      const recipe = action.payload;
      state.isLoading = false;

      // Check if the recipe is already in favorites
      const existingIndex = state.recipes.findIndex(
        (fav) => fav.id === recipe.id,
      );

      if (existingIndex > -1) {
        // Remove it if it exists
        state.recipes.splice(existingIndex, 1);
      } else {
        // Add it if it doesn't exist
        state.recipes.push(recipe);
      }
    });
    builder.addCase(toggleFavoriteThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default favoriteSlice.reducer;
