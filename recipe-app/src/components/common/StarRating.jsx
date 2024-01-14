import React, { useState } from 'react';
import './StarRating.scss';

const StarRating = ({ totalStars = 5, initialRating = 0, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);

  const handleRating = (newRating) => {
    setRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  let stars = [];
  for (let i = 1; i <= totalStars; i++) {
    let starClass = 'star-rating__star ';
    if (i <= rating) {
      starClass += 'star-rating__star--full';
    } else {
      starClass += 'star-rating__star--empty';
    }
    stars.push(
      <i key={i} className={`fas fa-star ${starClass}`} onClick={() => handleRating(i)}></i>
    );
  }

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;

