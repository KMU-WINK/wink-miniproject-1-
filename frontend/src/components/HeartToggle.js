import React, { useState } from 'react';
import emptyHeart from '../assets/emptyHeart.png';
import filledHeart from '../assets/filledHeart.png';

const HeartToggle = () => {
  const [isFilled, setIsFilled] = useState(false);

  const toggleHeart = () => {
    setIsFilled(!isFilled);
  };

  return (
    <div onClick={toggleHeart} style={{ cursor: 'pointer' }}>
      {isFilled ? (
        <img src={filledHeart} alt="Filled Heart" style={{ width: '50px', height: '50px' }} />
      ) : (
        <img src={emptyHeart} alt="Empty Heart" style={{ width: '50px', height: '50px' }} />
      )}
    </div>
  );
};

export default HeartToggle;
