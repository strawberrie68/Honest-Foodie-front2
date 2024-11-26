import "./App.css";
import { Routes, Route } from "react-router-dom";

import Explore from "./pages/navbar pages/explore/explore";
import MyRecipe from "./pages/navbar pages/my recipes/myrecipes";
import Saved from "./pages/navbar pages/saved/saved";

import Dashboard from "./pages/dashboard/dashboard";
import Profile from "./pages/profile/profile";
import Feed from "./pages/feed/feed";

function App() {
  return (
    <div className="app">
      <Routes onUpdate={() => window.scrollTo(0, 0)}>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/feed" element={<Feed />} />

        {/* Nav Links */}

        <Route path="/explore" element={<Explore />} />
        <Route path="/myrecipe" element={<MyRecipe />} />
        <Route path="/saved" element={<Saved />} />
      </Routes>
    </div>
  );
}

export default App;
