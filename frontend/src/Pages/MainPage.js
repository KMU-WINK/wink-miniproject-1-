import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Bar from '../components/Bars';
import HeartToggle from '../components/HeartToggle';
import WritePostButton from '../components/WritePostButton'; 
import MoreInfoButton from '../components/MoreInfoButton.js'; 

const PageContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between; 
    height: 100vh; 
`;

const ButtonContainer = styled.div`
    position: absolute;
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
    position: absolute;
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
    const [stories, setStories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8001/api/data')
            .then(response => {
                setData(response.data.message);
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
                <Line size="30px">다른 사람과 함께 이야기를 이어나가 보세요!</Line>
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