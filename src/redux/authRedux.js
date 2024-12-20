import { createSlice } from "@reduxjs/toolkit";

// Initialize state from localStorage if available
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  posts: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      // Persist auth state to localStorage
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      // Clear auth state from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    setFollowing: (state, action) => {
      if (state.user) {
        state.user = {
          ...state.user,
          following: action.payload,
        };
        // Update user in localStorage when following changes
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
    followUser: (state, action) => {
      if (state.user) {
        if (!state.user.following) {
          state.user.following = [];
        }

        const isAlreadyFollowing = state.user.following.some(
          (followedUser) => followedUser.id === action.payload.user.id,
        );

        if (!isAlreadyFollowing) {
          state.user = {
            ...state.user,
            following: [...state.user.following, action.payload.user],
          };
          // Update user in localStorage when following changes
          localStorage.setItem("user", JSON.stringify(state.user));
        }
      }
    },
    unfollowUser: (state, action) => {
      if (state.user && state.user.following) {
        state.user = {
          ...state.user,
          following: state.user.following.filter(
            (followedUser) => followedUser.id !== action.payload.userId,
          ),
        };
        // Update user in localStorage when following changes
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const {
  setLogin,
  setLogout,
  setFollowing,
  followUser,
  unfollowUser,
  setPosts,
  setPost,
} = authSlice.actions;

export default authSlice.reducer;
