import { Plus, X } from "@phosphor-icons/react";
const FormTag = ({ tagFields, appendTag, removeTag, register }) => {
  return (
    <div className="mt-6">
      <label className="text-lg font-semibold">Tags</label>
      <div className="mb-2 flex flex-wrap gap-2">
        {tagFields.map((tag, index) => (
          <div
            key={tag.id}
            className="flex items-center rounded-lg bg-neutral-100 px-2 py-1"
          >
            <input
              className="w-24 bg-transparent focus:outline-none"
              placeholder="Add tag"
              {...register(`tags.${index}`)}
            />
            {tagFields.length > 1 && (
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="ml-2 text-gray-500 hover:text-red-800"
              >
                <X size={16} />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Add Tag Button */}
      <button
        type="button"
        onClick={() => appendTag("")}
        className="flex items-center px-4 py-2 text-black hover:rounded-lg hover:border hover:border-black hover:font-bold"
      >
        <Plus size={20} className="mr-2" /> Add Tag
      </button>
    </div>
  );
};

export default FormTag;
