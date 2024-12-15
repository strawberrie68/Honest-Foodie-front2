import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    posts: [],
  },
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFollowing: (state, action) => {
      if (state.user) {
        state.user = {
          ...state.user,
          following: action.payload,
        };
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
