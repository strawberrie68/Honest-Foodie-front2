import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect } from "react";

import Explore from "./pages/navbar pages/explore/explore";
import MyRecipe from "./pages/navbar pages/my recipes/myrecipes";
import Saved from "./pages/navbar pages/saved/saved";

import Dashboard from "./pages/dashboard/dashboard";
import Profile from "./pages/profile/Profile";
import Feed from "./pages/feed/feed";
import RecipePage from "./pages/RecipePage/RecipePage";
import AddRecipe from "./pages/addRecipe/AddRecipe";
import Login from "./pages/login/login";
import SignUp from "./pages/signup/signup";
import { useSelector } from "react-redux";

function App() {
  const isAuth = Boolean(useSelector((state) => state.auth.token));

  return (
    <div className="app">
      <Routes onUpdate={() => window.scrollTo(0, 0)}>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          exact
          path="/home"
          element={isAuth ? <Dashboard /> : <Navigate to="/" />}
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
