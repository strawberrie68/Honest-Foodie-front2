const RecipeReviewCard = ({ review }) => {
  const { imageUrl, reviewText, rating } = review;

  return (
    <article className="w-[185px] rounded-lg border">
      <div className="mb-4 h-48">
        <img
          src={imageUrl}
          className="h-full w-full rounded object-cover"
          alt="Review food"
          loading="lazy"
        />
      </div>
      <div className="flex gap-4 p-2">
        <span className="text-gray-500">{reviewText}</span>
        <span className="basis-12 font-bold">{rating} ⭐️</span>
      </div>
    </article>
  );
};

export default RecipeReviewCard;
