import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledButton = styled.button`
    background-color: #E7F8FF;
    border: 2px solid #C8C8C8; 
    border-radius: 50%; 
    width: 50px; 
    height: 50px; 
    display: flex;
    justify-content: center;
    align-items: center;
    color: #C8C8C8;
    font-size: 40px; 
    font-weight: 500;
    cursor: pointer;
    padding: 0; 

    &:hover {
        background-color: #D0EFFF; 
    }
`;

const Button = () => {
    const navigate = useNavigate(); 
    const handleClick = () => {
        navigate('/continuingstory'); 
    };

    return (
        <StyledButton onClick={handleClick}>
            +
        </StyledButton>
    );
};

export default Button;