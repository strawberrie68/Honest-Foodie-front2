import React, { useState } from "react";
import { Images } from "@phosphor-icons/react";

const ImageUpload = ({ onImageChange }) => {
  const [previewImage, setPreviewImage] = useState("");

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result;
        setPreviewImage(imageDataUrl);
        // Call the prop function to send image data to parent
        if (onImageChange) {
          onImageChange({
            file: file,
            previewUrl: imageDataUrl,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setPreviewImage(url);
    // Call the prop function to send URL to parent
    if (onImageChange) {
      onImageChange({
        file: null,
        previewUrl: url,
      });
    }
  };

  return (
    <div>
      <div className="rounded-lg bg-white">
        <div className="flex flex-col gap-6 md:w-full md:flex-row">
          {/* Image Preview */}
          <div className="w-[320px]">
            <div
              className={`flex h-96 items-center justify-center rounded-lg border-2 border-dashed 
                ${previewImage ? "border-black" : "border-gray-300"}`}
            >
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Recipe preview"
                  className="max-h-full rounded-lg object-cover"
                />
              ) : (
                <div className="text-center text-gray-400">
                  <Images size={48} className="mx-auto mb-2" />
                  <p>Upload recipe image</p>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImagePreview}
              className="hidden"
              id="imageUpload"
            />
            <label
              htmlFor="imageUpload"
              className="mt-4 block w-full cursor-pointer rounded-lg border border-black 
              bg-neutral-100 py-2 text-center font-bold text-black shadow-md transition-colors hover:bg-black hover:text-white"
            >
              Choose File
            </label>
          </div>

          {/* Image URL Input */}
          <div className="flex-grow">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Or paste image URL
            </label>
            <input
              type="text"
              placeholder="https://example.com/recipe-image.jpg"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 
              focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleUrlChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
