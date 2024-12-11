import { useFieldArray } from "react-hook-form";
import { Trash, PlusCircle, X } from "@phosphor-icons/react";
import { inputStyle, labelStyle } from "../../constants/style";
const FormIngredient = ({
  control,
  register,
  sectionIndex,
  section,
  removeSection,
}) => {
  const {
    fields: ingredientFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.ingredients`,
  });

  return (
    <div key={section.id} className="flex flex-col gap-2 pb-4">
      {/* Section Name */}
      <div className="flex flex-col rounded-lg border border-black bg-white shadow-sm">
        <div className="px-4 pt-4">
          <div className="flex flex-col">
            <label htmlFor="section" className={`${labelStyle}`}>
              Section Name
            </label>
            <div className="flex w-full ">
              <input
                type="text"
                {...register(`sections.${sectionIndex}.name`)}
                placeholder="Section Name (e.g., Cake, Frosting)"
                className={`w-full ${inputStyle}`}
              />

              {removeSection && (
                <button
                  type="button"
                  onClick={() => removeSection(sectionIndex)}
                  className="ml-4 text-gray-500 transition-colors hover:text-red-700"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>
          <hr className="my-4"></hr>
          <div>
            {ingredientFields.map((ingredient, ingredientIndex) => (
              <div key={ingredient.id} className="my-2 flex items-center gap-2">
                <div className="flex w-20 flex-col">
                  <label className={`${labelStyle}`}>Amount</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="2"
                    {...register(
                      `sections.${sectionIndex}.ingredients.${ingredientIndex}.amount`,
                    )}
                    className={`${inputStyle}`}
                  />
                </div>
                <div className="flex w-20 flex-col">
                  <label className={`${labelStyle}`}>Unit</label>
                  <input
                    type="text"
                    placeholder="cups"
                    {...register(
                      `sections.${sectionIndex}.ingredients.${ingredientIndex}.unit`,
                    )}
                    className={`${inputStyle}`}
                  />
                </div>

                <div className="flex flex-1 flex-col">
                  <label className={`${labelStyle}`}>Ingredient</label>
                  <input
                    type="text"
                    placeholder="AP flour"
                    {...register(
                      `sections.${sectionIndex}.ingredients.${ingredientIndex}.ingredient`,
                    )}
                    className={` ${inputStyle}`}
                  />
                </div>

                {ingredientFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(ingredientIndex)}
                    className="pt-6 text-gray-500 transition-colors hover:text-red-700"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Add Ingredient Button */}
        <button
          type="button"
          onClick={() => append({ amount: "", unit: "", ingredient: "" })}
          className="mt-4 flex items-center rounded-b-lg border bg-gray-100 p-4 font-bold text-neutral-500 transition-colors hover:bg-black hover:text-white"
        >
          <PlusCircle size={20} className="mr-2 font-bold" /> Add Additional
          Ingredient
        </button>
      </div>
    </div>
  );
};

export default FormIngredient;
