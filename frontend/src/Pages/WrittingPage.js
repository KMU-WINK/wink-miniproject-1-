import React, { useRef, useEffect } from 'react';
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

const InputTitle = styled.textarea`
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

const MyComponent = () => {
    return <CustomH2>새로운 이야기를 만들어보아요!</CustomH2>;
};

const NameLabel = styled.label`
    align-self: stretch;
    font-style: normal;
    line-height: 140%; /* 22.4px */
    margin-left: 75px;
`;

const TitleLabel = styled.label`
    align-self: stretch;
    font-style: normal;
    line-height: 140%; /* 22.4px */
    margin-left: 75px;
    margin-top: 20px;
`;

const StoryLabel = styled.label`
    align-self: stretch;
    font-style: normal;
    line-height: 140%; /* 22.4px */
    margin-left: 75px;
    margin-top: 20px;
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

// Textarea 자동 크기 조절 핸들러
const useAutoResize = (ref) => {
    useEffect(() => {
        const handleInput = () => {
            const textarea = ref.current;
            textarea.style.height = 'auto'; 
            textarea.style.height = `${textarea.scrollHeight}px`; 
        };

        const textarea = ref.current;
        textarea.addEventListener('input', handleInput);
        return () => textarea.removeEventListener('input', handleInput);
    }, [ref]);
};

const ContinuingStory = () => {
    const inputStoryRef = useRef(null);
    useAutoResize(inputStoryRef);

    return (
        <PageContainer>
            <Bar />
            <MyComponent />
            <NameLabel htmlFor="nickname">닉네임</NameLabel>
            <InputName id="nickname" placeholder="사용할 닉네임을 입력해주세요." />
            <TitleLabel htmlFor="title">제목</TitleLabel>
            <InputTitle id="title" placeholder="소설의 제목을 입력해주세요." />
            <StoryLabel htmlFor='story'>내용</StoryLabel>
            <InputStory
                id="story"
                placeholder="이어갈 소설의 내용을 입력해주세요."
                ref={inputStoryRef}
            />
            <ButtonWrapper>
                <Button>제출하기</Button>
            </ButtonWrapper>
        </PageContainer>
    );
}

export default ContinuingStory;