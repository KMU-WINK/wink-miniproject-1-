import React from 'react';
import { useNavigate } from 'react-router-dom';

const WritePostButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/WrittingPage');
  };

  return (
    <button onClick={handleClick} style={StyleSheet.button}>
      새로운 이야기 만들기
    </button>
  );
};

const styles = {
  button: {
    backgroundColor: '#969595',
    color: 'white',
    padding: '11px 3px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '20px',
  },
};

export default WritePostButton;