import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Bar from '../components/Header';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    box-sizing: border-box;
`;

const ButtonWrapper = styled.div`
    margin-top: auto;
    margin-bottom: 40px;    
    display: flex;
    justify-content: center;
`;

const CustomH2 = styled.h2`
    width: 328px;
    height: 48px;
    color: #000;
    text-align: center;
    font-style: normal;
    font-weight: 400;
    margin-top: 50px;
    margin-left: 30px; 
`;

const InputName = styled.textarea`
    width: calc(100% - 150px);
    max-width: 1325px;
    min-height: 40px;
    padding: 10px;
    margin: 20px auto;
    border: 1px solid #C8C8C8;
    border-radius: 5px;
    font-size: 16px;
    margin-left: 75px;
    display: block;
    resize: none; 
    box-sizing: border-box;
`;

const InputStory = styled.textarea`
    width: calc(100% - 150px);
    max-width: 1325px;
    min-height: 40px; 
    padding: 10px;
    margin: 20px auto;
    border: 1px solid #C8C8C8;
    border-radius: 5px;
    font-size: 16px;
    margin-left: 75px;
    display: block;
    resize: vertical; 
    box-sizing: border-box;
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: #E7F8FF;
    color: black;
    border: 1px solid #C8C8C8;
    border-radius: 5px;
    cursor: pointer;
    margin-top: auto;
    margin-bottom: 15px;

    &:hover {
        background-color: #4DCAFF;
        color: white;
    }
`;

const ContinuingStory = () => {
    const inputNameRef = useRef(null);
    const inputStoryRef = useRef(null);
    const location = useLocation(); // DetailPage에서 전달된 storyId 받기
    const storyId = location.state?.storyId;

    const handleButtonClick = async () => {
        const nickname = inputNameRef.current?.value;
        const story = inputStoryRef.current?.value;

        if (!nickname || !story) {
            alert('모든 필드를 입력해주세요.');
            return;
        }

        const response = await fetch('/continuingpage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nickname, story, storyId }),
        });

        if (response.ok) {
            alert('데이터가 성공적으로 저장되었습니다.');
        } else {
            alert('데이터 저장에 실패했습니다.');
        }
    };

    return (
        <PageContainer>
            <Bar />
            <CustomH2>이야기를 이어나가 보세요</CustomH2>
            <label htmlFor="nickname">닉네임</label>
            <InputName
                id="nickname"
                placeholder="사용할 닉네임을 입력해주세요."
                ref={inputNameRef}
            />
            <label htmlFor='story'>내용</label>
            <InputStory
                id="story"
                placeholder="이어갈 소설의 내용을 입력해주세요."
                ref={inputStoryRef}
            />
            <ButtonWrapper>
                <Button onClick={handleButtonClick}>제출하기</Button>
            </ButtonWrapper>
        </PageContainer>
    );
};

export default ContinuingStory;
