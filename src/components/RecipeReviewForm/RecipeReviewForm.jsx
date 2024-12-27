import React, { useState } from "react";
import { Star } from "lucide-react";
import { useSelector } from "react-redux";
const RecipeReviewForm = ({ onHandleSubmitReview }) => {
  const user = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    imageUrl: "",
    rating: 0,
    reviewText: "",
    userId: user.id,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRatingChange = (ratingValue) => {
    setFormData((prevState) => ({
      ...prevState,
      rating: ratingValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Submitted:", formData);
    await onHandleSubmitReview(formData);
    setFormState({
      reviewText: "",
      rating: 0,
      imageUrl: "",
    });
  };

  return (
    <div className="mx-auto mt-12 max-w-xl">
      <h3 className="mb-4 text-3xl font-bold text-gray-900">Reviews</h3>
      <p className="mb-6 text-gray-600">
        Share your experience with this recipe
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-lg border bg-gray-50 p-6"
      >
        {/* Image Link Section */}
        <div>
          <label
            htmlFor="imageUrl"
            className="mb-2 block text-sm font-medium text-gray-800"
          >
            Image Link
          </label>
          <input
            required
            id="imageUrl"
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            placeholder="Paste your image URL"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Rating Section */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-800">
            Your Rating
          </label>
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((star, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  className={`
                    ${index <= formData.rating ? "text-yellow-500" : "text-gray-300"}
                    cursor-pointer text-2xl transition-colors duration-200
                  `}
                  onClick={() => handleRatingChange(index)}
                  role="radio"
                  aria-checked={index === formData.rating}
                  aria-label={`Rate ${index} star${index > 1 ? "s" : ""}`}
                >
                  <Star fill={index <= formData.rating ? "#FBBF24" : "none"} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Review Textarea */}
        <div>
          <label
            htmlFor="reviewText"
            className="mb-2 block text-sm font-medium text-gray-800"
          >
            Your Review
          </label>
          <textarea
            required
            id="reviewText"
            name="reviewText"
            value={formData.reviewText}
            onChange={handleInputChange}
            rows="4"
            className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Share your thoughts about the recipe..."
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="w-44 rounded-lg bg-black py-3 font-medium text-white transition-colors hover:bg-gray-800"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecipeReviewForm;
