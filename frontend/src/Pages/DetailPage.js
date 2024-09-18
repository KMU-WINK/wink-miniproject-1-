import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Bar from '../components/Header';
import Button from '../components/Buttons/PlusButton';
import '../App.css';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 35px;
`;

const StoryContent = styled.div`
    padding: 30px;
    font-size: 18px;
    color: #333;
    max-width: 100%; 
    margin-left: 30px; 
    box-sizing: border-box; 
`;

const Author = styled.p`
    color: #6D6D6D;
    font-style: normal;
    font-weight: 600;
    padding-left: 0; 
    margin-bottom: 10px;
    font-size: 15px;
`;

const Title = styled.h2`
    color: #000;
    font-style: normal;
    font-weight: 400;
    padding-left: 0; 
    margin-bottom: 50px;
`;

const Content = styled.p`
    color: #323232;
    font-style: normal;
    font-weight: 100;
    padding-left: 0; 
    margin-bottom: 20px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 40px; 
    width: 100%; 
    box-sizing: border-box; 
`;

const AdditionalContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%; /* 너비 조정 */
    margin-left: 0; /* 왼쪽 여백 없앰 */
`;

const SeparatorLine = styled.div`
    width: 100% 
    margin: 10px auto; 
    border-bottom: 1px solid #ddd;
`;

const DetailPage = () => {
    const location = useLocation(); // MainPage에서 전달된 state 사용
    const navigate = useNavigate();
    const [story, setStory] = useState(location.state?.story || {});
    const [additionalContent, setAdditionalContent] = useState([]);

    useEffect(() => {
        const fetchStory = async () => {
            const response = await fetch(`/api/stories/${story.id}`);
            const updatedStory = await response.json();
            setStory(updatedStory); // 최신 스토리 업데이트
        };

        if (story.id) {
            fetchStory();
        }
    }, [story.id]);

    useEffect(() => {
        const fetchAdditionalContent = async () => {
            const response = await fetch(`/api/stories/${story.id}/additional`);
            const content = await response.json();
            setAdditionalContent(prevContent => [
                ...prevContent,
                ...content.map(item => ({
                    ...item,
                    formattedName: `by ${item.nickname}` 
                }))
            ]); // 추가된 콘텐츠 업데이트
        };

        if (story.id) {
            fetchAdditionalContent();
        }
    }, [story.id]);

    const handleContinueClick = () => {
        navigate('/continuingstory', { state: { storyId: story.id } });
    };

    return (
        <PageContainer>
            <Bar />
            <StoryContent>
                <Author>by {story.author}</Author>
                <Title>{story.title}</Title>
                <Content>{story.content}</Content>

                {/* 추가된 콘텐츠 */}
                <AdditionalContent>
                    {additionalContent.map((item, index) => (
                        <React.Fragment key={index}>
                            <SeparatorLine />
                            <Content>{item.formattedName}</Content> 
                            <Content>{item.story}</Content> 
                        </React.Fragment>
                    ))}
                </AdditionalContent>
            </StoryContent>
            <ButtonContainer>
                <Button onClick={handleContinueClick}>이야기 이어가기</Button>
            </ButtonContainer>
        </PageContainer>
    );
};

export default DetailPage;
