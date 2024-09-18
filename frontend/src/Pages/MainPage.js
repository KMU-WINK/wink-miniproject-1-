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

const StoryTitle = styled.div`
    font-size: 20px;
    color: #323232;
`;

const ButtonWrapper = styled.div`
    margin-top: 15px;
    display: flex;
    margin-left: 390px;
`;

const Mainpage = () => {
    const [data, setData] = useState(null);
    const [stories, setStories] = useState([
        {
            id: 1,
            title: '테스트',
            author: '김태일',
            content: '안녕하세요',
            liked: false,
        },
        {
            id: 2,
            title: '테스트2',
            author: '김태일',
            content: '안녕하세요22',
            liked: false,
        },
    ]);

    const navigate = useNavigate();

    const handleBoxClick = (story) => {
        // story 객체를 state로 전달
        navigate('/detailpage', { state: { story } });
    };

    const handleHeartClick = (e, id) => {
        e.stopPropagation();  // 이벤트 전파 방지
        setStories(stories.map(story =>
            story.id === id ? { ...story, liked: !story.liked } : story
        ));
    };

    useEffect(() => {
        axios.get('http://localhost:8001/api/data')
            .then(response => {
                if (response.data) {
                    setData(response.data.message);
                }
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });

        axios.get('http://localhost:8001/api/stories')
            .then(response => {
                setStories(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the stories!', error);
            });
    }, []);

    return (
        <PageContainer>
            <Bar />
            <MainBox>
                <Line size="40px" bold>모두와 함께 스토리를 작성하다</Line>
                <Line size="40px"></Line>
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
                    <StoryTitle>{story.title}</StoryTitle>
                    <HeartToggle
                        isFilled={story.liked}
                        onClick={(e) => handleHeartClick(e, story.id)}
                    />
                </Box>
            ))}
        </PageContainer>
    );
};

export default Mainpage;
