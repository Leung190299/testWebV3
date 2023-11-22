import clsx from 'clsx';
import { useState } from 'react';
import Svg from '../icon/svg';

type StarRatingProps = {
  maxRating: number;
  rating: number;
  onRate(newRating: number): void;
};

const StarRating = ({ maxRating, rating, onRate }: StarRatingProps) => {
  const [hoveredStars, setHoveredStars] = useState(0);
  const [tempRating, setTempRating] = useState(rating);
  const filledStars = Math.round(rating); // Get the number of filled stars

  const handleMouseEnter = (index: number) => {
    setTempRating(0);
    setHoveredStars(index + 1);
  };

  const handleMouseLeave = () => {
    setTempRating(rating);
    setHoveredStars(0);
  };

  const handleClick = (index: number) => {
    const newRating = index + 1;
    onRate(newRating);
  };

  const checkFilled = (index: number) => {
    if (hoveredStars >= index + 1) {
      return true;
    } else if (!hoveredStars && filledStars >= index + 1) {
      return true;
    }
    return false;
  };

  return (
    <div className='flex gap-2 md:gap-4 py-3'>
      {[...Array(maxRating)].map((_, index) => (
        <Svg key={index}
          className={clsx('inline-block h-8 w-8', checkFilled(index) ? 'text-yellow-500' : 'text-neutral-100')}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index)} src="/icons/bold/star-2.svg"
          width={16}
          height={16} />
      ))}
    </div>
  );
};

export default StarRating;
