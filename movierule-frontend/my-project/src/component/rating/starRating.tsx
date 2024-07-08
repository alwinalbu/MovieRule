import React from "react";

interface StarRatingProps {
  rate: number;
  handleRating?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rate, handleRating }) => {
  const stars = (n: number) => {
    let star = [];
    for (let i = 1; i <= 5; i++) {
      star.push(
        <span
          key={i}
          onClick={() => handleRating && handleRating(i)}
          className={`text-2xl cursor-pointer ${
            i <= n ? "text-yellow-500" : "text-gray-400"
          }`}
        >
          ★
        </span>
      );
    }
    return star;
  };

  return <div className="flex">{stars(rate)}</div>;
};

StarRating.defaultProps = {
  rate: 1,
};

export default StarRating;
