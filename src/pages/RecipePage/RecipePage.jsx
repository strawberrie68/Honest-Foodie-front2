import NavBar from "../../components/NavBar/NavBar";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Fraction from "fraction.js";
import { Link, useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";

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
          `http://localhost:3003/api/recipe/${recipeId}`,
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

  return (
    <div className="flex">
      <NavBar />
      <div className="pl-20 sm:mx-3">
        <div className="flex h-14 w-full border-b px-2 py-4 sm:hidden">
          <Link onClick={() => navigate(-1)}>
            <div className="basis-1/5">
              <CaretLeft size={28} />
            </div>
          </Link>
        </div>
        {/* Recipe description */}
        <div className="m-auto max-w-2xl pl-8 pr-9 sm:p-10">
          <div className="m-4 flex w-full max-w-lg flex-col sm:ml-6 sm:mt-16">
            <h1 className="text-2xl font-semibold">
              {recipe.title || "Untitled Recipe"}
            </h1>
            <div className="mt-4 flex flex-col sm:flex-row">
              <div className="w-full md:basis-3/5">
                <img
                  className="rounded-xl object-cover"
                  src={recipe.picturePath}
                />
              </div>
              <div className="flex basis-3/5 flex-col justify-between sm:px-6">
                <div className="mt-10 sm:mt-0">
                  <div className="font-bold">Description</div>
                  <div className="flex flex-col">
                    {/* TODO get the stars to show the number of stars */}
                    <div className="flex pb-2 pt-3">
                      <StarRatings
                        rating={recipe?.rating}
                        starRatedColor="#365585"
                        numberOfStars={5}
                        name="rating"
                        starDimension="15px"
                      />
                    </div>
                    {/* TODO get the number of reviews */}
                    <div className="mb-2 flex gap-1 text-sm text-gray-500">
                      <div className="font-bold sm:pl-2">
                        {recipe?.review?.length || 0}
                      </div>
                      <div className="">reviews</div>
                    </div>
                  </div>
                  <div className="mt-2 line-clamp-5 h-16 text-sm">
                    {recipe?.description}
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2">
                  <div className="flex rounded-full border">
                    <img
                      className="h-5 rounded-full object-contain"
                      src={recipe?.userId.picturePath}
                    />
                  </div>
                  <div className="text-sm font-medium">
                    {recipe?.userId.username}
                  </div>
                </div>
                <div>
                  <div className="mb-4 mt-5 font-medium text-gray-300">
                    Recipe Info
                  </div>
                  <div className="flex flex-col rounded-xl border p-4">
                    <div className="border-xl">
                      <div className="flex flex-col text-sm">
                        <div className="flex gap-10">
                          <div className="flex flex-col">
                            <div className="font-bold"> Prep Time</div>
                            <div>
                              {recipe?.time.hours} hr {recipe?.time.minutes} min
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <div className="font-bold">Servings</div>
                            <div>{recipe?.servings}</div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="font-bold">Tags</div>
                          <div className="flex gap-2 text-neutral-400 ">
                            {recipe?.tags.map((tag) => (
                              <p key={tag}>#{tag}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="mt-5 text-sm flex justify-center text-[#365585]">
                  Link to Recipe
                </div> */}
                </div>
              </div>
            </div>
          </div>
          {/* Ingredients */}
          <div className="mx-3 mt-14 rounded-lg bg-primary-gray-100 p-4">
            <p className="text-lg font-semibold">Ingredients</p>
            <div className="mt-4">
              {recipe &&
                recipe?.ingredients.map((ingredientSection) => (
                  <div>
                    <p className="mt-3 font-semibold text-neutral-500">
                      {ingredientSection.section}
                    </p>
                    <ul>
                      {ingredientSection &&
                        ingredientSection?.items?.map((ingredient) => (
                          <li className="leading-8">
                            {new Fraction(ingredient.amount).toFraction(true)}{" "}
                            {ingredient.unit} {ingredient.name}
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
            </div>
          </div>
          {/* Recipe Instructions */}
          <div className="my-8 px-3">
            <p className="mb-4 text-xl font-semibold">Instructions</p>
            <div>
              {recipe &&
                recipe?.steps.map((step, i) => (
                  <div>
                    <p className="mt-8 text-xl font-medium text-neutral-600">
                      {step.stepName}
                    </p>
                    <ol>
                      {step.step.map((instruction, i) => (
                        <li className="my-2 leading-8">
                          <span className="font-medium">{i + 1}.</span>{" "}
                          {instruction}
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
            </div>
          </div>
          <div className="mx-4">
            <div className="flex items-center gap-4">
              <LightbulbFilament size={28} color="#d4d4d4" />
              <p className="text-lg my-2 font-medium text-neutral-400">Tips</p>
            </div>

            <div className="my-2 h-[200px] rounded-xl border p-4">
              <p className="text-neutral-400">No tips yet</p>
            </div>
          </div>
          {/* Recipe Reviews */}
          <div>
            <p className="mb-4 mt-10 text-2xl font-semibold">Reviews</p>
            <div className="flex">
              {recipe &&
                recipe.reviews.map((review) => (
                  <article className="w-1/2 rounded-lg border p-4">
                    <div className="mb-4 h-48 w-full">
                      <img
                        src={review.picturePath}
                        className="h-full w-full rounded object-cover"
                        alt="Review image"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span>{review.rating} ⭐️</span>
                      <span>{review.userReview}</span>
                    </div>
                  </article>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RecipePage;
