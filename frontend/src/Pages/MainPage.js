import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Bar from '../components/Header.js';
import HeartToggle from '../components/HeartToggle';
import WritePostButton from '../components/Buttons/WritePostButton.js';
import MoreInfoButton from '../components/Buttons/MoreInfoButton.js';
import '../App.css';

const PageContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100vh;
    padding: 0;
    margin: 0;
`;

const ButtonContainer = styled.div`
    margin-top: 15px;
    display: flex;
    justify-content: flex-start;
    width: 1310px;
`;

const Box = styled.div`
    background-color: #D9D9D9;
    width: 1290px;
    height: 177px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    margin: 20px;
    text-align: center;
    font-size: 16px;
    color: #323232;
    cursor: pointer;
    
    &:hover {
        background-color: #e0e0e0;
    }
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start; 
    margin-left: 30px;
`;

const MainBox = styled.div`
    top: 110px;
    left: 75px;
    background-color: #D9D9D9;
    width: 1290px;
    height: 398px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
`;

const Line = styled.div`
    font-size: ${props => props.size || '16px'};
    color: #323232;
    font-weight: ${props => props.bold ? 'bold' : 'normal'};
`;

const StoryAuthor = styled.div`
    font-size: 20px;
    color: #6D6D6D;
    font-weight: 600;
    margin-bottom: 15px;
    &::before {
        content: "by. ";
    }
`;

const StoryTitle = styled.div`
    font-size: 16px;
    color: #6D6D6D;
    font-weight: 600;
    &::before {
        content: "제목: ";
    }
`;

const StoryContent = styled.div`
    font-size: 16px;
    color: #6D6D6D;
    font-weight: 400;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const ButtonWrapper = styled.div`
    margin-top: 15px;
    display: flex;
    margin-left: 390px;
`;

const MainPage = () => {
    const [stories, setStories] = useState([]);
    const navigate = useNavigate();

    const handleBoxClick = (story) => {
        navigate('/detailpage', { state: { story } });
    };

    const handleHeartClick = (e, id) => {
        e.stopPropagation();  // 이벤트 전파 방지
        setStories(stories.map(story =>
            story.id === id ? { ...story, liked: !story.liked } : story
        ));
    };

    useEffect(() => {
        axios.get('http://localhost:3000/api/stories')
            .then(response => {
                if (Array.isArray(response.data)) {
                    console.log(response.data);
                    setStories(response.data);  // 응답이 배열이면 상태로 저장
                } else {
                    console.error('응답 데이터가 배열이 아닙니다:', response.data);
                }
            })
            .catch(error => {
                console.error('스토리를 가져오는 중 오류가 발생했습니다.', error);
            });
    }, []);

    return (
        <PageContainer>
            <Bar />
            <MainBox>
                <Line size="40px" bold>모두와 함께 스토리를 작성하다</Line>
                <Line size="40px"></Line>
                <Line size="24px">다른 사람과 함께 이야기를 이어나가 보세요!</Line>
                <ButtonWrapper>
                    <MoreInfoButton />
                </ButtonWrapper>
            </MainBox>
            <ButtonContainer>
                <WritePostButton />
            </ButtonContainer>
            {stories.map(story => (
                <Box key={story.id} onClick={() => handleBoxClick(story)}>
                    <TextContainer>
                        <StoryAuthor>{story.nickname}</StoryAuthor>
                        <StoryTitle>{story.title}</StoryTitle>
                        <StoryContent>{story.content}</StoryContent>
                    </TextContainer>
                    <HeartToggle
                        isFilled={story.liked}
                        onClick={(e) => handleHeartClick(e, story.id)}
                    />
                </Box>
            ))}
        </PageContainer>
    );
};

export default MainPage;
