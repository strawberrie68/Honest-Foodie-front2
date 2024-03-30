import NavBar from "../../components/NavBar/NavBar";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { CaretLeft } from "@phosphor-icons/react";

const formatIngredients = (inputIngredients) => {
  const recipeLines = inputIngredients
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "");

  let ingredients = [];
  let currentCategory = { ingredientsFor: null, allIngredients: [] };

  recipeLines.forEach((line) => {
    if (line.startsWith("-")) {
      let [amount, unit, ...ingredientParts] = line.slice(1).trim().split(" ");
      const ingredientName = ingredientParts.join(" ");

      //Convert fractions to decimals
      if (amount.includes("/")) {
        const [numerator, denominator] = amount.split("/");
        amount =
          Math.round((Number(numerator) / Number(denominator)) * 100) / 100;
      } else {
        amount = Math.round(Number(amount) * 100) / 100;
      }

      currentCategory.allIngredients.push({
        amount,
        unit,
        ingredient: ingredientName,
      });
    } else {
      if (currentCategory.allIngredients.length > 0) {
        ingredients.push(currentCategory);
      }
      currentCategory = { ingredientsFor: line, allIngredients: [] };
    }
  });

  if (currentCategory.allIngredients.length > 0) {
    ingredients.push(currentCategory);
  }

  return ingredients;
};

const formatSteps = (inputSteps) => {
  const stepLines = inputSteps
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "");

  let steps = [];
  let currentStepCategory = { stepName: null, step: [] };

  stepLines.forEach((line) => {
    if (line.startsWith("-")) {
      const step = line.slice(1).trim();
      currentStepCategory.step.push(step);
    } else {
      if (currentStepCategory.step.length > 0) {
        steps.push(currentStepCategory);
      }
      currentStepCategory = { stepName: line, step: [] };
    }
  });

  if (currentStepCategory.step.length > 0) {
    steps.push(currentStepCategory);
  }

  return steps;
};

