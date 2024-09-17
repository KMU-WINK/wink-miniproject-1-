import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    background-color: #100F0F;
    color: white;
    padding: 0px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    width: 160px;  
    height: 30px;  
    font-weight: 500; 
    text-align: center; 
`;

const MoreInfoButton = () => {
    const handleClick = () => {
        window.location.href = 'https://taei1.tistory.com/';
    };

    return (
        <StyledButton onClick={handleClick}>
            더 알아보기
        </StyledButton>
    );
};

export default MoreInfoButton;