import NavBar from "../../../components/NavBar/NavBar";
import { categoriesIcon } from "../../../shared/categoriesIcon";
import { useSelector } from "react-redux";
import { MagnifyingGlass, SlidersHorizontal } from "@phosphor-icons/react";

import CategoryCard from "../../../components/CategoryCard";
import ProfilePost from "../../../components/TypesOfRecipeCards/ProfilePost";
const Saved = () => {
  const user = useSelector((state) => state.auth.user);
  const savedRecipes = useSelector((state) => state.auth.user?.savedRecipes);

  console.log(savedRecipes);
  console.log(user);
  return (
    <div className="flex">
      <NavBar />
      <div className="w-3/4  mt-10 flex p-4 h-full m-auto  flex-col">
        <div className="flex justify-start flex-col w-full">
          <div className="flex flex-col xs:flex-row justify-between items-center">
            <h1 className="mt-6 font-bold text-xl text-start">Saved recipes</h1>
            <div className="bg-primary-gray-100 w-[250px] h-10 rounded-3xl px-4 items-center flex justify-between mt-4">
              <div className="flex gap-4">
                <MagnifyingGlass size={18} />
                <div className="text-xxs text-primary-gray-200">Search</div>
              </div>
              <div className="flex gap-2">
                <div className="border-px border-l border-primary-gray-200 h-4 w-0"></div>
                <SlidersHorizontal size={18} color="#A7A7A7" />
              </div>
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
            {/* TODO: How to save a recipe to make later */}
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
