import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledButton = styled.button`
    background-color: #969595;
    color: white;
    padding: 0px 11px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 20px;
    width: 200px;
    height: 30px;
    font-weight: 500; 
    text-align: center;  
`;

const WritePostButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/WrittingPage');
    };

    return (
        <StyledButton onClick={handleClick}>
            새로운 이야기 만들기
        </StyledButton>
    );
};

export default WritePostButton;