import NavBar from "../../../components/NavBar/NavBar";
import { categoriesIcon } from "../../../shared/categoriesIcon";
import { useSelector } from "react-redux";
import { MagnifyingGlass, SlidersHorizontal } from "@phosphor-icons/react";

import CategoryCard from "../../../components/CategoryCard";
import ProfilePost from "../../../components/TypesOfRecipeCards/ProfilePost";
const Saved = () => {
  const user = useSelector((state) => state.auth.user);
  const savedRecipes =
    useSelector((state) => state.auth.user?.savedRecipes) || [];
  console.log(savedRecipes);
  console.log(user);
  return (
    <div className="flex">
      <NavBar />
      <div className="m-auto mt-10 flex h-full w-3/4 flex-col p-4">
        <div className="flex w-full flex-col justify-start">
          <div className="flex flex-col items-center justify-between xs:flex-row">
            <h1 className="mt-6 text-start text-xl font-bold">Saved recipes</h1>
            <div className="mt-4 flex h-10 w-[250px] items-center justify-between rounded-3xl bg-primary-gray-100 px-4">
              <div className="flex gap-4">
                <MagnifyingGlass size={18} />
                <div className="text-xxs text-primary-gray-200">Search</div>
              </div>
              <div className="flex gap-2">
                <div className="border-px h-4 w-0 border-l border-primary-gray-200"></div>
                <SlidersHorizontal size={18} color="#A7A7A7" />
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-start gap-1 overflow-x-scroll">
            {categoriesIcon.map((category, i) => (
              <CategoryCard key={i} icon={category.icon} name={category.name} />
            ))}
          </div>
        </div>

        <div>
          <div className="mb-10 mt-8">
            <p className="text-lg font-semibold">Pinned</p>
            <div className="mt-2 flex h-72">
              {/* TODO: Figure out how to filter by pinned */}
              {/* <ProfilePost pinned={true} /> */}
            </div>
          </div>
          <div className="border"></div>

          <div className="mb-20 mt-6">
            <p className="text-lg font-semibold">To make</p>
            {/* Check if there are saved recipes */}
            {savedRecipes.length > 0 ? (
              savedRecipes.map((recipe) => (
                <div key={recipe._id} className="mt-2 flex">
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