const AddRecipe = () => {
  const { register, control, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { hour, minutes, inputIngredients, inputSteps, inputTags, ...rest } =
      data;
    const time = { hour: hour || 0, minutes: minutes || 0 };
    const tags = inputTags.split(",").map((tag) => tag.trim());

    const ingredients = formatIngredients(inputIngredients);
    const steps = formatSteps(inputSteps);

    const formattedData = { ...rest, time, ingredients, steps, tags };
    console.log(formattedData);
    //TODO send data to backend once login is implemented
  };
  return (
    <div className="flex flex-col xs:flex-row h-screen w-full">
      <div className="w-full xs:w-10 order-last xs:order-first fixed bottom-0 z-10">
        <NavBar />
      </div>
      <div className="w-full">
        <div className="flex sticky top-0 h-14 w-full border-b px-2 py-4 sm:hidden z-30 bg-white">
          <Link onClick={() => navigate(-1)}>
            <div className="basis-1/5">
              <CaretLeft size={28} />
            </div>
          </Link>
        </div>
        <div className="mt-8 xs:mt-16 xs:pl-24 flex m-auto  w-full max-w-3xl flex-col xs:ml-6 mx-10 overflow-hidden">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-2xl font-semibold">Add Recipe</h1>
            <div className="flex mt-6 gap-6 flex-col xs:flex-row">
              <div className="flex flex-col">
                <p className="font-semibold">Upload image</p>
                {/* TODO if no image is uploaded, show a gray background with a plus sign */}
                <div className="h-[300px] w-4/5 xs:w-[200px] rounded-xl bg-neutral-100 flex xs:flex-col flex-row items-center p-4 mt-4 justify-center text-center">
                  <p className="text-sm text-neutral-400">
                    Drag to upload image
                  </p>
                </div>
                <label className="text-sm mt-4">Link to image</label>
                <input
                  className="bg-white border w-3/4 xs:w-full border-neutral-200 rounded-lg px-2"
                  type="text"
                  {...register("picturePath")}
                />
              </div>
              <div className="xs:pt-8 w-4/5 xs:w-1/2 pr-4">
                <div className="font-bold">Is this a original recipe?</div>
                {/* TODO add toggle button */}
                <div className="mt-4">Toggle Button</div>
                <div className="border rounded-lg mt-4 p-4">
                  <div className="flex flex-col">
                    {/* TODO create a web scrapper to get the recipe from the link */}
                    <label>Link to source</label>
                    <input
                      className="bg-white border border-neutral-200 rounded-lg"
                      type="text"
                    />
                    <input
                      className="mt-4 border px-2 py-1 rounded-lg border-primary-blue-200 hover:bg-blue-200 text-sm font-semibold"
                      type="button"
                      value="Get recipe and smart fill"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-3/4">
              <div className="font-semibold mt-8 mb-4">Recipe Information</div>
              <div className="flex flex-col pt-2">
                <label className="text-sm font-semibold">Recipe Name </label>
                <input
                  className="border rounded-lg px-2 my-2 w-3/5"
                  placeholder="ie. Strawberry Shortcake"
                  type="text"
                  {...register("title")}
                />
              </div>

              <div className="flex flex-col mb-10">
                <div className="flex gap-10">
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold">Servings</label>
                    <input
                      className="border rounded-lg px-2 my-2 w-28"
                      placeholder="0"
                      type="number"
                      {...register("servings")}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold">Time</label>
                    <div className="flex items-center gap-2">
                      <input
                        className="border rounded-lg px-2 my-2 w-10"
                        placeholder="0"
                        {...register("hour")}
                      />
                      <p>hr</p>
                      <input
                        className="border rounded-lg px-2 my-2 w-12"
                        placeholder="0"
                        {...register("minutes", { max: 59 })}
                        maxLength={2}
                      />
                      <p>min</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col mt-6">
                  <label className="text-sm font-semibold mb-1">
                    Ingredients
                  </label>
                  <p className="text-sm mt-1 text-primary-blue-200 font-medium">
                    Categories
                  </p>
                  <p className="text-sm text-neutral-400">
                    If there are categories of ingredients, separate each
                    category with a heading with no hyphen. For example, "Cake"
                    or "Frosting"
                  </p>
                  <p className="text-sm mt-1 text-primary-blue-200 font-medium">
                    Ingredients
                  </p>
                  <p className="text-sm text-neutral-400">
                    Separate each ingredient by a hyphen. For example "- 1/2
                    cup"
                  </p>
                  {/* TODO give user an option to add ingredients one by one or all at once */}
                  {/* <div className="flex mt-2 gap-4">
                  <input
                    className="border px-4 py-1 rounded-lg"
                    type="button"
                    value="Add one by one"
                  />
                  <input
                    type="button"
                    className="border px-4 py-1 rounded-lg"
                    value="Add all at once"
                  />
                </div> */}
                  <textarea
                    className="border rounded-lg mt-1 px-2 h-36 pt-2"
                    placeholder={
                      "Cake\n- 1/2 cup flour\n- 1 cup sugar\n- 2 eggs\n- 1/2 cup milk"
                    }
                    {...register("inputIngredients")}
                  />
                </div>
                <div className="flex flex-col mt-6">
                  <label className="text-sm font-semibold">Steps</label>
                  <p className="text-sm mt-1 text-primary-blue-200 font-medium">
                    Categories
                  </p>
                  <p className="text-sm text-neutral-400">
                    If there are categories of ingredients, separate each
                    category with a heading with no hyphen. For example, "Cake"
                    or "Frosting"
                  </p>
                  <p className="text-sm mt-1 text-primary-blue-200 font-medium">
                    Ingredients
                  </p>
                  <p className="text-sm text-neutral-400">
                    Separate each step by a hyphen
                  </p>
                  <textarea
                    className="border rounded-lg px-2 mt-1 h-36 pt-2"
                    placeholder={
                      "- Mix flour, baking powder and salt in bowl\n- In a separate bowl mix egg and vanilla\n"
                    }
                    {...register("inputSteps")}
                  />
                </div>
                <div className="flex flex-col mt-6">
                  <label className="text-sm font-semibold">Tags</label>
                  <p className="text-sm text-neutral-400">
                    Separate each tag with a comma
                  </p>
                  <input
                    className="border rounded-lg px-2 mt-1 py-1"
                    placeholder={"strawberry, cake"}
                    {...register("inputTags")}
                  />
                </div>

                <input
                  className="border mt-10 mb-10  rounded-xl border-primary-blue-200 py-2 text-primary-blue-500 font-bold hover:bg-primary-blue-500 hover:text-white"
                  type="submit"
                  value={"Add Recipe"}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
