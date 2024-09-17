import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Bar from '../components/Header';
import Button from '../components/Buttons/PlusButton';

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
    padding: 20px;
    font-size: 18px;
    color: #333;
`;

const DetailPage = () => {
    const location = useLocation(); // MainPage에서 전달된 state 사용
    const navigate = useNavigate();
    const [story, setStory] = useState(location.state?.story || {});

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

    const handleContinueClick = () => {
        navigate('/continuingstory', { state: { storyId: story.id } });
    };

    return (
        <PageContainer>
            <Bar />
            <StoryContent>
                <h2>{story.title}</h2>
                <p>{story.author}</p>
                <p>{story.content}</p>
            </StoryContent>
            <ButtonContainer>
                <Button onClick={handleContinueClick}>이야기 이어가기</Button>
            </ButtonContainer>
        </PageContainer>
    );
};

export default DetailPage;
