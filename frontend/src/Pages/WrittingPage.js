import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Bar from '../components/Header';
import '../App.css';

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
    position: relative;
    z-index: 1; /* 다른 요소들 위에 위치하도록 설정 */


    &:hover {
        background-color: #4DCAFF;
        color: white;
    }
`;

const WritingPage = () => {
    const inputStoryRef = useRef(null);
    const inputNameRef = useRef(null);
    const inputTitleRef = useRef(null);

    const handleButtonClick = async () => {
        console.log('Button clicked!');  // 버튼 클릭 확인

        const nickname = inputNameRef.current.value;
        const story = inputStoryRef.current.value;
        const title = inputTitleRef.current.value;

        if (!nickname || !story || !title) {
            alert('모든 필드를 입력해주세요.');
            return;
        }

        console.log('Sending data to backend:', { nickname, story, title });

        const response = await fetch('/writingpage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nickname, story, title }),
        });

        if (response.ok) {
            inputNameRef.current.value = '';
            inputStoryRef.current.value = '';
            inputTitleRef.current.value = '';
            alert('데이터가 성공적으로 저장되었습니다.');
        } else {
            alert('데이터 저장에 실패했습니다.');
        }
    };

    return (
        <PageContainer>
            <Bar />
            <MyComponent />
            <NameLabel htmlFor="nickname">닉네임</NameLabel>
            <InputName id="nickname" placeholder="사용할 닉네임을 입력해주세요." ref={inputNameRef} />
            <TitleLabel htmlFor="title">제목</TitleLabel>
            <InputTitle id="title" placeholder="소설의 제목을 입력해주세요." ref={inputTitleRef} />
            <StoryLabel htmlFor='story'>내용</StoryLabel>
            <InputStory
                id="story"
                placeholder="이어갈 소설의 내용을 입력해주세요."
                ref={inputStoryRef}
            />
            <ButtonWrapper>
                <Button onClick = {handleButtonClick} >제출하기</Button>
            </ButtonWrapper>
        </PageContainer>
    );
}

export default WritingPage;