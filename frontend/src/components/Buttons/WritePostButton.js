import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledButton = styled.button`
    background-color: #969595;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 20px;
    width: 200px;
    height: 50px;
    font-weight: 500; 
    text-align: center;  
`;

const WritePostButton = () => {
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.stopPropagation(); // 이벤트 버블링 막기
        console.log('Button clicked'); // 콘솔 로그 추가
        navigate('/WrittingPage');
    };

    return (
        <div onClick={() => console.log('Div clicked')}>
            <StyledButton onClick={handleClick}>
                새로운 이야기 만들기
            </StyledButton>
        </div>
    );
};

export default WritePostButton;