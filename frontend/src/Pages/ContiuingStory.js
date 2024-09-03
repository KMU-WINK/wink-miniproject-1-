import React from 'react';
import styled from 'styled-components';
import Bar from '../components/Bars';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start; 
    height: 100vh; 
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

const InputName = styled.input`
    width: 1325px;
    height: 40px;
    padding: 10px;
    margin: 20px 0;
    border: 1px solid #C8C8C8;
    border-radius: 5px;
    font-size: 16px;
    margin-left: 75px;
    display: flex;
    min-width: 240px;
    align-items: center;
    align-self: stretch;
`;

const InputStory = styled.input`
    width: 1325px;
    height: 40px;
    padding: 10px;
    margin: 20px 0;
    border: 1px solid #C8C8C8;
    border-radius: 5px;
    font-size: 16px;
    margin-left: 75px;
    display: flex;
    min-width: 240px;
    align-items: center;
    align-self: stretch;
`;

const MyComponent = () => {
    return <CustomH2>이야기를 이어나가 보세요</CustomH2>;
};

const NameLabel = styled.label`
    align-self: stretch;
    font-style: normal;
    line-height: 140%; /* 22.4px */
    margin-left: 75px;
`;
const StoryLabel = styled.label`
    align-self: stretch;
    font-style: normal;
    line-height: 140%; /* 22.4px */
    margin-left: 75px;
    margin-top: 30px;
`;

const ContinuingStory = () => {
    return (
        <PageContainer>
            <Bar />
            <MyComponent />
            <NameLabel htmlFor="nickname">닉네임</NameLabel>
            <InputName id="nickname" placeholder="사용할 닉네임을 입력해주세요." />
            <StoryLabel htmlFor='story'>내용</StoryLabel>
            <InputStory id="story" placeholder="이어갈 소설의 내용을 입력해주세요." />
        </PageContainer>
    );
}

export default ContinuingStory;
