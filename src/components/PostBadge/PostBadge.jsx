import React from "react";

const PostBadge = ({ children, isReview = false, className = "" }) => {
  return (
    <div
      className={`
        absolute 
        m-4 
        rounded-3xl 
        border 
        border-white 
        border-opacity-25 
        px-4 
        py-1
        text-white
        backdrop-blur-md
        ${className}
      `}
      aria-label={isReview ? "Review content" : "Recipe content"}
    >
      <span className="text-xxs font-medium">{children}</span>
    </div>
  );
};

export default PostBadge;
