import { useEffect } from "react";

const ResponsiveImage = ({
  imageUrl,
  alt,
  className,
  size = "medium",
  isLCP = false,
}) => {
  const sizes = {
    small: { width: 190, height: 107 },
    medium: { width: 380, height: 214 },
    large: { width: 512, height: 288 },
  };

  const { width, height } = sizes[size];
  const optimizedUrl = imageUrl.includes("unsplash.com")
    ? imageUrl.replace(/w=\d+/, `w=${width}`)
    : imageUrl;

  useEffect(() => {
    if (isLCP) {
      // Preconnect to Unsplash
      const link = document.createElement("link");
      link.rel = "preconnect";
      link.href = "https://images.unsplash.com";
      document.head.appendChild(link);

      // Preload image
      const preloadLink = document.createElement("link");
      preloadLink.rel = "preload";
      preloadLink.as = "image";
      preloadLink.href = optimizedUrl;
      preloadLink.fetchPriority = "high";
      document.head.appendChild(preloadLink);

      return () => {
        document.head.removeChild(link);
        document.head.removeChild(preloadLink);
      };
    }
  }, [optimizedUrl, isLCP]);

  return (
    <div className="relative w-full">
      <img
        src={optimizedUrl}
        width={width}
        height={height}
        loading={isLCP ? "eager" : "lazy"}
        fetchpriority={isLCP ? "high" : "auto"}
        decoding="sync"
        alt={alt}
        className={`h-auto w-full object-cover ${className}`}
      />
    </div>
  );
};

export default ResponsiveImage;
