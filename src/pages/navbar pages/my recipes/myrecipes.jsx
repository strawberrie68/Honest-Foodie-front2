import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MagnifyingGlass,
  SlidersHorizontal,
  Plus,
  PlusCircle,
} from "@phosphor-icons/react";
import { setPosts } from "../../../redux/authRedux";
import { categoriesIcon } from "../../../shared/categoriesIcon";
import NavBar from "../../../components/NavBar/NavBar";
import CategoryCard from "../../../components/CategoryCard";
import ProfilePost from "../../../components/TypesOfRecipeCards/ProfilePost";
import RecipePostCard from "../../../components/TypesOfRecipeCards/RecipePostCard";

// Constants
const ICON_SIZE = 18;
const ICON_BG_COLOR = "#A7A7A7";
const INACTIVE_COLOR = "#F0F0F0";
const ACTIVE_COLOR = "#000000";

const MyRecipe = () => {
  const apiUrl = import.meta.env.VITE_API_URL || "";
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const [plusIconColor, setPlusIconColor] = useState(INACTIVE_COLOR);

  const fetchMyRecipes = async (userId) => {
    try {
      const response = await axios.get(`${apiUrl}/api/users/${userId}/public`);
      dispatch(setPosts(response.data.data.recipes));
    } catch (error) {
      console.error("error fetching my recipes", error);
    }
  };

  useEffect(() => {
    if (user && user.id) {
      fetchMyRecipes(user.id);
    }
  }, [user]);

  const recipes = useSelector((state) => state.auth.posts);

  return (
    <div className="flex">
      <NavBar />
      <div className="m-auto  mt-10 flex h-full w-3/4 flex-col p-4">
        <div className="flex w-full flex-col justify-start">
          <div className="flex flex-col items-center justify-between xs:flex-row">
            <h1 className="mt-6 text-start text-xl font-bold">My recipes</h1>
            {/* <div className="mt-4 flex h-10 w-[250px] items-center justify-between rounded-3xl bg-primary-gray-100 px-4"></div> */}
          </div>
        </div>

        <div className="mb-20 mt-4 w-full">
          {recipes?.length > 0 ? (
            <div className="flex w-full flex-col flex-wrap sm:flex-row">
              {recipes?.map((recipe) => (
                <div key={recipe.id || recipe._id}>
                  <RecipePostCard recipe={recipe} />
                </div>
              ))}
              <Link to="/add/recipe">
                <article
                  className="group flex h-[220px] w-full flex-col items-center justify-center gap-2 rounded-3xl border hover:border-2 hover:border-dashed hover:border-black sm:mx-4 sm:w-[155px]"
                  onMouseEnter={() => setPlusIconColor(ACTIVE_COLOR)}
                  onMouseLeave={() => setPlusIconColor(INACTIVE_COLOR)}
                >
                  <PlusCircle size={40} color={plusIconColor} />
                  <span className="text-gray-500 group-hover:font-bold group-hover:text-black">
                    Add recipe
                  </span>
                </article>
              </Link>
            </div>
          ) : (
            <Link to="/add/recipe">
              <div
                className="before:ease border-grey-500 bg-grey-500 hover:shadow-grey-500 relative mt-4 flex h-[500px] w-full transform flex-col items-center justify-center overflow-hidden rounded-lg border border-dashed px-4 pt-4 shadow-2xl transition-all duration-500  ease-in-out before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:scale-105 hover:shadow-lg hover:before:-translate-x-40"
                onMouseEnter={() => setPlusIconColor(ACTIVE_COLOR)}
                onMouseLeave={() => setPlusIconColor(INACTIVE_COLOR)}
              >
                <p className="text-lg font-medium tracking-wide">
                  No recipes yet
                </p>
                <p className="mt-1 text-xxs text-gray-500 ">Let's add some!</p>
                <Plus className="mt-8" size={80} color={plusIconColor} />
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default MyRecipe;
