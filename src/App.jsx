import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "./redux/authRedux";

import Explore from "./pages/navbar pages/explore/explore";
import MyRecipe from "./pages/navbar pages/my recipes/myrecipes";
import Saved from "./pages/navbar pages/saved/saved";

import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/profile/Profile";
import Feed from "./pages/feed/Feed";
import RecipePage from "./pages/RecipePage/RecipePage";
import AddRecipe from "./pages/addRecipe/AddRecipe";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  const isAuth = Boolean(useSelector((state) => state.auth.token));

  useEffect(() => {
    // Check if token exists but is expired
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Check token expiration by decoding JWT
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.exp * 1000 < Date.now()) {
          // Token is expired
          dispatch(setLogout());
        }
      } catch (error) {
        // Invalid token format
        dispatch(setLogout());
      }
    }
  }, [dispatch]);

  return (
    <div className="app">
      <Routes onUpdate={() => window.scrollTo(0, 0)}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          exact
          path="/"
          element={isAuth ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/recipe/:recipeId" element={<RecipePage />} />
        <Route path="/add/recipe" element={<AddRecipe />} />

        {/* Nav Links */}
        <Route path="/explore" element={<Explore />} />
        <Route path="/myrecipe" element={<MyRecipe />} />
        <Route path="/saved" element={<Saved />} />
      </Routes>
    </div>
  );
}

export default App;
