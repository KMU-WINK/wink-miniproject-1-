import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Bar from '../components/Header.js';
import HeartToggle from '../components/HeartToggle';
import WritePostButton from '../components/Buttons/WritePostButton.js'; 
import MoreInfoButton from '../components/MoreInfoButton.js'; 

const PageContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start; 
    align-items: center;
    height: 100vh; 
`;

const ButtonContainer = styled.div`
    top: 526px;
    left: 75px;
    padding: 0;
`;

const Box = styled.div`
    background-color: #D9D9D9;
    width: 1290px;
    height: 177px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    margin: 20px 0;
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
    display: flex;
    flex-direction: column;
    align-items: center;
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

const Mainpage = () => {
    const [data, setData] = useState(null);
    const [stories, setStories] = useState([
        //게시물 초기값
        {
            id: 1,
            title: '테스트',
            author: '김태일',
            content: '안녕하세요',
        },
        {
            id: 2,
            title: '테스트2',
            author: '김태일',
            content: '안녕하세요22',
        },
    ]);
    //경로 이동시켜줄 때
    const navigate = useNavigate();

    //처음 렌더링 시 호출
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

    const handleBoxClick = () => {
        navigate('/detailpage');
    };

    return (
        <PageContainer>
            <Bar />
            <MainBox>
                <Line size="40px" bold>모두와 함께 스토리를 작성하다</Line>
                <Line size="40px"></Line>
                <Line size="40px"></Line>
                <Line size="24px">다른 사람과 함께 이야기를 이어나가 보세요!</Line>
                <MoreInfoButton />
            </MainBox>
            <ButtonContainer>
                <WritePostButton />
            </ButtonContainer>
            {stories.map(story => (
                <Box key={story.id} onClick={handleBoxClick}>
                    <StoryTitle>{story.title}</StoryTitle>
                    <HeartToggle />
                </Box>
            ))}
        </PageContainer>
    );
}

export default Mainpage;