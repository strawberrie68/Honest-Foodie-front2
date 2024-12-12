import React, { useState } from "react";
import { Images } from "@phosphor-icons/react";
import { inputStyle, labelStyle } from "../../constants/style";

const ImageUpload = ({ onImageChange }) => {
  const [previewImage, setPreviewImage] = useState("");

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setPreviewImage(url);
    if (onImageChange) {
      onImageChange({
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
                  <p>Paste an image URL</p>
                </div>
              )}
            </div>
          </div>

          {/* Image URL Input */}
          <div className="flex-grow">
            <label htmlFor="image" className={`${labelStyle}`}>
              Paste image URL
            </label>
            <input
              type="text"
              placeholder="https://example.com/recipe-image.jpg"
              className={`w-full ${inputStyle}`}
              onChange={handleUrlChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
