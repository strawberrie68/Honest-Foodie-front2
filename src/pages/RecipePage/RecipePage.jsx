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
  const [recipe, setRecipe] = useState(null);

  const getRecipe = async () => {
    const result = await axios

      .get(`http://localhost:3003/api/recipe/${recipeId}`)
      .then((response) => {
        setRecipe(response.data);
        return response.data;
      });
  };

  useEffect(() => {
    getRecipe();
  }, [recipeId]);

  return (
    <div className="flex">
      <NavBar />
      <div className="sm:mx-3">
        <div className="flex h-14 w-full border-b px-2 py-4 sm:hidden">
          <Link onClick={() => navigate(-1)}>
            <div className="basis-1/5">
              <CaretLeft size={28} />
            </div>
          </Link>
        </div>
        {/* Recipe description */}
        <div className="sm:px-10 m-auto max-w-2xl">
          <div className="sm:mt-16 flex flex-col sm:ml-6 max-w-lg w-full m-4">
            <h1 className="text-2xl font-semibold">{recipe?.title}</h1>
            <div className="flex mt-4 flex-col sm:flex-row">
              <div className="basis-3/5">
                <img
                  className="rounded-xl object-cover w-full"
                  src={recipe?.picturePath}
                />
              </div>
              <div className="basis-3/5 sm:px-6 flex flex-col justify-between">
                <div className="mt-10 sm:mt-0">
                  <div className="font-bold">Description</div>
                  <div className="flex flex-col">
                    {/* TODO get the stars to show the number of stars */}
                    <div className="flex pt-3 pb-2">
                      <StarRatings
                        rating={recipe?.rating}
                        starRatedColor="#365585"
                        numberOfStars={5}
                        name="rating"
                        starDimension="15px"
                      />
                    </div>
                    {/* TODO get the number of reviews */}
                    <div className="flex gap-1 text-sm mb-2 text-gray-500">
                      <div className="font-bold sm:pl-2">
                        {recipe?.review.length}
                      </div>
                      <div className="">reviews</div>
                    </div>
                  </div>
                  <div className="mt-2 text-sm line-clamp-5 h-16">
                    {recipe?.description}
                  </div>
                </div>

                <div className="flex mt-6 items-center gap-2">
                  <div className="flex border rounded-full">
                    <img
                      className="object-contain h-5 rounded-full"
                      src={recipe?.userId.picturePath}
                    />
                  </div>
                  <div className="text-sm font-medium">
                    {recipe?.userId.username}
                  </div>
                </div>
                <div>
                  <div className="mt-5 mb-4 font-medium text-gray-300">
                    Recipe Info
                  </div>
                  <div className="flex flex-col border rounded-xl p-4">
                    <div className="border-xl">
                      <div className="flex text-sm flex-col">
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
                          <div className="text-neutral-400 flex gap-2 ">
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
          <div className="bg-primary-gray-100 mt-14 rounded-lg p-4 mx-3">
            <p className="text-lg font-semibold">Ingredients</p>
            <div className="mt-4">
              {recipe?.ingredients.map((ingredientSection) => (
                <div>
                  <p className="mt-3 font-semibold text-neutral-500">
                    {ingredientSection.ingredientsFor}
                  </p>
                  <ul>
                    {ingredientSection.allIngredients.map((ingredient) => (
                      <li className="leading-8">
                        {new Fraction(ingredient.amount).toFraction(true)}{" "}
                        {ingredient.unit} {ingredient.ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          {/* Recipe Instructions */}
          <div className="my-8 px-3">
            <p className="text-xl font-semibold mb-4">Instructions</p>
            <div>
              {recipe?.steps.map((step, i) => (
                <div>
                  <p className="text-xl mt-8 font-medium text-neutral-600">
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
            <div className="flex gap-4 items-center">
              <LightbulbFilament size={28} color="#d4d4d4" />
              <p className="text-lg my-2 font-medium text-neutral-400">Tips</p>
            </div>

            <div className="border rounded-xl h-[200px] my-2"></div>
          </div>
          {/* Recipe Reviews */}
          <div>
            <p className="text-2xl mt-10 font-semibold mb-4">Reviews</p>
            {/* TODO show recipe reviews here */}
            {/* {recipe?.review.map((review) => (
            <div>
              <CommentCard />
            </div>
          ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default RecipePage;
