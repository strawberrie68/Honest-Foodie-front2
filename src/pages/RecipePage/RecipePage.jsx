import NavBar from "../../components/NavBar/NavBar";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Fraction from "fraction.js";
import { Link, useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { calculateAverageRating } from "../../utils/formatHelper";
import { Star, LightbulbFilament, CaretLeft } from "@phosphor-icons/react";

const RecipePage = () => {
  const navigate = useNavigate();
  const starSize = 18;

  const { recipeId } = useParams();
  console.log(recipeId);
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRecipe = async () => {
      if (!recipeId) return;

      try {
        const response = await axios.get(
          `http://localhost:3003/api/recipes/${recipeId}`,
        );
        setRecipe(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching recipe:", error.message);
        setError("Failed to load recipe");
        setIsLoading(false);
      }
    };

    getRecipe();
  }, [recipeId]);

  if (isLoading) {
    return (
      <div className="flex">
        <NavBar />
        <div>Loading...</div>
      </div>
    );
  }

  console.log(recipe);
  // Render error state
  if (error) {
    return (
      <div className="flex">
        <NavBar />
        <div>Error: {error}</div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="flex">
        <NavBar />
        <div>No recipe found</div>
      </div>
    );
  }

  const averageRating = calculateAverageRating(recipe.reviews);

  return (
    <div className="flex flex-col">
      <NavBar />
      <nav className="flex h-14 w-full border-b px-2 py-4 sm:hidden">
        <Link onClick={() => navigate(-1)} keyTab="0">
          <div className="basis-1/5">
            <CaretLeft size={28} />
          </div>
        </Link>
      </nav>

      <main className="m-auto max-w-3xl pl-8  sm:mx-3 sm:p-10 lg:pl-24">
        {/* Recipe description */}
        <section className="m-4 flex w-full max-w-lg flex-col sm:ml-6 sm:mt-16">
          <h1 className="text-2xl font-semibold">
            {recipe.title || "Untitled Recipe"}
          </h1>
          <div className="mt-4 flex flex-col sm:flex-row">
            <img
              className="w-full rounded-xl object-cover md:basis-3/5"
              src={recipe.imageUrl}
            />

            <section className="flex flex-col justify-between sm:px-6 md:basis-3/5">
              <div className="mt-10 sm:mt-0">
                <h2 className="font-bold">Description</h2>
                <div className="flex flex-col">
                  {/* TODO get the stars to show the number of stars */}
                  <div className="flex pb-2 pt-3">
                    <StarRatings
                      rating={averageRating}
                      starRatedColor="#365585"
                      numberOfStars={5}
                      name="rating"
                      starDimension="15px"
                    />
                  </div>

                  <div className="mb-2 flex gap-1 text-sm text-gray-500">
                    <span className="font-bold sm:pl-2">
                      {recipe.reviews.length || 0}
                    </span>
                    <span className="">reviews</span>
                  </div>
                </div>
                <p className="mt-2 line-clamp-5 h-16 text-sm">
                  {recipe.description}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-2">
                <img
                  className="flex h-5 w-5 rounded-full border object-cover"
                  src={recipe.user.profilePicture}
                />
                <span className="text-sm font-medium">
                  {recipe.user.username}
                </span>
              </div>

              <div>
                <h2 className="mb-4 mt-5 font-medium text-gray-300">
                  Recipe Info
                </h2>
                <section className="border-xl flex flex-col rounded-xl border p-4 text-sm">
                  <div className="flex gap-10">
                    <div className="flex flex-col">
                      <h3 className="font-bold"> Prep Time</h3>
                      <span>{recipe.preparationTime || 0} min</span>
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-bold"> Cook Time</h3>
                      <span>{recipe.cookingTime || 0} min</span>
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-bold">Servings</h3>
                      <span>{recipe.servings || 0}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-bold">Tags</h3>
                    <div className="flex gap-2 text-neutral-400 ">
                      {recipe.tags.map((tag) => (
                        <span key={tag.tag.name}>#{tag.tag.name}</span>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            </section>
          </div>
        </section>

        {/* Ingredients */}
        <section className="mx-3 mt-14 rounded-lg bg-primary-gray-100 p-4">
          <h2 className="text-lg font-semibold">Ingredients</h2>
          <div className="mt-4">
            {recipe &&
              recipe.sections.map((ingredientSection) => (
                <div>
                  <p className="mt-3 font-semibold text-neutral-500">
                    {ingredientSection.name}
                  </p>
                  <ul>
                    {ingredientSection &&
                      ingredientSection?.ingredients?.map((ingredient) => (
                        <li className="leading-8">
                          {new Fraction(ingredient.quantity).toFraction(true)}{" "}
                          {ingredient.unit} {ingredient.name}
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
          </div>
        </section>

        {/* Recipe Instructions */}
        <section className="my-8 px-3">
          <h3 className="mb-4 text-xl font-semibold">Instructions</h3>
          <div>
            {recipe && recipe.steps && (
              <ol>
                {recipe.steps.map((step, i) => (
                  <li key={step.id} className="my-2 leading-8">
                    <span className="font-medium">{i + 1}.</span>{" "}
                    {step.instruction}
                  </li>
                ))}
              </ol>
            )}
          </div>
        </section>

        {/* Tips */}
        <section className="mx-4">
          <div className="flex items-center gap-4">
            <LightbulbFilament size={28} color="#d4d4d4" />
            <h3 className="text-lg my-2 font-medium text-neutral-400">Tips</h3>
          </div>

          <div className="my-2 h-[200px] rounded-xl border p-4">
            <p className="text-neutral-400">No tips yet</p>
          </div>
        </section>

        {/* Recipe Reviews */}
        <section>
          <h3 className="mb-4 mt-10 text-2xl font-semibold">Reviews</h3>
          <div className="flex gap-4">
            {recipe &&
              recipe.reviews.map((review) => (
                <article className="w-1/2 rounded-lg border p-4">
                  <div className="mb-4 h-48 w-full">
                    {/* <img
                        src={review.picturePath}
                        className="h-full w-full rounded object-cover"
                        alt="Review image"
                      /> */}
                  </div>
                  <div className="flex flex-col">
                    <span>{review.rating} ⭐️</span>
                    <span>{review.userText}</span>
                  </div>
                </article>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
};
export default RecipePage;
