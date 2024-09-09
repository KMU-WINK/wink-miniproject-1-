import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Bar from '../components/Header';
import HeartToggle from '../components/HeartToggle';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between; 
    height: 100vh; 
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
    color: #323232
`;

const Title = styled.h1`
    font-size: 28px;
    position: absolute;
    top: 30px;
    left: 45%;
`;

const StoryTitle = styled.div`
    font-size: 20px;
    color: #323232;
`;

const Top10 = () => {
    const [stories, setStories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8001/api/stories')
        .then(response => {
            const sortedStories = response.data.sort((a, b) => b.likes - a.likes);

            setStories(sortedStories.slice(0, 10));
        })
        .catch(error => {
            console.error('Error fetching stories:', error);
        });
}, []);

return (
    <PageContainer>
        <Bar />
        <Title>인기 Top 10</Title>
        {stories.map(story => (
            <Box key={story.id}>
                <StoryTitle>{story.title}</StoryTitle>
                <HeartToggle />
                <div>좋아요 수: {story.likes}</div>
            </Box>
        ))}
    </PageContainer>
);
};

export default Top10;