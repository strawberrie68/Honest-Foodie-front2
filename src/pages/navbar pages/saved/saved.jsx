import NavBar from "../../../components/NavBar/NavBar";
import { categoriesIcon } from "../../../shared/categoriesIcon";
import { useSelector } from "react-redux";

import CategoryCard from "../../../components/CategoryCard";
import ProfilePost from "../../../components/TypesOfRecipeCards/ProfilePost";
import SearchBar from "../../../components/SearchBar";
const Saved = () => {
  const user = useSelector((state) => state.auth.user);
  const savedRecipes = useSelector((state) => state.auth.user?.savedRecipes);

  return (
    <div className="flex flex-col xs:flex-row h-screen w-full">
      <div className="w-full xs:w-10 order-last xs:order-first fixed bottom-0 z-10">
        <NavBar />
      </div>
      <div className="mt-8 m-auto xs:mt-10 flex h-full w-4/5 xs:w-3/4  xs:mr-12 md:ml-36 flex-col xs:p-4">
        <div className="flex justify-start flex-col w-full">
          <div className="flex flex-col xs:flex-row justify-between items-center">
            <h1 className="mt-6 font-bold text-xl text-start my-4 mr-2">
              Saved recipes
            </h1>
            <div>
              <SearchBar />
            </div>
          </div>
          <div className=" flex justify-start mt-8 gap-1 overflow-x-scroll  ">
            {categoriesIcon.map((category, i) => (
              <CategoryCard key={i} icon={category.icon} name={category.name} />
            ))}
          </div>
        </div>

        <div>
          <div className="mt-8 mb-10">
            <p className="font-semibold text-lg">Pinned</p>
            <div className="flex mt-2 h-72">
              {/* TODO: Figure out how to filter by pinned */}
              {/* <ProfilePost pinned={true} /> */}
            </div>
          </div>
          <div className="border"></div>

          <div className="mt-6 mb-20">
            <p className="font-semibold text-lg">To make</p>
            {/* TODO: Save a recipe to make later */}
            {user && savedRecipes.length > 0 ? (
              savedRecipes?.map((recipe) => (
                <div className="flex mt-2">
                  <ProfilePost post={recipe} />
                </div>
              ))
            ) : (
              <div>Save some recipes to make later!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Saved;
