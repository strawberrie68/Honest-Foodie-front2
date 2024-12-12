import { Trash, Plus, X } from "@phosphor-icons/react";
import { inputStyle, labelStyle } from "../../constants/style";
const FormSteps = ({ stepFields, register, appendStep, removeStep }) => {
  return (
    <div className="mt-6">
      <div className="mb-4 flex items-center justify-between">
        <label className={`${labelStyle}`}>Steps</label>
      </div>

      {/* Step Fields */}
      <div className="space-y-4">
        {stepFields.map((step, index) => (
          <div key={step.id} className="flex items-start gap-3  pb-4 ">
            <span className="text-lg text-gray-600">{index + 1}.</span>
            <div className="flex-1">
              <textarea
                type="text"
                className={`w-full ${inputStyle} min-h-[60px] resize-none`}
                placeholder="Enter step instruction"
                {...register(`steps.${index}.instruction`)}
              />
            </div>
            {stepFields.length > 1 && (
              <button
                type="button"
                onClick={() => removeStep(index)}
                className="text-gray-500 hover:text-red-600"
              >
                <X size={20} />
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() =>
          appendStep({
            orderNumber: stepFields.length + 1,
            instruction: "",
          })
        }
        className="ml-6 flex items-center gap-2 rounded-lg border border-black bg-gray-50 px-4 py-2 font-medium text-black shadow-sm hover:bg-black hover:text-white"
      >
        <Plus size={20} /> Add Step
      </button>
    </div>
  );
};

export default FormSteps;
