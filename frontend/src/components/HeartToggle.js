import React from 'react';
import emptyHeart from '../assets/emptyHeart.png';
import filledHeart from '../assets/filledHeart.png';

const HeartToggle = ({ isFilled, onClick }) => {
  return (
    <div onClick={e => { e.stopPropagation(); onClick(e); }} style={{ cursor: 'pointer' }}>
      {isFilled ? (
        <img src={filledHeart} alt="Filled Heart" style={{ width: '30px', height: '30px' }} />
      ) : (
        <img src={emptyHeart} alt="Empty Heart" style={{ width: '30px', height: '30px' }} />
      )}
    </div>
  );
};

export default HeartToggle;