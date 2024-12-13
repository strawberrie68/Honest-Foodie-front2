import NavBar from "../../../components/NavBar/NavBar";
import { useSelector } from "react-redux";
import ProfilePost from "../../../components/TypesOfRecipeCards/ProfilePost";

const Saved = () => {
  const user = useSelector((state) => state.auth.user);
  const { recipes: favorites } = useSelector((state) => state.favorites);

  return (
    <div className="flex">
      <NavBar />
      <div className="m-auto mt-10 flex h-full w-3/4 flex-col p-4">
        <div className="flex w-full flex-col justify-start">
          <div className="flex flex-col items-center justify-between xs:flex-row">
            <h1 className="mt-6 text-start text-xl font-bold">Saved recipes</h1>
          </div>
        </div>

        <div>
          <div className="mb-20 mt-6">
            <p className="text-lg font-semibold">To make</p>

            <div className="flex gap-4">
              {favorites.length > 0 ? (
                favorites.map((recipe) => (
                  <div key={recipe.id} className="mt-2 flex">
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
    </div>
  );
};

export default Saved;
