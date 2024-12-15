import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { CaretLeft, PlusCircle } from "@phosphor-icons/react";
import { labelStyle, inputStyle } from "../../constants/style";
import NavBar from "../../components/NavBar/NavBar";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import FormIngredient from "../../components/FormIngredient/FormIngredient";
import FormSteps from "../../components/FormSteps/FormSteps";
import FormTag from "../../components/FormTag/FormTag";

const AddRecipe = () => {
  const apiUrl = process.env.VITE_API_URL || "";

  const user = useSelector((state) => state.auth.user);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      servings: 1,
      preparationTime: 0,
      cookingTime: 0,
      tags: [""],
      sections: [
        { name: "", ingredients: [{ amount: "", unit: "", ingredient: "" }] },
      ],
      steps: [{ instruction: "" }],
      user: "",
    },
  });

  const {
    fields: sectionFields,
    append: appendSection,
    remove: removeSection,
  } = useFieldArray({
    control,
    name: "sections",
  });

  const {
    fields: stepFields,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray({
    control,
    name: "steps",
  });

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control,
    name: "tags",
  });

  const navigate = useNavigate();
  const [recipeImage, setRecipeImage] = useState(null);

  const handleImageChange = (imageData) => {
    setRecipeImage(imageData);
  };

  const postRecipe = async (recipeData) => {
    try {
      const response = await axios.post(`${apiUrl}/api/recipes`, {
        recipeData,
      });
      return response.data;
    } catch (error) {
      console.error("error adding recipe", error);
    }
  };

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      servings: Number(data.servings),
      preparationTime: Number(
        (data.prepHours || 0) * 60 + (data.prepMinutes || 0),
      ),
      cookingTime: Number((data.cookHours || 0) * 60 + (data.cookMinutes || 0)),
      sections: data.sections.map((section) => ({
        ...section,
        ingredients: section.ingredients.filter((ing) => ing.ingredient),
      })),
      steps: data.steps.map((step, index) => ({
        orderNumber: index + 1,
        instruction: step.instruction,
      })),
      tags: data.tags.filter((tag) => tag),
      imageUrl: recipeImage.previewUrl,
      user: user.id,
    };

    delete formattedData.prepHours;
    delete formattedData.prepMinutes;
    delete formattedData.cookHours;
    delete formattedData.cookMinutes;

    postRecipe(formattedData);
  };

  return (
    <div className="mb-18 flex h-screen w-full flex-col xs:flex-row">
      <div className="fixed bottom-0 z-10 order-last w-full xs:order-first xs:w-10">
        <NavBar />
      </div>
      <div className="w-full">
        <nav className="sticky top-0 z-30 flex h-14 w-full border-b bg-white px-2 py-4 md:hidden">
          <Link onClick={() => navigate(-1)}>
            <div className="basis-1/5">
              <CaretLeft size={28} />
            </div>
          </Link>
        </nav>
        <main className="mx-auto mt-6 flex w-full max-w-3xl flex-col gap-12 overflow-hidden px-8 md:mt-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="mb-8 mt-4 text-3xl font-semibold md:mt-8">
              Add Recipe
            </h1>

            <div className="flex flex-col gap-8">
              {/* Image Upload Section */}
              <section className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Recipe Image
                  </h2>
                  <p className="text-gray-600">
                    Please upload or link an image
                  </p>
                </div>
                <ImageUpload onImageChange={handleImageChange} />
              </section>

              {/* Recipe Information */}
              <div className="mb-20 flex flex-col gap-4">
                <section className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Recipe Information
                    </h2>
                    <p className="text-gray-600">
                      Please add additional information about your recipe
                    </p>
                  </div>
                  {/* Title */}
                  <div>
                    <label htmlFor="Title" className={`${labelStyle}`}>
                      Recipe Name
                    </label>
                    <input
                      type="text"
                      {...register("title", {
                        required: "Recipe name is required",
                      })}
                      placeholder="e.g., Strawberry Shortcake"
                      className={`${inputStyle} w-full ${errors.title ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.title && (
                      <p className="text-xs mt-1 text-red-500">
                        {errors.title.message}
                      </p>
                    )}
                  </div>
                </section>

                {/* Description */}
                <section>
                  <label htmlFor="Description" className={`${labelStyle}`}>
                    Description
                  </label>
                  <textarea
                    type="text"
                    {...register("description")}
                    placeholder="A brief description of the recipe"
                    className={`min-h-[100px] w-full resize-none ${inputStyle}`}
                  />
                </section>

                {/* Servings */}
                <section className="">
                  <label htmlFor="Servings" className={`${labelStyle}`}>
                    Servings
                  </label>
                  <input
                    type="number"
                    {...register("servings", { min: 1 })}
                    placeholder="Number of servings"
                    className={`${inputStyle} w-3/4 max-w-[150px]`}
                  />
                </section>

                {/* Cooking Time */}
                <section className="mb-10 flex flex-col">
                  {/* Prep Time */}
                  <span className={`${labelStyle}`}>Cooking Time</span>
                  <div className="flex max-w-lg flex-col gap-8 rounded-lg border bg-gray-50 p-4 shadow-sm">
                    <div className="w-full md:w-3/4">
                      <label
                        htmlFor="PrepHours"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Preparation Time
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          {...register("prepHours", { min: 0 })}
                          placeholder="Hours"
                          className={`${inputStyle} flex-1`}
                        />

                        <input
                          type="number"
                          {...register("prepMinutes", { min: 0, max: 59 })}
                          placeholder="Minutes"
                          className={`${inputStyle} flex-1`}
                        />
                      </div>
                    </div>
                    <div className="w-full md:w-3/4">
                      {/* Cook Time */}
                      <label
                        htmlFor="cookHours"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Cooking Time
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          {...register("cookHours", { min: 0 })}
                          placeholder="Hours"
                          className={`${inputStyle} flex-1`}
                        />
                        <input
                          type="number"
                          {...register("cookMinutes", { min: 0, max: 59 })}
                          placeholder="Minutes"
                          className={`${inputStyle} flex-1`}
                        />
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  {/* Ingredients Sections */}
                  <div className="mt-6">
                    <h2 className="text-lg mb-4 font-semibold text-gray-700 ">
                      Ingredients
                    </h2>

                    {sectionFields.map((section, sectionIndex) => (
                      <FormIngredient
                        key={section.id}
                        control={control}
                        register={register}
                        sectionIndex={sectionIndex}
                        section={section}
                        removeSection={removeSection}
                      />
                    ))}

                    {/* Add Section Button */}
                    <button
                      type="button"
                      onClick={() =>
                        appendSection({
                          name: "",
                          ingredients: [
                            { amount: "", unit: "", ingredient: "" },
                          ],
                        })
                      }
                      className="flex items-center px-4 py-2 text-neutral-500 transition-colors hover:rounded-lg hover:border hover:border-black hover:font-bold hover:text-black"
                    >
                      <PlusCircle size={20} className="mr-2" /> Add Ingredient
                      Section
                    </button>
                  </div>
                </section>

                {/* Steps */}
                <FormSteps
                  stepFields={stepFields}
                  register={register}
                  appendStep={appendStep}
                  removeStep={removeStep}
                />

                {/* Tags */}
                <FormTag
                  tagFields={tagFields}
                  register={register}
                  appendTag={appendTag}
                  removeTag={removeTag}
                />

                {/* Submit Button */}
                <button
                  class="group relative mt-8 h-14 w-full overflow-hidden rounded-full bg-black px-4 py-2 font-bold text-white shadow-md"
                  value="Add Recipe"
                  type="submit"
                >
                  <span class="absolute inset-0 bg-gradient-to-b from-gray-500 via-transparent to-gray-500 opacity-0 transition duration-300 group-hover:opacity-80"></span>
                  <span class="relative z-10">Add recipe</span>
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default AddRecipe;
